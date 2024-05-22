import { View, Text, image, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useNavigation } from '@react-navigation/native';
import QuantitySelector from '../../components/QuantitySelector';
import { launchImageLibraryAsync } from 'expo-image-picker';





const ProfilSettingScreen = ({ route }) => {

    const { boatId } = route.params;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [boatType, setBoatType] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [nbrCabins, setNbrCabins] = useState(0);
    const [nbrBedrooms, setNbrBedrooms] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [userId, setUserId] = useState(0);
    const navigation = useNavigation();
    const [boatData, setBoatData] = useState({
        name: '',
        description: '',
        price: 0,
        country: '',
        city: '',
        boatType: '',
        capacity: 0,
        nbrCabins: 0,
        nbrBedrooms: 0,
        phoneNumber: 0,
        imageUrl: '',
        userId: '',
        averageRating: '',
    });

    const { price } = boatData;

    console.log(price)

    let [fontsLoaded] = useFonts({
        'Lato-Bold': require('../../assets/Fonts/Lato/Lato-Bold.ttf'),
        'Lato-Regular': require('../../assets/Fonts/Lato/Lato-Regular.ttf'),
        'Lato-Black': require('../../assets/Fonts/Lato/Lato-Black.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }


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
            setImageUrl(result.assets[0].uri);
            console.log(result.assets[0].uri)
        }

    };



    const updateBoat = async () => {
        try {
            console.log('Updating boat with ID:', boatId);
            console.log('Boat data:', boatData);

            const response = await axios.put(`${BASE_URL}api/Boat/${boatId}`, boatData);
            console.log('PUT request response:', response);

            await updateBoatImage(boatId, imageUrl);

            if (response.status === 204) {
                console.log('Boat updated successfully');
                console.log(response)
            } else {
                console.log('Failed to update boat. Status:', response.status);
            }
        } catch (error) {
            console.error('Error updating boat:', error);
        }
    };

    const updateBoatImage = async (boatId, imageUrl) => {
        try {
            console.log('Updating boat image with ID:', boatId);
            console.log('Image URL:', imageUrl);

            const formData = new FormData();
            formData.append('file', {
                uri: imageUrl,
                type: 'image/jpeg',
                name: 'boat_image.jpg',
            });

            const updateImageResponse = await axios.put(`${BASE_URL}updateBoatImage/${boatId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Boat image update response:', updateImageResponse);
        } catch (error) {
        }
    };

    useEffect(() => {
        const getBoatData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}api/Boat/boat/${boatId}`);
                if (response.data) {
                    setBoatData(response.data);
                    
                } else {
                    console.log('Boat data not found.');
                }
            } catch (error) {
                console.error('Error fetching boat data:', error);
            }
        };

        getBoatData();
    }, []);


    return (
        <ScrollView style={{ backgroundColor: "white" }} stickyHeaderIndices={[0]}>
            <Header />
            <View style={styles.container}>
                <Text style={styles.TopTitle}>Boat Information</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', marginTop: 25, opacity: .5 }} />

                <View style={{ marginTop: 25 }}>

                    <View style={{}}>
                        <Text style={styles.Label}>Boat Name</Text>
                        <TextInput
                            value={boatData.name}
                            style={styles.input}
                            onChangeText={text => setBoatData({ ...boatData, name: text })}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.Label}>Description</Text>
                        <TextInput
                            value={boatData.description}
                            style={[styles.inputDescription, { textAlignVertical: 'top' }]} // Align text to the top
                            onChangeText={text => setBoatData({ ...boatData, description: text })}
                            multiline={true}
                        />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <QuantitySelector
                            value={price}
                            onChangeText={value => setBoatData({ ...boatData, price: value })}
                        />
                    </View>


                </View>
                <Text style={[styles.TopTitle, { paddingTop: 40 }]}>Boat Adress</Text>
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



                <View style={{ flexDirection: "row", marginRight: 10, marginBottom: 40 }}>
                    <TouchableOpacity style={[styles.PasswordModalReserverBtn, { backgroundColor: "black" }]} onPress={updateBoat}>
                        <Text style={{ fontFamily: "Lato-Bold", fontSize: 18, color: "white", alignSelf: "center", }}>Save</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.UploadCard} onPress={selectImage} >
                    <Image
                        source={require('../../assets/icons/upload.png')}
                        style={{ width: 35, height: 35, alignSelf: 'center' }}
                    />

                    <Text style={styles.Uploadtext2}>Upload from your device</Text>

                </TouchableOpacity>

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
    inputDescription: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 8,
        width: "97%",
        height: 150,
        paddingHorizontal: 10,
        paddingTop: 10
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
    UploadCard: {
        marginTop: 20,
        marginBottom: 40,
        borderColor: '#DDDDDD',
        alignItems: "center",
        justifyContent: 'space-evenly',
        height: 90,
        width: "100%",
        borderWidth: 1,
        borderRadius: 12,
        flexDirection: "row"
    },
    UploadConatinertext: {
        fontSize: 10,
        fontFamily: 'Lato-Regular',

    },

    Uploadtext2: {
        alignSelf: "center",
        justifyContent: "center",
        fontFamily: 'Lato-Regular',
        fontSize: 18,
    },

});

export default ProfilSettingScreen

