import React from 'react';
import Nav from './Nav';
import { AuthProvider } from './AuthService';
import { StatusBar } from 'react-native';
import Modification from './Modification';
import CardValidatorScreen from './CardValidatorScreen';
import RegisterScreen from './Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import ConversationScreen from './ConversationScreen';
import ChatScreen from './ChatScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
     <AuthProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" hidden />
        <Nav />
      </AuthProvider>

    /*<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Conversations" component={ConversationScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>*/

  );
};

export default App;
