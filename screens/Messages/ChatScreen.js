import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SignalR from '@microsoft/signalr';
import axios from 'axios';
import { BASE_URL } from '../../config';

const ChatScreen = ({ route }) => {
  const { userId } = route.params;
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    const newConnection = new SignalR.HubConnectionBuilder()
      .withUrl(`${BASE_URL}chatHub`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch((error) => console.error('SignalR connection error:', error));

    newConnection.on('ReceiveMessage', (senderUserId, receivedMessage) => {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: prevMessages.length.toString(), senderUserId, message: receivedMessage }
      ]);
    });

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, []);

  const fetchMessages = async () => {
    const userString = await AsyncStorage.getItem('user');
    const user = JSON.parse(userString);
    const userId1 = user.id;

    try {
      const response = await axios.get(`${BASE_URL}api/chat/${userId1}/${userId}`);
      if (response.data) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const sendMessages = async () => {
    try {
      if (!message.trim()) {
        return;
      }

      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);
      const idSender = user?.id;

      if (!userId) {
        console.error('User ID not found in AsyncStorage');
        return;
      }

      const messageData = {
        message: message,
        idSender: idSender,
        idReciver: userId,
        createdAt: new Date().toISOString(),
      };

      // Send the message to the server
      const response = await axios.post(`${BASE_URL}api/Chat/messages`, messageData);

      console.log('Server response:', response.data);

      const newMessage = { id: messages.length.toString(), message: message, createdAt: new Date().toISOString() };
      setMessages(prevMessages => [...prevMessages, newMessage]);

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      console.log('Error details:', error.response); // Log the error response for debugging
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.idSender === userId ? styles.leftMessage : styles.rightMessage]}>
      <View style={styles.messageContent}>
        <Text style={styles.messageText}>{item.message}</Text>
        {item.createdAt && <Text style={styles.timestamp}>{item.createdAt}</Text>}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
      />
      <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={text => setMessage(text)}
          placeholder="Type your message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessages}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
    maxWidth: '80%',
  },
  leftMessage: {
    alignSelf: 'flex-start',
  },
  rightMessage: {
    alignSelf: 'flex-end',
  },
  messageContent: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 8,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
    color: '#333333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
    color: '#333333',
  },
  sendButton: {
    backgroundColor: 'skyblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#333333 ',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
