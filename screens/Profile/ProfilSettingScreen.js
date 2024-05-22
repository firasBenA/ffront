import { View, Text, image, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useNavigation } from '@react-navigation/native';





const ProfilSettingScreen = () => {

    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, SetCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [avatar, setAvatar] = useState('');
    const [active, setActive] = useState('');

    const navigation = useNavigation();


    let [fontsLoaded] = useFonts({
        'Lato-Bold': require('../../assets/Fonts/Lato/Lato-Bold.ttf'),
        'Lato-Regular': require('../../assets/Fonts/Lato/Lato-Regular.ttf'),
        'Lato-Black': require('../../assets/Fonts/Lato/Lato-Black.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }


    /*const fetchBoats = async () => {
        const userData = JSON.parse(await AsyncStorage.getItem('user'));
        const userId = userData.id;
        console.log(userId)

        try {
            const response = await axios.put(`${BASE_URL}api/User/${userId}`);
            setUser(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching boats:', error);

        };
    }*/

    const updateUser = async (userId, userDataToUpdate) => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log('Authorization token:', token);

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.put(
                `${BASE_URL}api/User/${userId}`,
                userDataToUpdate,
                { headers }
            );

            console.log('Update user response:', response.data);
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Server Error Status:', error.response.status);
                console.error('Server Error Data:', error.response.data);
            } else if (error.request) {
                console.error('No response received');
            } else {
                console.error('Error setting up the request:', error.message);
            }
            throw error; // Propagate the error for handling
        }
    };

    // Example usage:
    const handleUpdateUser = async () => {
        try {
            if ((newPassword1 !== newPassword2) || (newPassword1 == '')) {
                console.log("aaa")
            }


            const userData = JSON.parse(await AsyncStorage.getItem('user'));
            const userId = userData.id;

            const updatedUserData = {
                id: userId,
                avatar: avatar,
                active: active,
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                country: country,
                city: city,
                password: password,
            };

            const updatedUser = await updateUser(userId, updatedUserData);
            console.log('Updated user:', updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
        }
        navigation.replace('ProfilScreen')

    };

    const handleUpdateUserPassword = async () => {
        try {
            if ((newPassword1 !== newPassword2) || (newPassword1 == '')) {
                console.log("aaa")
            }


            const userData = JSON.parse(await AsyncStorage.getItem('user'));
            const userId = userData.id;

            const updatedUserData = {
                id: userId,
                avatar: avatar,
                active: active,
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                country: country,
                city: city,
                password: newPassword1,
            };

            const updatedUser = await updateUser(userId, updatedUserData);
            console.log('Updated user:', updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
        }
        navigation.replace('ProfilScreen')

    };





    useEffect(() => {
        const getUserData = async () => {
            try {
                
                const userDataString = await AsyncStorage.getItem('user');
                if (userDataString) {
                    const userData = JSON.parse(userDataString);

                    setName(userData.name);
                    setEmail(userData.email);
                    setPhoneNumber(userData.phoneNumber);
                    setCountry(userData.country);
                    setCity(userData.city);
                    setPassword(userData.password);
                    setAvatar(userData.avatar);
                    setActive(userData.active);

                } else {
                    console.log('User data not found.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getUserData();
    }, []);

    return (
        <ScrollView style={{ backgroundColor: "white" }} stickyHeaderIndices={[0]}>
            <Header />
            <View style={styles.container}>
                <Text style={styles.TopTitle}>Personal Information</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', marginTop: 25, opacity: .5 }} />

                <View style={{ marginTop: 25 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: "column", width: "49%" }}>
                            <Text style={styles.Label}>First name</Text>
                            <TextInput
                                value={name}
                                style={styles.miniInput}
                                onChangeText={text => setName(text)}
                            />
                        </View>
                        <View style={{ flexDirection: "column", width: "49%" }}>
                            <Text style={styles.Label}>First name</Text>
                            <TextInput
                                style={styles.miniInput}
                                onChangeText={text => setName(text)}
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
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.Label}>Phone Number</Text>
                        <TextInput
                            value={phoneNumber}
                            style={styles.input}
                            onChangeText={text => setPhoneNumber(text)}
                        />
                    </View>
                </View>
                <Text style={[styles.TopTitle, { paddingTop: 60 }]}>Adress</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', marginTop: 25, opacity: .5 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <View style={{ flexDirection: "column", width: "49%" }}>
                        <Text style={styles.Label}>Country</Text>
                        <TextInput
                            value={country}
                            style={styles.miniInput}
                            onChangeText={text => setCountry(text)}
                        />
                    </View>
                    <View style={{ flexDirection: "column", width: "49%" }}>
                        <Text style={styles.Label}>City</Text>
                        <TextInput
                            value={city}
                            style={styles.miniInput}
                            onChangeText={text => setCity(text)}
                        />
                    </View>


                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={styles.Label}>Street Address</Text>
                    <TextInput
                        style={styles.input}
                    />
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginRight: 10, marginBottom: 40 }}>

                    <TouchableOpacity style={styles.modalReserverBtn}>
                        <Text style={{ fontFamily: "Lato-Bold", fontSize: 18, color: "black", alignSelf: "center", }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modalReserverBtn, { backgroundColor: "black" }]} onPress={handleUpdateUser}>
                        <Text style={{ fontFamily: "Lato-Bold", fontSize: 18, color: "white", alignSelf: "center", }}>Save</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.TopTitle}>Personal Information</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', marginTop: 25, opacity: .5 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <View style={{ flexDirection: "column", width: "49%" }}>
                        <Text style={styles.Label}>Password</Text>
                        <TextInput
                            value={newPassword1}
                            style={styles.miniInput}
                            onChangeText={text => setNewPassword1(text)}
                            secureTextEntry
                        />
                    </View>
                    <View style={{ flexDirection: "column", width: "49%" }}>
                        <Text style={styles.Label}>Confirm Password</Text>
                        <TextInput
                            style={styles.miniInput}
                            onChangeText={text => setNewPassword2(text)}
                            secureTextEntry
                        />
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={styles.Label}>Current password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => SetCurrentPassword(text)}
                        secureTextEntry
                    />
                </View>

                <View style={{ flexDirection: "row", marginRight: 10, marginBottom: 40 }}>
                    <TouchableOpacity style={[styles.PasswordModalReserverBtn, { backgroundColor: "black" }]} onPress={handleUpdateUserPassword}>
                        <Text style={{ fontFamily: "Lato-Bold", fontSize: 18, color: "white", alignSelf: "center", }}>Save Password</Text>
                    </TouchableOpacity>
                </View>


            </View>


        </ScrollView>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingHorizontal: 20
    },
    TopTitle: {
        paddingTop: 30,
        fontFamily: "Lato-Bold",
        fontSize: 20
    },

    Label: {
        paddingLeft: 4,
        fontFamily: "Lato-Regular",
    },

    miniInput: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 8,
        width: "94%",
        height: 50,
        padding: 10
    },
    input: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 8,
        width: "97%",
        height: 50,
        padding: 10,

    },
    modalReserverBtn: {
        marginTop: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderRadius: 12,
        height: 70,
        width: "48%",
        justifyContent: "center"

    },
    PasswordModalReserverBtn: {
        marginTop: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderRadius: 12,
        height: 70,
        width: "100%",
        justifyContent: "center"

    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        elevation: 20,
        height: 90,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },


});

export default ProfilSettingScreen

