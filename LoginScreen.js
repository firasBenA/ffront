import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { BASE_URL } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}api/User/login`, { email, password });
      if (response.data) {
        const { id, jwt, ...userData } = response.data;
        // Store user data in AsyncStorage
        await AsyncStorage.setItem('jwt', jwt);
        await AsyncStorage.setItem('existingUser', JSON.stringify(userData));

        navigation.navigate('Chat', { jwt });
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Username:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});
