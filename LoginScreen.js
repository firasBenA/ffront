import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthService, AuthProvider } from './AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage correctly
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const { login } = useContext(AuthService);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        const success = await login(email, password);
        if (!success) {
            setError('Invalid email or password.');
        } else {
            // Navigate to the Home screen or any other screen on successful login
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
            });
            const token = await AsyncStorage.getItem('token');
            console.log('Token:', token);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Text style={styles.errorText}>{error}</Text>
            <Button title="Login" onPress={handleLogin} />
            <Text style={styles.registerText} onPress={() => navigation.navigate('RegisterScreen')}>
                Don't have an account? Register here.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    registerText: {
        marginTop: 20,
        color: 'blue',
    },
});

export default LoginScreen;
