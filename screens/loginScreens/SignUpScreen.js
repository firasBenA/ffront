import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, Image } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import React from 'react'
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { AuthService } from '../../AuthService'; // Import useAuth hook

import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';


const SignUpScreen = () => {
  const { register } = useContext(AuthService);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  let [fontsLoaded] = useFonts({

    'Lato-Bold': require('../../assets/Fonts//Lato/Lato-Bold.ttf'),
    'Lato-Regular': require('../../assets/Fonts//Lato/Lato-Regular.ttf'),
    'Lato-Black': require('../../assets/Fonts//Lato/Lato-Black.ttf'),

  });

  const handleRegister = async () => {
    const success = await register(name,email, password);
    
    if (success) {
      navigation.navigate('VerifyEmailScreen');
    } else {
      console.log('Registration failed');
      console.log(success)
    }
  };


  if (!fontsLoaded) {
    return null;
  }


  const navigation = useNavigation();

  const handleLinkPress = () => {
    navigation.navigate('SignInScreen');
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <Header />

      <SafeAreaView style={styles.container}>

        <View style={styles.upperText}>
          <Text style={styles.SignText}>SIGN UP</Text>
          <Text style={styles.hiText}>Hi! Please enter your details </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flexDirection: "column", width: "50%" }}>
              <Text style={styles.Label}>First name</Text>
              <TextInput
                value={name}
                style={styles.miniInput}
                onChangeText={text => setName(text)}
              />
            </View>
            <View style={{ flexDirection: "column", width: "50%" }}>
              <Text style={styles.Label}>Last name</Text>
              <TextInput
                style={styles.miniInput}
              />
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.Label}>Email</Text>
            <TextInput
              value={email}
              style={styles.input}
              onChangeText={text => setEmail(text)}
            />
          </View>

          <View style={{ flexDirection: "row", }}>
            <View style={{ flexDirection: "column", width: "50%", marginTop: 20 }}>
              <Text style={styles.Label}>Password</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.miniInput}
                value={password}
                onChangeText={text => setPassword(text)}

              />
            </View>
            <View style={{ flexDirection: "column", width: "50%", marginTop: 20 }}>
              <Text style={styles.Label}>Confirm Password</Text>
              <TextInput secureTextEntry={true} style={styles.miniInput} />
            </View>
          </View>


        </View>

        <CheckBox
          title="I've read and agree with Terms of Service and our Privacy Policy"
          checked={isChecked}
          onPress={handleCheckboxChange}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxText}
          iconType='material'
          checkedIcon={<Icon name="check-square" size={20} color={"black"} />}
          uncheckedIcon={<Icon name="square" size={20} color={"grey"} />}
        />
        <View style={{ flexDirection: "column" }}>
          <Button
            title="Sign Up"
            buttonStyle={styles.submitButton}
            titleStyle={styles.submitButtonText}
            onPress={handleRegister}/>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>

            <Text style={{ fontSize: 14, marginTop: 10, paddingLeft: 10, fontFamily: 'Lato-Regular' }}>Already have an account ? </Text>
            <Text onPress={handleLinkPress} style={{ fontSize: 14, fontWeight: 'normal', marginTop: 10, paddingLeft: 10, textDecorationLine: 'underline', fontFamily: 'Lato-Regular' }}>Sign In </Text>
          </View>
        </View>

        <View style={styles.LineContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <View>
          <Button
            title="Sign up with Facebook"
            icon={
              <View >
                <Image
                  source={require('../../assets/icons/facebook.png')}
                  style={{
                    width: 24,
                    height: 24
                  }}
                />
              </View>
            }
            buttonStyle={styles.appbutton}
            titleStyle={styles.appButtonText}
            onPress={() => console.log('Facebook button pressed')}
          />
          <Button
            title="Sign up with Google"
            icon={
              <View>
                <Image
                  source={require('../../assets/icons/google.png')}
                  style={{
                    width: 24,
                    height: 24
                  }} />
              </View>
            }
            buttonStyle={styles.appbutton}
            titleStyle={styles.appButtonText}
            onPress={() => console.log('Google button pressed')}
          />
          <Button
            title="Sign up with Apple"
            icon={
              <View>
                <Image
                  source={require('../../assets/icons/apple.png')}
                  style={{
                    width: 24,
                    height: 24
                  }}
                />
              </View>


            }
            buttonStyle={styles.appbutton}
            titleStyle={styles.appButtonText}
            onPress={() => console.log('Apple button pressed')}
          />
        </View>

      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:"white"
  },

  upperText: {
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 8
  },

  SignText: {
    fontSize: 30,
    marginBottom: 10,
    fontFamily: "Lato-Bold",
    color:"#0B2447"

  },

  hiText: {
    opacity: 0.6,
    marginBottom: 25,
    fontSize: 17,
    fontFamily: "Lato-Regular"
  },

  inputContainer: {
    marginTop: -30,
    flexDirection: "column",
  },

  Label: {
    paddingLeft: 4,
    fontFamily: "Lato-Bold",
  },

  miniInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#B4B4B8',
    borderRadius: 8,
    width: "94%",
    height: 50,
    padding: 10
  },

  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#B4B4B8',
    borderRadius: 8,
    width: "97%",
    height: 50,
    padding: 10,

  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingTop: 20,
    width: "100%",
    marginLeft: -5

  },
  checkboxText: {
    fontSize: 12,
    color: 'black',
    fontFamily: "Lato-Regular",
  },


  submitButton: {
    backgroundColor: '#0B2447',
    borderRadius: 10,
    height: 60,
    marginTop: 10,
  },

  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: "Lato-Bold",

  },

  LineContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginBottom: 20
  },

  line: {
    flex: 1,
    borderBottomColor: '#CCD3CA',
    borderBottomWidth: 1,
    marginHorizontal: 5,
  },
  orText: {
    marginHorizontal: 10,
    color: 'grey',
    fontWeight: 'bold',
  },


  appbutton: {
    backgroundColor: 'white',
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: "grey",
    height: 55,
    borderRadius:8,
    width:"95%",
    alignSelf:"center",
  },

  appButtonText: {
    color: "black",
    paddingLeft: 20,
    fontFamily:"Lato-Regular"


  },
  iconBtn: {
    paddingRight: 20,

  }


})

export default SignUpScreen