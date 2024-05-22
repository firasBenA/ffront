import React, { useContext } from 'react';
import { AuthService } from './AuthService';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const { logout, isAuthenticated, userInfo } = useContext(AuthService);
    const navigation = useNavigation();

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            // Navigate to the Login screen after successful logout
            navigation.replace('LoginScreen');
        } else {
            console.error('Logout failed.');
        }
    };

    return (
        <View>
            <Text>Welcome, {userInfo?.username || 'Guest'}</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

export default HomeScreen;
