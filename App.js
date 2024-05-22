import React from 'react';
import Nav from './Nav';
import {AuthProvider} from './AuthService';
import { StatusBar } from 'react-native';
import Modification from './Modification';
import CardValidatorScreen from './CardValidatorScreen';
import ChatScreen from './ChatScreen';
import RegisterScreen from './Register';

const App = () => {
  return (
   <AuthProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" hidden />
      <Nav />
    </AuthProvider>
   
    
  );
};

export default App;
