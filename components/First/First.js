import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Modal, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { BASE_URL } from '../../config';

const HomeScreen = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [showCitiesModal, setShowCitiesModal] = useState(false);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);

    const onChangeStart = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStart(false);
        setStartDate(currentDate);
    };

    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEnd(false);
        setEndDate(currentDate);
    };

    const handleLocationPress = async () => {
        const boats = await fetchBoats();
        const cities = extractCities(boats);
        setCities(cities);
        setShowCitiesModal(true);
    };

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setShowCitiesModal(false);
    };

    const fetchBoats = async () => {
        try {
            const response = await axios.get(`${BASE_URL}api/Boat`);
            return response.data;
        } catch (error) {
            console.error('Error fetching boats:', error);
            return [];
        }
    };

    const extractCities = (boats) => {
        const cities = boats.map(boat => boat.city);
        return [...new Set(cities)];
    };

    let [fontsLoaded] = useFonts({
        'Lato-Bold': require('../../assets/Fonts/Lato/Lato-Bold.ttf'),
        'Lato-Regular': require('../../assets/Fonts/Lato/Lato-Regular.ttf'),
        'Lato-Black': require('../../assets/Fonts/Lato/Lato-Black.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    const fetchAvailableBoats = async () => {
        try {
            const response = await axios.get(`${BASE_URL}api/reservation/available`, {
                params: {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    city: selectedCity
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching available boats:', error);
        }
    };

    const handleSearch = (text) => {
        const searchText = text.toLowerCase();
        const filteredCities = cities.filter(city => city.toLowerCase().includes(searchText));
        setFilteredCities(filteredCities);
    };

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <ImageBackground
                    source={require('../../assets/image/backImg.jpeg')}
                    style={styles.backgroundImage}
                >
                    <View style={styles.whiteContainer}>
                        <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                            <Text style={styles.topText}>DISCOVER THE NEW WORLD</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <View style={styles.inputContainer}>
                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleLocationPress}>
                                    <Icon name="map-pin" size={22} color="black" style={styles.icon} />
                                    <Text style={{ paddingTop: 5, paddingHorizontal: 18, fontSize: 16, fontFamily: 'Lato-Regular' }}>
                                        {selectedCity || 'Location'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputContainer}>
                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setShowStart(true)}>
                                    <Icon name="calendar" size={22} color="black" style={styles.icon} />
                                    <View style={{ flexDirection: "column" }}>
                                        <Text style={{ marginLeft: 22, fontSize: 14, fontFamily: 'Lato-Regular' }}>Departure</Text>
                                        <Text style={{ marginLeft: 22, fontSize: 16, fontFamily: 'Lato-Bold' }}>{startDate.toLocaleDateString() || 'Departure'}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputContainer}>
                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setShowEnd(true)}>
                                    <Icon name="calendar" size={22} color="black" style={styles.icon} />
                                    <View style={{ flexDirection: "column" }}>
                                        <Text style={{ marginLeft: 22, fontSize: 14, fontFamily: 'Lato-Regular' }}>Arrival</Text>
                                        <Text style={{ marginLeft: 22, fontSize: 16, fontFamily: 'Lato-Bold' }}>{endDate.toLocaleDateString() || 'Select End Date'}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.buttonContainer} onPress={fetchAvailableBoats}>
                                <Text style={styles.buttontext}>SUBMIT </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

                {showStart && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        onChange={onChangeStart}
                    />
                )}

                {showEnd && (
                    <DateTimePicker
                        value={endDate}
                        mode="date"
                        display="default"
                        onChange={onChangeEnd}
                    />
                )}

                <Modal
                    visible={showCitiesModal}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowCitiesModal(false)}
                >
                    <View style={styles.centredView}>
                        <View style={styles.modalView}>
                            <Text style={{ fontFamily: 'Lato-Bold', fontSize: 18, marginBottom: 10 }}>Select a City</Text>

                            <View style={styles.searchContainer}>
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Search City..."
                                    placeholderTextColor="#999"
                                    onChangeText={handleSearch}
                                />
                            </View>

                            <ScrollView>
                                {filteredCities.map((city, index) => (
                                    <TouchableOpacity key={index} onPress={() => handleCitySelect(city)} style={{borderBottomWidth:1}}>
                                        <Text style={styles.cityItem}>{city}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: "100%",
        height: 650,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: 'cover',
    },
    whiteContainer: {
        marginTop: 40,
        backgroundColor: "white",
        width: "89%",
        height: 380,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 6,
    },
    topText: {
        fontSize: 20,
        color: '#333',
        paddingTop: 8,
        textAlign: "center",
        fontFamily: 'Lato-Black',
        lineHeight: 20 * 1.5,
    },
    inputContainer: {
        marginBottom: 12,
        borderWidth: .5,
        borderColor: 'grey',
        borderRadius: 12,
        width: "87%",
        height: 60,
        padding: 10,
    },
    icon: {
        marginLeft: 10,
        marginTop: 10
    },
    buttonContainer: {
        backgroundColor: '#0B2447',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 5,
        width: "87%",
        height: 60
    },
    buttontext: {
        color: "white",
        fontFamily: "Lato-Bold"
    },
    centredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
        bottom: 76
    },
    modalView: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white',
        width: "89%",
        height: 380,
        borderRadius: 10,
        padding: 15,
        justifyContent: "center",
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        paddingBottom: 5,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: '#333',
    },
});

export default HomeScreen;
