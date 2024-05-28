import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { BASE_URL } from './config';
import * as SignalR from '@microsoft/signalr';

const ChatScreen = ({ route }) => {
  const { conversation } = route.params;

  const [connection, setConnection] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
    const newConnection = new SignalR.HubConnectionBuilder()
      .withUrl(`${BASE_URL}chathub`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

    useEffect(() => {
    if (!connection) return;

    const startConnection = async () => {
      try {
        await connection.start();
        console.log('Connected to SignalR hub');
        connection.on('ReceiveMessage', message => {
          setMessages(messages => [...messages, message]);
        });
        connection.invoke('JoinConversation', conversation.id.toString());
      } catch (error) {
        console.log('Connection failed:', error);
      }
    };

    startConnection();

    return () => {
      if (connection && connection.state === SignalR.HubConnectionState.Connected) {
        connection.invoke('LeaveConversation', conversation.id.toString());
        connection.stop();
      }
    };
  }, [connection, conversation.id]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/Conversation/${conversation.id}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      if (!messageInput.trim()) return;
  
      const senderId = '3'; // Replace with actual senderId
      const receiverId = '2'; // Replace with actual receiverId
  
      const message = {
        conversationId: conversation.id.toString(),
        senderId: senderId,
        receiverId: receiverId,
        text: messageInput,
      };
  
      if (connection) {
        await connection.invoke('SendMessage', message.senderId, message.receiverId, message.text);
        setMessageInput('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  
  const renderItem = ({ item }) => (
    <View style={styles.messageItem}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TextInput
        style={styles.messageInput}
        value={messageInput}
        onChangeText={setMessageInput}
        placeholder="Type your message..."
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  messageInput: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ChatScreen;
