import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, Image, SafeAreaView, Alert } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../../AuthService';

import { Dimensions } from 'react-native';
import Header from '../../components/Header'
const SignInScreen = () => {
    const [token, setToken] = useState(null);

    const { login } = useContext(AuthService);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    
    let [fontsLoaded] = useFonts({
        'Lato-Bold': require('../../assets/Fonts//Lato/Lato-Bold.ttf'),
        'Lato-Regular': require('../../assets/Fonts//Lato/Lato-Regular.ttf'),
        'Lato-Black': require('../../assets/Fonts//Lato/Lato-Black.ttf'),
    });


    if (!fontsLoaded) {
        return null;
    }

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }
    
        const success = await login(email, password);
    
        if (!success) {
            setError('Invalid email or password.');
        } else {
            const userData = await AsyncStorage.getItem('user');
            const token = await AsyncStorage.getItem('token');
    
            console.log(userData);
    
            if (userData) {
                const user = JSON.parse(userData);
                const userId = user.id;
                const active = user.active;
    
                if (active === 1) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeScreen' }],
                    });
    
                    console.log('User:', JSON.stringify(user));

                    return userId; 
                } else {
                    // User is not active
                    Alert.alert('User is not active. Please contact support or Relode The App.');
                }
            } else {
                // User data not found
                Alert.alert('User not found');
                return null;
            }
        }
    };
    



    const handleLinkPress = () => {
        navigation.navigate('SignUpScreen');
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };


    return (

        <ScrollView stickyHeaderIndices={[0]}   >
            <Header />
            <SafeAreaView style={styles.container}>
                <View style={styles.upperText}>

                    <Text style={styles.SignText}>SIGN IN</Text>
                    <Text style={styles.hiText}>Welcome Back! Please enter your details </Text>
                </View>
                <View style={styles.inputContainer}>


                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.Label}>Email</Text>
                        <TextInput
                            value={email}
                            style={styles.input}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.Label}>Password</Text>
                        <TextInput
                            value={password}
                            style={styles.input}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry
                        />
                    </View>



                </View>
                <View style={{ flexDirection: "row", }}>
                    <CheckBox
                        title="Remember Me"
                        checked={isChecked}
                        onPress={handleCheckboxChange}
                        containerStyle={styles.checkboxContainer}
                        textStyle={styles.checkboxText}
                        iconType='material'
                        checkedIcon={<Icon name="check-square" size={20} color={"black"} />}
                        uncheckedIcon={<Icon name="square" size={20} color={"grey"} />}
                    />

                    <Text onPress={handleLinkPress} style={{ fontSize: 14, marginLeft: 40, marginTop: 40, textDecorationLine: 'underline', fontFamily: 'Lato-Bold' }}>Forget Password?</Text>


                </View>

                <Button
                    title="Sing In"
                    buttonStyle={styles.submitButton}
                    titleStyle={styles.submitButtonText}
                    onPress={handleLogin}
                />
                <View style={{ flexDirection: "row", }}>

                    <Text style={{ fontSize: 14, marginTop: 10, paddingLeft: 10, fontFamily: 'Lato-Bold', color: 'grey' }}>Not remenber yet? </Text>

                    <Text onPress={handleLinkPress} style={{ fontFamily: 'Lato-Bold', fontSize: 14, marginTop: 10, textDecorationLine: 'underline' }}>Creat account</Text>

                </View>

                <View style={styles.LineContainer}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>Or</Text>
                    <View style={styles.line} />
                </View>

                <View style={{}}>
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
       // paddingTop: Platform.OS === 'ios' ? 40 : 20,
        //paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        backgroundColor: "white",
    },

    upperText: {
        paddingTop: 60,
        paddingHorizontal: 8,
        paddingBottom: 50,

    },

    SignText: {
        fontSize: 30,
        marginBottom: 10,
        fontFamily: 'Lato-Bold',
        color:"#0B2447"
    },

    hiText: {
        opacity: 0.6,
        marginBottom: 20,
        fontSize: 17,
        fontFamily: 'Lato-Regular'

    },

    inputContainer: {
        flexDirection: "column",
        justifyContent: "space-between",


    },

    Label: {
        paddingLeft: 10,
        fontFamily: "Lato-Bold"

    },

    miniInput: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        borderRadius: 10,
        width: "95%",
        height: 50,
        padding: 10
    },

    input: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#B4B4B8',
        borderRadius: 8,
        width: "95%",
        height: 50,
        padding: 10,
        alignSelf: 'center'

    },
    checkboxContainer: {
        backgroundColor: 'white',
        paddingTop: 35,
        width: "50%",
        marginLeft: -5,
        borderColor: 'white'

    },
    checkboxText: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'Lato-Regular'

    },


    submitButton: {
        backgroundColor: '#0B2447',
        borderRadius: 10,
        height: 60,
        marginTop: 10,
    },

    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Lato-Bold'
    },

    LineContainer: {
        marginVertical: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    line: {
        flex: 1,
        borderBottomColor: '#CCD3CA',
        borderBottomWidth: 1,
        marginHorizontal: 5,
    },
    orText: {
        marginHorizontal: 10,
        color: 'grey', // You can customize the color
        fontWeight: 'bold',
    },


    appbutton: {
        backgroundColor: 'white', // Customize button color
        marginVertical: 10,
        borderWidth: 0.5,
        borderColor: "grey",
        height: 55,
        width: "95%",
        alignSelf: "center",
        borderRadius: 8
    },

    appButtonText: {
        color: "black",
        paddingLeft: 20,
        fontFamily: 'Lato-Regular'


    },
    iconBtn: {
        paddingRight: 20,

    },
    buttonText: {
        borderBottomColor: "grey"


    },


})

export default SignInScreen
