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
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibraryAsync } from 'expo-image-picker';

const ProfilScreen = ({ route }) => {
    const { logout } = useContext(AuthService);

    const [avatar, setAvatar] = useState('');
    const [boats, setBoats] = useState([]);
    const [userId, setUserId] = useState();


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    //const { userId } = route.params;
    const [refreshing, setRefreshing] = useState(false);


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
        await fetchBoats(userId); // Fetch boats again
        setRefreshing(false); // Set refreshing to false when done
    };


    /*const fetchBoats = async (userId) => {
        console.log(userId)
        try {
            const response = await axios.get(`${BASE_URL}api/Boat/boats/user/${userId}`);
            setBoats(response.data);
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
    };*/

    const updateAvatar = async (userId, userDataToUpdate) => {
        try {
            const token = await AsyncStorage.getItem('token');

            console.log('userDataToUpdate:', userDataToUpdate); // Log the data being sent in the update request

            const response = await axios.put(`${BASE_URL}updateAvatarImage/${userId}`,
                userDataToUpdate,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Update user response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    };

    const handleUpdateAvatar = async (id, imageUrl) => {

        try {
            const formData = new FormData();
            formData.append('file', {
                uri: imageUrl,
                type: 'image/jpeg',
                name: 'avatar_image.jpg',
            });

            console.log('FormData:', formData);

            const updateAvatarResponse = await axios.put(`${BASE_URL}updateAvatarImage/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const updatedAvatarUrl = updateAvatarResponse.data.avatar;
            setAvatar(updatedAvatarUrl);

            Alert.alert('Success', 'Avatar image updated successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to update avatar image. Please try again later.');
        }
    };

    const selectImage = async () => {
        const options = {
            mediaTypes: 'Images',
            allowsEditing: true,
            aspect: [45, 32],
            quality: 1,
            base64: true,
        };
        const result = await launchImageLibraryAsync(options);

        if (!result.cancelled) {
            const imageUrl = result.assets[0].uri; // Add BASE_URL and format the image URL
            console.log('Formatted Image URL:', imageUrl); // Log the formatted image URL

            console.log('aaa', imageUrl);
            setAvatar(imageUrl);
            handleUpdateAvatar(userId, imageUrl);
        }
    };


    const goToReservation = async () => {
        navigation.navigate("Transaction");
    }

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            console.log('Logout successful');
            navigation.replace('SignInScreen');
        } else {
            console.log('Logout failed');
        }
    };

    const handleCardPress = async (boat) => {

        const { id: boatId, userId } = boat;
        navigation.navigate('Publication', { boatId, userId });

    };

    const handleParametrePress = () => {

        navigation.navigate('ProfilSettingScreen')
    };

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('user');
                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                    setAvatar(userData.avatar);
                    setUserId(userData.id);
                    setName(userData.name);
                    setEmail(userData.email);
                    setPhoneNumber(userData.phoneNumber);
                    setCountry(userData.country);
                    setCity(userData.city);
                    setPassword(userData.password);

                    fetchBoats(userData.id);


                } else {
                    console.log('User data not found.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getUserData();
        console.log(userId);
    }, []);


    const fetchBoats = async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}api/Boat/boats/user/${userId}`);
            setBoats(response.data);

        } catch (error) {
            if (error.response) {
                console.log('Error fetching boats - Status:', error.response.status);
                console.log('Error fetching boats - Data:', error.response.data);
            } else if (error.request) {
                console.log('Error fetching boats - No response received');
            } else {
                console.log('Error fetching boats - Request setup:', error.message);
            }
        }
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
                        <Icon name="cog" size={30} color="grey" style={styles.icon} onPress={handleParametrePress} />
                        <View style={styles.whiteCard}>
                            {avatar ? (
                                <Image source={{ uri: `${BASE_URL}` + avatar }} style={styles.profileImg} />
                            ) : (
                                <Image source={require('../../assets/image/user.png')} style={styles.profileImg} />
                            )}
                            <TouchableOpacity style={styles.overlayIcon} onPress={selectImage}>
                                <Icon name="camera" size={24} color="grey" style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: "Lato-Regular", fontSize: 20 }}>Hi, I am {name}</Text>
                            <Text style={{ marginVertical: 15, fontSize: 16, fontFamily: "Lato-Regular", color: 'grey' }}>@{name}</Text>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 18, fontFamily: "Lato-Bold", alignSelf: "center" }}>{name}</Text>
                                <Text style={{ fontSize: 18, fontFamily: "Lato-Bold" }}>@{name}123</Text>
                            </View>
                        </View>

                    </View>
                </BackgroundImage>

                <TouchableOpacity style={styles.button} onPress={goToReservation}>
                    <Text style={styles.buttonText}>Transaction</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
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
                        city={boat.city}
                        country={boat.country}
                        showIcon={true}
                    >

                    </Card>
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
        paddingBottom: 50
    },
    cardContainer: {
        borderWidth: 0.5,
        borderRadius: 15,
        width: windowWidth * 0.8,
        height: windowHeight * 0.6,
        backgroundColor: "white",
        alignSelf: "center",
        justifyContent: "center",
        marginTop: 100,

    },
    whiteCard: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",

    },
    profileImg: {
        borderRadius: 150,
        width: 170,
        height: 170,
        marginVertical: 30,

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
    icon: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 10
    },
    overlayIcon: {
        position: 'absolute',
        right: 10,
        borderRadius: 50,
        padding: 6,
        backgroundColor: "white"
    },

});

export default ProfilScreen;
