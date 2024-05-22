import React from 'react';
import { View, Button ,Text} from 'react-native';
import AuthService from './AuthService';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

    const handleLogout = async () => {
        const success = await AuthService.logout();
        if (success) {
            console.log("Bye !")
          navigation.navigate('Login'); 
        } else {
          console.log('Logout failed');
        }
      };
    
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Logout Screen</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      );
};

export default ProfileScreen;
