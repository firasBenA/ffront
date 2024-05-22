import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import CountryPicker from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-input';
import QuantitySelector from '../../components/QuantitySelector';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { launchImageLibraryAsync } from 'expo-image-picker';
import Header from '../../components/Header';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';









const AddWelcome = () => {

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState('');


    const navigation = useNavigation();

    const goToMyBoats = () => {
        navigation.navigate('Home');
    };

    useEffect(() => {
        GetId();
    }, []);

    const [userId, setUserId] = useState(0);
    const [id, setId] = useState(59);
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState(1);
    const [description, setDescription] = useState('A luxurious yacht for coastal cruises.');
    const [price, setPrice] = useState(50);
    const [nbrBedrooms, setNbrBedrooms] = useState(0);
    const [nbrCabins, setNbrCabins] = useState(0);
    const [type, setType] = useState('Yacht');
    const [phoneNumber, setPhoneNumber] = useState('1234567890'); // Converted to string 
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [step, setStep] = useState(0);
    const [userName, setUserName] = useState('');

    const [boatType, setBoatType] = useState(null);

    const [wifi, setWifi] = useState(0);
    const [tv, setTv] = useState(0);
    const [hotWater, setHotWater] = useState(0);
    const [GPS, setGPS] = useState(0);
    const [bathingLadder, setBathingLadder] = useState(0);
    const [pilotAutomatique, setPilotAutomatique] = useState(0);
    const [shower, setShower] = useState(0);
    const [speaker, setSpeaker] = useState(0);

    const handleButtonPress = (label) => {
        switch (label) {
            case 'WIFI':
                setWifi(prevWifi => {
                    const newWifi = prevWifi === 0 ? 1 : 0;
                    console.log("wifi", newWifi);
                    return newWifi;
                });
                break;
            case 'TV':
                setTv(prevTv => {
                    const newTv = prevTv === 0 ? 1 : 0;
                    console.log("tv", newTv);
                    return newTv;
                });
                break;
            case 'Hot water':
                setHotWater(prevHotWater => {
                    const newHotWater = prevHotWater === 0 ? 1 : 0;
                    console.log("hotWater", newHotWater);
                    return newHotWater;
                });
                break;
            case 'GPS':
                setGPS(prevGPS => {
                    const newGPS = prevGPS === 0 ? 1 : 0;
                    console.log("GPS", newGPS);
                    return newGPS;
                });
                break;
            case 'bathing-ladder':
                setBathingLadder(prevBathingLadder => {
                    const newBathingLadder = prevBathingLadder === 0 ? 1 : 0;
                    console.log("bathingLadder", newBathingLadder);
                    return newBathingLadder;
                });
                break;
            case 'Pilot Auto':
                setPilotAutomatique(prevPilotAutomatique => {
                    const newPilotAutomatique = prevPilotAutomatique === 0 ? 1 : 0;
                    console.log("pilotAutomatique", newPilotAutomatique);
                    return newPilotAutomatique;
                });
                break;
            case 'Shower':
                setShower(prevShower => {
                    const newShower = prevShower === 0 ? 1 : 0;
                    console.log("shower", newShower);
                    return newShower;
                });
                break;
            case 'Speaker':
                setSpeaker(prevSpeaker => {
                    const newSpeaker = prevSpeaker === 0 ? 1 : 0;
                    console.log("speaker", newSpeaker);
                    return newSpeaker;
                });
                break;
            default:
                break;
        }
    };

    useEffect(() => {

    }, []);


    const [fontsLoaded] = useFonts({
        'Lato-Bold': require('../../assets/Fonts/Lato/Lato-Bold.ttf'),
        'Lato-Regular': require('../../assets/Fonts/Lato/Lato-Regular.ttf'),
        'Lato-Black': require('../../assets/Fonts/Lato/Lato-Black.ttf'),
    });

    const GetId = async () => {
        console.log(imageUrl);
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData);
                const userId = user.id;
                const userName = user.name;
                setUserName(userName);
                setUserId(userId);
                console.log('User:', JSON.stringify(user));
                return userId; // Return the user ID
            } else {
                Alert.alert('User not found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
            Alert.alert('Error', 'Failed to fetch user ID');
            return null;
        }
    };

    const addEquipement = async (newId) => {

        console.log('boatId:', newId);
        const idBoat = newId;
        try {
            const equipmentResponse = await axios.post(`${BASE_URL}api/Equipment`, {
                idBoat,
                wifi,
                tv,
                hotWater,
                GPS,
                bathingLadder,
                pilotAutomatique,
                shower,
                speaker,

            });

            console.log('equipment added:', equipmentResponse.data);

        } catch (error) {
            console.error('Error adding equipment:', error);
            Alert.alert('Error', 'Error adding equipment. Please try again later.');
        }
    };

    const addBoat = async () => {
        console.log(boatType);
        try {
            const user = await GetId(); // Get the user ID before adding the boat
            if (!user) {
                Alert.alert('User ID not available');
                return;
            }

            const boatResponse = await axios.post(`${BASE_URL}api/Boat`, {
                name,
                capacity,
                nbrCabins,
                nbrBedrooms,
                description,
                price,
                type,
                phoneNumber,
                boatType,
                userId,
                country,
                city,
            });

            console.log('Boat added:', boatResponse.data);

            const newId = boatResponse.data.id;

            setId(newId);

            console.log('Updated id:', newId);

            Alert.alert('Success', 'Boat added successfully');

            await updateBoatImage(newId, imageUrl);
            await addEquipement(newId);


        } catch (error) {
            console.error('Error adding boat:', error);
            Alert.alert('Error', 'Failed to add boat. Please try again later.');
        }
    };

    const updateBoatImage = async (id, imageUrl) => {
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: imageUrl,
                type: 'image/jpeg',
                name: 'boat_image.jpg',
            });

            const updateImageResponse = await axios.put(`${BASE_URL}updateBoatImage/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

        } catch (error) {
            Alert.alert('Error', 'Failed to update boat image. Please try again later.');
        }
    };


    ///////const newImageUrl = imageUrl.replace("wwwroot", ""); 
    //////const modifiedImageUrl = "/" + newImageUrl; 

    /*const uploadImage = async () => {
    
        if (!ImageUrl) {
            Alert.alert('Error', 'Please select an image before uploading.');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: ImageUrl,
                name: 'boatImage.jpg',
                type: 'image/jpeg',
            });
    
            const boatResponse = await axios.post(`${BASE_URL}uploadImage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Image uploaded:', boatResponse.data);
            Alert.alert('Success', 'Image uploaded successfully.');
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to upload image. Please try again.');
        }
    };*/




    const totalSteps = 6;

    const handleNextStep = () => {
        if (step <= totalSteps) {
            setStep(step + 1);
        }
    };

    const handlePreviousStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    if (!fontsLoaded) {
        return null;
    }


    const renderStepOne = () => (
        <View>
            <ScrollView stickyHeaderIndices={[0]} >
                <Header />

                <View style={styles.TopContainer}>
                    <Text style={styles.WelcomeText}>Welcome back {userName}</Text>
                    <Text style={styles.simpleText}>Add new boat </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={styles.btnContainer} onPress={handleNextStep}>
                        <Image source={require('../../assets/icons/ship.png')} style={{ width: 40, height: 40, marginRight: 30 }} />
                        <Text style={{ fontSize: 18, fontFamily: "Lato-Bold" }}>Create a new boat</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={styles.btnContainer} onPress={handleNextStep}>
                        <Image source={require('../../assets/icons/ship.png')} style={{ width: 40, height: 40, marginRight: 30 }} />
                        <Text style={{ fontSize: 18, fontFamily: "Lato-Bold" }}>Create a new boat</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );

    const buttonsData = [
        { id: 1, label: 'Motor boat', image: require('../../assets/icons/BoatType/boat-motor.png') },
        { id: 2, label: 'Sailboat', image: require('../../assets/icons/BoatType/sailboat.png') },
        { id: 3, label: 'RIB', image: require('../../assets/icons/BoatType/rowing-boat.png') },
        { id: 4, label: 'House boat', image: require('../../assets/icons/BoatType/houseboat.png') },
        { id: 5, label: 'Jet ski', image: require('../../assets/icons/BoatType/jet-ski.png') },
        { id: 6, label: 'Yacht', image: require('../../assets/icons/BoatType/yacht.png') },
        { id: 7, label: 'Catamaran', image: require('../../assets/icons/BoatType/boat-motor.png') },
        { id: 8, label: 'Gulet', image: require('../../assets/icons/BoatType/yacht.png') },
        { id: 9, label: 'Motor yacht', image: require('../../assets/icons/BoatType/yacht.png') },


    ];


    const handleBedroomIncrement = () => {
        setNbrBedrooms(prevQuantity => prevQuantity + 1);
    };

    const handleBedroomDecrement = () => {
        if (nbrBedrooms > 1) {
            setNbrBedrooms(prevQuantity => prevQuantity - 1);
        }
    };

    const handleGuestIncrement = () => {
        setCapacity(prevQuantity => prevQuantity + 1);
    };

    const handleGuestDecrement = () => {
        if (capacity > 1) {
            setCapacity(prevQuantity => prevQuantity - 1);
        }
    };
    const handleCabineIncrement = () => {
        setNbrCabins(prevQuantity => prevQuantity + 1);
    };

    const handleCabineDecrement = () => {
        if (nbrCabins > 1) {
            setNbrCabins(prevQuantity => prevQuantity - 1);
        }
    };

    const GridButton = ({ item, onPress, isSelected }) => (
        <TouchableOpacity
            activeOpacity={0.2}
            style={[
                styles.buttonContainer,
                isSelected ? styles.selectedButton : null
            ]}
            onPress={() => onPress(item)}
        >
            <LinearGradient
                colors={['#F5F5F5', 'grey']}
                start={[0, 0]}
                end={[1, 8]}
                style={styles.gradient}
            >
                <Image source={item.image} style={styles.miniIcons} />
                <Text style={{ fontFamily: "Lato-Bold", fontSize: 14, paddingTop: 10 }}>{item.label}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    const renderGridItem = ({ item }) => (
        <GridButton
            item={item}
            onPress={handleBoatTypeSelect}
            isSelected={boatType && boatType.id === item.id}
        />
    );

    const handleBoatTypeSelect = (boatType) => {
        setBoatType(boatType.label);
        console.log('Selected Boat Type:', boatType.label); // Log the boat type to the console
    };

    const renderStepTwo = () => (
        <ScrollView stickyHeaderIndices={[0]}>
            <Header />
            <View style={styles.container}>
                <View style={{ marginTop: "10%", marginBottom: 80 }}>
                    <Text style={styles.simpleText}>Now, let's give your boat a title *</Text>
                    <TextInput
                        style={styles.inputContainer}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={{ marginBottom: 80 }}>
                    <Text style={styles.simpleText}>What type of boat do you have?</Text>
                    <View style={{ marginTop: 20 }}>
                        <FlatList
                            data={buttonsData}
                            renderItem={renderGridItem}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={3}
                            contentContainerStyle={styles.buttonGrid}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 80 }}>
                    <Text style={styles.simpleText}>Now, set the price</Text>
                    <QuantitySelector
                        value={price}
                        onChangeText={setPrice}
                    />
                </View>
                <View style={{ marginBottom: 80 }}>
                    <Text style={styles.simpleText}>Create your description</Text>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        style={styles.inputContainer}
                    />
                </View>
                <View style={{ marginBottom: 80 }}>
                    <Text style={styles.simpleText}>About your boat</Text>
                    <LinearGradient
                        colors={['white', '#DDDDDD']}
                        start={[0, 0]}
                        end={[1, 10]}
                        style={styles.priceContainer}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: 16, fontFamily: "Lato-Bold" }}> Bed rooms</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={handleBedroomDecrement}>
                                <Image source={require("../../assets/icons/minus.png")} style={{ width: 30, height: 30, margin: 10 }} />
                            </TouchableOpacity>
                            <TextInput
                                style={{ fontSize: 20, fontFamily: "Lato-Regular" }}
                                value={nbrBedrooms.toString()}
                                onChangeText={text => setNbrBedrooms(parseInt(text) || 0)} // Ensure quantity is a number
                                keyboardType="numeric"
                            />
                            <TouchableOpacity onPress={handleBedroomIncrement}>
                                <Image source={require("../../assets/icons/pluss.png")} style={{ width: 30, height: 30, margin: 10 }} />
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                    <LinearGradient
                        colors={['white', '#DDDDDD']}
                        start={[0, 0]}
                        end={[1, 10]}
                        style={styles.priceContainer}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: 16, fontFamily: "Lato-Bold" }}> Capacity</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={handleGuestDecrement}>
                                <Image source={require("../../assets/icons/minus.png")} style={{ width: 30, height: 30, margin: 10 }} />
                            </TouchableOpacity>
                            <TextInput
                                style={{ fontSize: 20, fontFamily: "Lato-Regular" }}
                                value={capacity.toString()}
                                onChangeText={text => setCapacity(parseInt(text) || 0)} // Ensure quantity is a number
                                keyboardType="numeric"
                            />
                            <TouchableOpacity onPress={handleGuestIncrement}>
                                <Image source={require("../../assets/icons/pluss.png")} style={{ width: 30, height: 30, margin: 10 }} />
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                    <LinearGradient
                        colors={['white', '#DDDDDD']}
                        start={[0, 0]}
                        end={[1, 10]}
                        style={styles.priceContainer}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: 16, fontFamily: "Lato-Bold" }}> Cabins</Text>
                        </View>
                        <View style={{ flexDirection: "row", fontFamily: "Lato-Bold" }}>
                            <TouchableOpacity onPress={handleCabineDecrement}>
                                <Image source={require("../../assets/icons/minus.png")} style={{ width: 30, height: 30, margin: 10 }} />
                            </TouchableOpacity>
                            <TextInput
                                style={{ fontSize: 20, fontFamily: "Lato-Regular" }}
                                value={nbrCabins.toString()}
                                onChangeText={text => setNbrCabins(parseInt(text) || 0)} // Ensure quantity is a number
                                keyboardType="numeric"
                            />
                            <TouchableOpacity onPress={handleCabineIncrement}>
                                <Image source={require("../../assets/icons/pluss.png")} style={{ width: 30, height: 30, margin: 10 }} />
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </ScrollView>
    );


    const renderStepThree = () => {

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
                setImageUrl(result.assets[0].uri); // Set the selected image data
                console.log(result.assets[0].uri)
            }

        };


        /*return (
            <View>
                <Header />
    
    
                <View style={styles.container}>
                    <TouchableOpacity onPress={selectImage}>
                        <Text>Upload Image</Text>
                    </TouchableOpacity>
                    <Button title='upload Boat' onPress={addBoat} />
                    {imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200, marginTop: 20 }} />}
                </View>
            </View>
        );*/
        return (
            <View style={{ backgroundColor: 'white' }}>

                <Header />

                <View style={styles.UploadContainer}>
                    <Text style={styles.UploadConatinertext}>Add some photos of your boat</Text>

                    <TouchableOpacity style={styles.UploadCard} onPress={selectImage} >
                        <Image
                            source={require('../../assets/icons/upload.png')}
                            style={{ width: 50, height: 50 }}
                        />
                        <Text style={styles.Uploadtext}>Drag your photos here</Text>
                        <Text style={styles.Uploadtext1}>Choose at least 1 photo</Text>

                        <Text style={styles.Uploadtext2}>Upload from your device</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    };

    const [countryCode, setCountryCode] = useState('US'); // Initial country code, set to United States by default

    const onSelectCountry = (country) => {
        setCountryCode(country.cca2); // Update the country code when a country is selected
    };

    const onChangePhoneNumber = (value) => {
        setPhoneNumber(value);
    };

    /*<CountryPicker
                          withFilter
                          withFlag
                          withCountryNameButton
                          withAlphaFilter
                          countryCode={countryCode}
                          onSelect={onSelectCountry}
                          containerButtonStyle={styles.countryPickerButton}
                      />*/

    const handleMapPress = async (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;

        try {
            const response = await Geocoder.from({ latitude, longitude });
            const address = response.results[0].formatted_address;
            setSelectedAddress(address);
        } catch (error) {
            console.error('Error fetching address:', error);
        }

        setSelectedLocation({ latitude, longitude });
    };

    const handleSaveLocation = () => {
        // Implement your logic to save the selectedLocation and selectedAddress
        console.log('Selected Location:', selectedLocation);
        console.log('Selected Address:', selectedAddress);
    };


    const renderStepFour = () => (
        <ScrollView stickyHeaderIndices={[0]}>
            <Header />

            <View style={styles.container} >

                {/*<View style={{ marginBottom: 80 }}>
                    <Text style={styles.simpleText}>Phone number</Text>
                    <View style={styles.phoneInputContainer}>

                        <PhoneInput
                            ref={(ref) => {
                                phone = ref;
                            }}
                            onPressFlag={() => phone.selectCountry(countryCode)}
                            initialCountry={countryCode}
                            onChangePhoneNumber={onChangePhoneNumber}
                            style={styles.phoneInput}
                            textStyle={styles.phoneInputText}
                            textProps={{ placeholder: '+216', keyboardType: 'phone-pad' }}
                        />
                    </View>
                </View>*/}


                <View style={{ marginBottom: 80, marginTop: 40 }}>
                    <Text style={styles.simpleText}>Where is your boat located</Text>

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
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            onPress={handleMapPress}
                        >
                            {selectedLocation && <Marker coordinate={selectedLocation} />}
                        </MapView>
                        {selectedLocation && (
                            <View style={styles.selectedLocationContainer}>
                                <Text style={styles.selectedLocationText}>
                                    Selected Location: {JSON.stringify(selectedLocation)}
                                </Text>
                                <Text style={styles.selectedLocationText}>
                                    Selected Address: {selectedAddress}
                                </Text>
                                <Button title="Save Location" onPress={handleSaveLocation} />
                            </View>
                        )}
                    </View>
                </View>



            </View>
        </ScrollView>
    );

    const GridEquipmentsButton = ({ item }) => (
        <TouchableOpacity
            style={styles.buttonEquipementsContainer}
            onPress={() => handleButtonPress(item.label)}
        >
            <Image source={item.image} style={styles.miniIcons} />
            <Text style={{ fontFamily: "Lato-Regular", fontSize: 18, paddingTop: 10 }}>{item.label}</Text>
        </TouchableOpacity>
    );

    const buttonsEquipementsData = [
        { id: 1, label: 'WIFI', image: require('../../assets/icons/equipments/wifi.png') },
        { id: 2, label: 'TV', image: require('../../assets/icons/equipments/TV.png') },
        { id: 3, label: 'Hot water', image: require('../../assets/icons/equipments/hot-water.png') },
        { id: 4, label: 'GPS', image: require('../../assets/icons/equipments/gps.png') },
        { id: 5, label: 'bathing-ladder', image: require('../../assets/icons/equipments/bathing-ladder.png') },
        { id: 6, label: 'Pilot Auto', image: require('../../assets/icons/equipments/pilot.png') },
        { id: 7, label: 'Shower', image: require('../../assets/icons/equipments/shower.png') },
        { id: 8, label: 'Speaker', image: require('../../assets/icons/equipments/speaker.png') },

    ];

    const renderStepFive = () => {


        return (
            <View>
                <Header />
                <View style={styles.container}>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.simpleText}>On board equipments</Text>
                    </View>
                    <View style={{ flexWrap: 'wrap', flexDirection: "row" }}>
                        {buttonsEquipementsData.map((item) => (
                            <GridEquipmentsButton key={item.id} item={item} />
                        ))}
                    </View>
                </View>
            </View>
        );
    };


    const renderStepSix = () => (
        <View>
            <Header />
            <View style={styles.container}>
                <View style={{ alignItems: 'center', marginTop: 100 }}>
                    <Image source={require('../../assets/icons/check.png')} style={{ width: 80, height: 80 }} />
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 18, marginTop: 40 }}>Press to add the boat</Text>
                    <TouchableOpacity style={{ marginTop: 30, height: 60, width: 130, backgroundColor: 'black', borderRadius: 8, alignItems: 'center', justifyContent: "center" }} onPress={addBoat}>
                        <Text style={{ fontSize: 18, fontFamily: 'Lato-Bold', color: 'white' }} onPress={addBoat}>Confirme</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );




    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.formContainer}>
                {step === 0 && renderStepOne()}
                {step === 1 && renderStepTwo()}
                {step === 2 && renderStepThree()}
                {step === 3 && renderStepFour()}
                {step === 4 && renderStepFive()}
                {step === 5 && renderStepSix()}




            </ScrollView>
            <View >
                <View style={styles.progressBar}>
                    {[...Array(totalSteps)].map((_, index) => (
                        <View key={index} style={[styles.progressStep, index < step && styles.progressStepActive]} />
                    ))}
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, backgroundColor: "white" }}>
                    <TouchableOpacity style={{ flexDirection: "row", marginVertical: 30 }} onPress={handlePreviousStep}>
                        <Image source={require("../../assets/icons/right-arrow.png")} style={{ width: 20, height: 20, marginHorizontal: 10 }} />
                        <Text>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", marginVertical: 30 }} onPress={handleNextStep}>
                        <Text>Next</Text>
                        <Image source={require("../../assets/icons/right-arrow.png")} style={{ width: 20, height: 20, marginHorizontal: 10 }} />
                    </TouchableOpacity>


                </View>
            </View>


        </View>
    );
};



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "white"

    },
    container: {
        paddingTop: 50,
        paddingHorizontal: 15,
        backgroundColor: "white"

    },

    TopContainer: {
        marginTop: "25%",
        marginLeft: 20

    },
    TopUploadContainer: {
        marginTop: 100,
        marginLeft: 20

    },
    WelcomeText: {
        fontSize: 24,
        paddingTop: 50,
        paddingBottom: 50,
        fontFamily: "Lato-Bold"
    },
    simpleText: {
        color: "black",
        fontSize: 20,
        fontFamily: "Lato-Regular"
    },
    btnContainer: {

        width: "92%",
        height: 100,
        marginTop: 25,
        borderWidth: .4,
        borderRadius: 8,
        paddingHorizontal: 30,
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",

    },

    gradient: {
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },



    progressBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    progressStep: {
        flex: 1,
        height: 5,
        backgroundColor: '#DDDDDD',
    },
    progressStepActive: {
        backgroundColor: 'black',
    },

    inputContainer: {
        marginTop: 20,
        borderWidth: .8,
        borderColor: "grey",
        borderRadius: 10,
        height: 60,
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: 'Lato-Regular'
    },
    buttonContainer: {
        width: "30%",
        height: 130,
        margin: 6,
        justifyContent: "space-around",
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    miniIcons: {
        width: 35,
        height: 35,
        marginBottom: 5,
    },



    priceContainer: {
        marginTop: 20,
        borderWidth: .5,
        borderColor: "grey",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        justifyContent: "space-between"
    },

    uploadContainer: {
        marginTop: 20,
        borderWidth: 2,
        borderColor: "#DDDDDD",
        borderRadius: 20,
        height: 400,
        flexDirection: "column",
        alignItems: "center",

    },

    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 20
    },
    countryPickerButton: {
        paddingHorizontal: 5,
    },
    phoneInput: {
        flex: 1,
        height: 60,
        marginLeft: 5,
    },
    phoneInputText: {
        fontSize: 16,
    },
    mapContainer: {
        marginTop: 20,
        borderRadius: 15,
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        aspectRatio: 20 / 25, // Set aspect ratio for better display
    },
    buttonEquipementsContainer: {
        width: '44%', // Adjust width as needed
        height: 120, // Adjust height as needed
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: "#DDDDDD",
        margin: 8,
        marginVertical: 8, // Adjust vertical margin as needed
        borderRadius: 10, // Add border radius as needed
    },
    selectedLocationContainer: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    selectedLocationText: {
        marginBottom: 10,
    },

    UploadContainer: {
        marginTop: 45,
        paddingHorizontal: 20,
        paddingTop: 80,
        justifyContent: "center"
    },
    UploadConatinertext: {
        fontSize: 18,
        fontFamily: 'Lato-Regular',

    },
    UploadCard: {
        borderColor: '#DDDDDD',
        justifyContent: "center",
        alignItems: 'center',
        height: 300,
        width: "100%",
        borderWidth: 1,
        padding: 30,
        borderRadius: 12,
        marginTop: 20
    },
    UploadConatinertext: {
        fontSize: 18,
        fontFamily: 'Lato-Regular',

    },
    Uploadtext: {
        fontSize: 20,
        paddingTop: 30,
        fontFamily: 'Lato-Regular',
    },
    Uploadtext1: {
        fontSize: 14,
        paddingTop: 14,
        fontFamily: 'Lato-Regular',


    },
    Uploadtext2: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        paddingTop: 30,
        textDecorationLine: 'underline'

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
    selectedButton: {
        borderColor: 'black', // Border color when selected
        borderWidth: 2, // Border width when selected
    }
});











export default AddWelcome;

