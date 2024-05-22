import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, Alert, Button } from 'react-native';
import Header from './components/Header';
import Card from './components/Card';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { useFonts } from 'expo-font';
import axios from 'axios';
import { BASE_URL } from './config';

const ProfilScreen = ({ route }) => {

    const [boats, setBoats] = useState([]);
    const [userAvatar, setUserAvatar] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const { userId } = 1030


    let [fontsLoaded] = useFonts({
        'Lato-Bold': require('./assets/Fonts//Lato/Lato-Bold.ttf'),
        'Lato-Regular': require('./assets/Fonts//Lato/Lato-Regular.ttf'),
        'Lato-Black': require('./assets/Fonts//Lato/Lato-Black.ttf'),

    });
    if (!fontsLoaded) {
        return null;
    }

   // const navigation = useNavigation();

    useEffect(() => {
        fetchUser();
        fetchBoats(userId);
    }, []);

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
            setRole(response.data.idRole);
            console.log(response.data.idRole);

        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };


  /*  const openMessages = () => {
        console.log(userId)
        navigation.navigate('ChatScreen', { userId });
    };*/


    /*const handleCardPress = () => {
        navigation.navigate('Publication', { item })
    };*/



    return (
        <ScrollView style={styles.container}>
            <Header />
            <View style={[{ height: windowHeight * 0.95 }]}>
                <BackgroundImage
                    source={require("./assets/image/backImg2.jpeg")}
                    style={[{ height: "80%" }]}
                >
                    <View style={styles.cardContainer}>

                        {userAvatar ? (
                            <Image source={{ uri: `${BASE_URL}` + userAvatar }} style={styles.profileImg} />
                        ) : (
                            <Image source={require('./assets/image/user.png')} style={styles.profileImg} />
                        )}

                        <Text style={{ fontFamily: "Lato-Regular", fontSize: 20 }}>Hi,{name}</Text>
                        <Text style={{ marginVertical: 15, fontSize: 16, fontFamily: "Lato-Regular", color: 'grey' }}>@FirasBA</Text>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 18, fontFamily: "Lato-Bold", alignSelf: "center" }}>Firas</Text>
                            <Text style={{ fontSize: 18, fontFamily: "Lato-Bold" }}>@Firas123</Text>
                        </View>
                    </View>
                </BackgroundImage>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Contacter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonD} >
                    <Text style={styles.buttonText}>DELETE</Text>
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
    buttonD: {
        borderWidth: 0.5,
        width: windowWidth * 0.8,
        backgroundColor: '#ff0000',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop : 10,
    },
    buttonText: {
        color: 'black',
        fontFamily: 'Lato-Bold',
        fontSize: 16,
    },
});

export default ProfilScreen;
