import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { BOATS } from '../../Data';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../config';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../../AuthService';

const ProfilScreen = ({ route }) => {

    const [boats, setBoats] = useState([]);
    const [userAvatar, setUserAvatar] = useState('');
    const [name, setName] = useState('');
    const [idRole, setIdRole] = useState(null); // State to store the idRole

    const [refreshing, setRefreshing] = useState(false);

    const { userId } = route.params;


    let [fontsLoaded] = useFonts({
        'Lato-Bold': require('../../assets/Fonts//Lato/Lato-Bold.ttf'),
        'Lato-Regular': require('../../assets/Fonts//Lato/Lato-Regular.ttf'),
        'Lato-Black': require('../../assets/Fonts//Lato/Lato-Black.ttf'),

    });
    if (!fontsLoaded) {
        return null;
    }

    const navigation = useNavigation();

    const onRefresh = async () => {
        setRefreshing(true); // Set refreshing to true
        await fetchBoats(); // Fetch boats again
        setRefreshing(false); // Set refreshing to false when done
    };

    useEffect(() => {
        fetchUser();
        fetchBoats(userId);
        fetchUserRole(); // Fetch user role when component mounts

    }, []);

    const fetchUserRole = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData);
                const userRole = user.idRole; // Assuming idRole is stored in user object
                setIdRole(userRole);
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
        }
    };

    const fetchBoats = async (userId) => {
        console.log('userId : ', userId)
        try {
            const response = await axios.get(`${BASE_URL}api/Boat/boats/user/${userId}`);
            setBoats(response.data);
            console.log(response.data)

        } catch (error) {
            if (error.response) {
                console.error('Error fetching boats - Status:', error.response.status);
                console.error('Error fetching boats - Data:', error.response.data);
            } else if (error.request) {
                console.error('Error fetching boats - No response received');
            } else {
                console.error('Error fetching boats - Request setup:', error.message);
            }
        }
    };

    const fetchUser = async () => {
        console.log(userId)
        try {
            const response = await axios.get(`${BASE_URL}api/User/${userId}`);
            setUserAvatar(response.data.avatar);
            setName(response.data.name);

            console.log(response.data.id); // Log idRole

        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };


    const handleDeleteUser = async () => {
        console.log('Deleting user with ID:', userId); // Log the user ID being deleted
        try {

            const response = await axios.delete(`${BASE_URL}api/User/${userId}`)
            console.log(response.data)
        } catch (error) {
            console.error('Error deleting user:', error);
            Alert.alert('Error', 'Failed to delete user');
        }
    };

    const openMessages = () => {
        console.log(userId)
        navigation.navigate('ChatScreen', { userId });
    };

    const handleCardPress = async (boat) => {

        const { id: boatId, userId } = boat;
        navigation.navigate('Publication', { boatId, userId });

    };


    return (
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
            <Header />
            <View style={[{ height: windowHeight * 0.95 }]}>
                <BackgroundImage
                    source={require("../../assets/image/backImg2.jpeg")}
                    style={[{ height: "80%" }]}
                >
                    <View style={styles.cardContainer}>

                        {userAvatar ? (
                            <Image source={{ uri: `${BASE_URL}` + userAvatar }} style={styles.profileImg} />
                        ) : (
                            <Image source={require('../../assets/image/user.png')} style={styles.profileImg} />
                        )}

                        <Text style={{ fontFamily: "Lato-Regular", fontSize: 20 }}>Hi,{name}</Text>
                        <Text style={{ marginVertical: 15, fontSize: 16, fontFamily: "Lato-Regular", color: 'grey' }}>@{name}</Text>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 18, fontFamily: "Lato-Bold", alignSelf: "center" }}>{name}</Text>
                            <Text style={{ fontSize: 18, fontFamily: "Lato-Bold" }}>@{name}123</Text>
                        </View>
                    </View>
                </BackgroundImage>
                <TouchableOpacity style={styles.button} onPress={openMessages}>
                    <Text style={styles.buttonText}>Contacter</Text>
                </TouchableOpacity>
                {idRole === 1 && (
                    <TouchableOpacity style={styles.buttonD} onPress={handleDeleteUser}>
                        <Text style={styles.buttonText}>DELETE</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View>
                <Text style={{ alignSelf: "center", marginBottom: 20, fontFamily: 'Lato-Bold', fontSize: 20 }}>My Boats</Text>
            </View>
            {boats.map((boat) => (
                <TouchableOpacity onPress={() => handleCardPress(boat)}>

                    <Card
                        key={boat.id}
                        boatId={boat.id}
                        title="3 - 8 hours * No Captain"
                        imageUrl={`${BASE_URL}${boat.imageUrl}`}
                        description={boat.description}
                        userId={boat.userId}
                        capacity={boat.capacity}
                        nbrCabins={boat.nbrCabins}
                        nbrBedrooms={boat.nbrBedrooms}
                        price={boat.price}

                    />
                </TouchableOpacity>

            ))}
        </ScrollView>
    );
};


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    cardContainer: {
        borderWidth: 0.5,
        borderRadius: 15,
        width: windowWidth * 0.8,
        height: windowHeight * 0.6,
        backgroundColor: "white",
        alignSelf: "center",
        marginTop: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    profileImg: {
        borderRadius: 150,
        width: 170,
        height: 170,
        marginVertical: 30,
        top: "-5%"
    },
    button: {
        borderWidth: 0.5,
        width: windowWidth * 0.8,
        backgroundColor: 'white',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: 'black',
        fontFamily: 'Lato-Bold',
        fontSize: 16,
    },
    buttonD: {
        borderWidth: 0.5,
        width: windowWidth * 0.8,
        backgroundColor: '#ff0000',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
});

export default ProfilScreen;
