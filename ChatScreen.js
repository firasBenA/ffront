import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import * as SignalR from '@microsoft/signalr';
import { BASE_URL } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    const newConnection = new SignalR.HubConnectionBuilder()
      .withUrl(`${BASE_URL}chatHub`) 
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (connection && connection.state === SignalR.HubConnectionState.Disconnected) {
      connection.start()
        .then(() => {
          console.log('Connection established!');
          connection.on('ReceiveMessage', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
          });
        })
        .catch(console.error);
    }
  }, [connection]);

  useEffect(() => {
    fetchPreviousMessages();
  }, []);

  const fetchPreviousMessages = async () => {
    try {
      const response = await fetch(`${BASE_URL}api/chat`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Failed to fetch previous messages');
      }
    } catch (error) {
      console.error('Error fetching previous messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString); // Parse the user object from string to JSON
      console.log(user);
      const userId = user.id;
      if (!userId) {
        console.error('User ID not found in AsyncStorage');
        return;
      }

      const messageData = {
        message: input,
        idSender: userId,
        createdAt: new Date().toISOString(), // Example timestamp
      };

      const response = await fetch(`${BASE_URL}api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        setInput('');
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  const renderMessageItem = ({ item }) => (
    <Text>{item.idSender}: {item.message}</Text>
  );

  return (
    <View style={{ marginTop: 200 }}>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<Text>Chat Messages:</Text>}
      />
      <TextInput
        value={input}
        onChangeText={(text) => setInput(text)}
        placeholder="Type your message..."
      />
      <Button
        title="Send"
        onPress={sendMessage}
      />
    </View>
  );
};

export default ChatScreen;
