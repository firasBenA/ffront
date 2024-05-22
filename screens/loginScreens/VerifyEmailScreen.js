import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { BASE_URL } from '../../config';

const VerifyEmailScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const verifyEmail = async () => {
        try {
            const response = await fetch(`${BASE_URL}api/User/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    verificationCode,
                }),
            });

            if (response) {
                navigation.navigate('SignInScreen'); 
            } else {
                Alert.alert('Error', response.message);
            }
        } catch (error) {
            console.log('Error', 'Something went wrong!');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Email:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
                onChangeText={text => setEmail(text)}
                value={email}
                keyboardType="email-address"
            />
            <Text>Verification Code:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
                onChangeText={text => setVerificationCode(text)}
                value={verificationCode}
                keyboardType="numeric"
            />
            <Button title="Verify Email" onPress={verifyEmail} />
        </View>
    );
};

export default VerifyEmailScreen;
