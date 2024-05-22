import React, { useState ,useContext} from 'react';
import { View, TextInput, Button } from 'react-native';
import { AuthService } from './AuthService'; // Import useAuth hook

const RegisterScreen = ({ navigation }) => {
    const { register } = useContext(AuthService);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const success = await register(email, password);
    if (success) {
      navigation.navigate('LoginScreen');
    } else {
      console.log('Registration failed');
      console.log(success)
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default RegisterScreen;
