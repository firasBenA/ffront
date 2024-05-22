import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, RefreshControl, Modal, Switch, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../config';
import Icon from 'react-native-vector-icons/Feather';
import { CheckBox } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import Slider from '@react-native-community/slider';
import Card from '../../components/Card';

const SearchScreen = () => {
    const [boats, setBoats] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedBoatTypes, setSelectedBoatTypes] = useState([]);

    const navigation = useNavigation();


    const toggleBoatType = (type) => {
        if (selectedBoatTypes.includes(type)) {
            setSelectedBoatTypes(selectedBoatTypes.filter(boatType => boatType !== type));
        } else {
            setSelectedBoatTypes([...selectedBoatTypes, type]);
        }
    };

    const goToFilter = () => {
        setFilterVisible(true);
    };

    const closeFilter = () => {
        setFilterVisible(false);
    };

    const fetchBoatsRating = async () => {
        console.log("Fetching boats...");
        try {
            const response = await axios.get(`${BASE_URL}api/Boat`);
            console.log("Boats response:", response.data);

            const boatsWithRating = await Promise.all(response.data.map(async (boat) => {
                console.log("Fetching rating for boat:", boat.id);
                try {
                    const ratingResponse = await axios.get(`${BASE_URL}api/FeedBack/AverageRatingByBoatId/${boat.id}`);
                    console.log("Rating response for boat:", boat.id, ratingResponse.data);
                    const averageRating = ratingResponse.data;
                    return { ...boat, averageRating }; // Add average rating to each boat object
                } catch (ratingError) {
                    return boat;
                }
            }));
            console.log("Boats with rating:", boatsWithRating);

            // Sort boats by average rating in descending order
            boatsWithRating.sort((a, b) => b.averageRating - a.averageRating);

            setBoats(boatsWithRating);
        } catch (error) {
            console.error('Error fetching boats:', error);
            // Handle error fetching boats
        }
    };


    const onRefresh = async () => {
        setRefreshing(true);
        await fetchBoats();
        await fetchBoatsRating(); // Fetch boats again

        setRefreshing(false);
    };

    const fetchBoats = async () => {
        try {
            const response = await axios.get(`${BASE_URL}api/Boat`);
            setBoats(response.data);
        } catch (error) {
            console.error('Error fetching boats:', error);
        }
    };

    useEffect(() => {
        fetchBoats();
    }, []);

    const handleCardPress = async (boat) => {
        const { id: boatId, userId } = boat;
        navigation.navigate('Publication', { boatId, userId });
    };

    const filteredBoats = boats.filter(boat => {
        // Check if there are selected boat types
        if (selectedBoatTypes.length === 0) {
            // No boat type selected, filter based on search input only
            return boat.country.toLowerCase().includes(searchInput.toLowerCase());
        } else {
            // Boat types are selected, filter based on both search input and selected boat types
            return boat.country.toLowerCase().includes(selectedBoatTypes.includes(boat.boatType));
            // Replace 'boat.boatType' with the correct property name that represents the boat type in your data
        }
    });
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                stickyHeaderIndices={[0]}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <Header />
                {/*<TextInput
                    style={styles.searchInput}
                    placeholder="Search by City..."
                    value={searchInput}
                    onChangeText={setSearchInput}
            />*/}
                <View style={styles.filterText}>
                    <Text style={styles.smallText}>Showing {filteredBoats.length} out of {boats.length} Products</Text>
                    <TouchableOpacity onPress={goToFilter}>
                        <Image source={require("../../assets/icons/filter.png")} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                </View>
                {filteredBoats.reverse().map((boat) => (
                    <TouchableOpacity key={boat.id} onPress={() => handleCardPress(boat)}>
                        <Card
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
                            BoatType={boat.BoatType}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={filterVisible}
                onRequestClose={closeFilter}
            >
                <View style={styles.modalContainer}>
                    <ScrollView stickyHeaderIndices={[0]}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Filter</Text>
                            <Text style={styles.CloseBtn} onPress={closeFilter}>Close</Text>
                        </View>
                        <View style={{ marginTop: 40, paddingHorizontal: 10 }}>
                            <View style={{ paddingVertical: 12 }}>
                                <Text style={styles.title}>Search Destination</Text>
                                <View style={styles.inputContainer}>
                                    <Icon name="map-pin" size={20} color="black" style={styles.icon} />
                                    <TextInput value={searchInput} onChangeText={setSearchInput} placeholder="Las Vegas United..." placeholderTextColor="grey" style={{ fontSize: 18, fontFamily: "Lato-Regular", }} />
                                </View>
                            </View>

                            <View style={{ paddingVertical: 12 }}>
                                <Text style={styles.title}>Select Trip Date</Text>
                                <View style={styles.inputContainer}>
                                    <Icon name="calendar" size={25} color="black" style={styles.icon} />
                                    <TextInput placeholder="Fri 11/11/22 - Fri 18/11/20" placeholderTextColor="grey" style={{ fontSize: 18, fontFamily: "Lato-Regular", }} />
                                </View>
                            </View>

                            <View style={{ paddingVertical: 12 }}>
                                <Text style={styles.title}>Select Boat Type</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10 }}>
                                    <Text style={{ fontSize: 20, color: 'grey', fontFamily: 'Lato-Regular' }}>Sailboat</Text>
                                    <CheckBox size={33}
                                        checked={selectedBoatTypes.includes('Sailboat')}
                                        onPress={() => toggleBoatType('Sailboat')}
                                        checkedColor="black" />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 20, color: 'grey', fontFamily: 'Lato-Regular' }}>Motorboat</Text>
                                    <CheckBox size={33}
                                        checked={selectedBoatTypes.includes('Motorboat')}
                                        onPress={() => toggleBoatType('Motorboat')}
                                        checkedColor="black" />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 20, color: 'grey', fontFamily: 'Lato-Regular' }}>Jet Ski</Text>
                                    <CheckBox size={33}
                                        checked={selectedBoatTypes.includes('Jet ski')}
                                        onPress={() => toggleBoatType('Jet ski')}
                                        checkedColor="black" />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 20, color: 'grey', fontFamily: 'Lato-Regular' }}>Houseboat</Text>
                                    <CheckBox size={33}
                                        checked={selectedBoatTypes.includes('Houseboat')}
                                        onPress={() => toggleBoatType('Houseboat')}
                                        checkedColor="black" />
                                </View>
                            </View>

                            <View style={{ paddingVertical: 12 }}>
                                <Text style={styles.title}>Select Boat Type</Text>
                                <DropDownPicker
                                    items={[
                                        { label: '50 Miles', value: 'option1' },
                                        { label: '70 Miles', value: 'option2' },
                                        { label: '90 Miles', value: 'option3' }
                                    ]}
                                    open={false}
                                    setOpen={() => { }}
                                    value={null}
                                    setValue={() => { }}
                                    maxHeight={200}
                                    autoScroll
                                    containerStyle={styles.dropDownContainer}
                                    style={styles.dropDownPicker}
                                    itemStyle={styles.dropDownItem}
                                    dropDownStyle={styles.dropDown}
                                    labelStyle={styles.dropDownLabel}
                                    selectedItemContainerStyle={styles.selectedItemContainer}
                                    arrowIconStyle={styles.arrowIcon}
                                />
                            </View>

                            <View style={{ paddingVertical: 12 }}>
                                <Text style={styles.title}>Price Per Day</Text>
                                <Slider
                                    style={{ width: '100%', height: 60, marginVertical: 10 }}
                                    minimumValue={0}
                                    maximumValue={100}
                                    minimumTrackTintColor="#000000"
                                    maximumTrackTintColor="grey"
                                    thumbTintColor="#000000"
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={styles.inputMinMax}>
                                        <Text style={styles.textMinMax}>Min</Text>
                                        <TextInput
                                            style={styles.input}
                                            keyboardType="numeric"
                                            value="0"
                                            editable={false}
                                        />
                                    </View>
                                    <View style={styles.inputMinMax}>
                                        <Text style={styles.textMinMax}>Max</Text>
                                        <TextInput
                                            style={styles.input}
                                            keyboardType="numeric"
                                            value="100"
                                            editable={false}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={{ paddingVertical: 12, paddingTop: 40, flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
                                <Text style={styles.title}>Number Of People</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <TouchableOpacity style={styles.betweenButton}>
                                        <Image source={require('../../assets/icons/minus.png')} style={{ width: 30, height: 30, backgroundColor: "white" }} />
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: "Lato-Regular", fontSize: 18, flexDirection: "row", alignItems: "center" }}>0</Text>
                                    <TouchableOpacity style={styles.betweenButton}>
                                        <Image source={require('../../assets/icons/plus.png')} style={{ width: 30, height: 30, backgroundColor: "white" }} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ paddingVertical: 12, paddingTop: 40, flexDirection: "column" }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={styles.title}>Instant Booking</Text>
                                    <Switch value={true} />
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={styles.title}>Booking Request</Text>
                                    <Switch value={false} />
                                </View>
                            </View>

                            <TouchableOpacity style={styles.filterBtn} onPress={closeFilter}>
                                <Text >Show Results</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    filterText: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    smallText: {
        fontSize: 14,
        color: '#888',
    },
    icon: {
        width: 20,
        height: 20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        backgroundColor: "white",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    CloseBtn: {
        fontSize: 18,
        color: 'blue',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    dropDownContainer: {
        height: 40,
    },
    dropDownPicker: {
        borderColor: '#ddd',
    },
    dropDownItem: {
        justifyContent: 'flex-start',
    },
    dropDown: {
        borderColor: '#ddd',
    },
    dropDownLabel: {
        fontSize: 16,
    },
    selectedItemContainer: {
        backgroundColor: '#f0f0f0',
    },
    arrowIcon: {
        width: 20,
        height: 20,
    },
    inputMinMax: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textMinMax: {
        marginRight: 10,
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        width: 60,
        textAlign: 'center',
    },
    betweenButton: {
        paddingHorizontal: 10,
    },
    filterBtn: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 26,
        color: 'black',
        fontFamily: 'Lato-Bold',
        backgroundColor: "white"

    },
    CloseBtn: {
        fontSize: 16,
        color: 'grey',
    },
    header: {
        marginTop: 30,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "white"

    },
    title: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Lato-Bold',
    },
    inputContainer: {
        marginVertical: 15,
        paddingHorizontal: 12,
        borderWidth: .5,
        borderColor: 'grey',
        borderRadius: 12,
        width: "100%",
        height: 55,
        alignItems: "center",
        flexDirection: 'row'
    },
    icon: {
        width: "15%",
        paddingLeft: 5
    },

    picker: {
        height: 50,
        width: 150,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        fontSize: 16,
        color: 'black',
        width: '90%'
    },
    dropDownContainer: {
        marginTop: 10,
        backgroundColor: 'white',
    },
    dropDownPicker: {
        backgroundColor: 'white',
    },
    dropDownItem: {
        justifyContent: 'center',
        fontFamily: 'Lato-Regular', // Change font family for items
        paddingVertical: 10, // Adjust padding as needed
        paddingHorizontal: 15, // Adjust padding as needed
    },
    dropDown: {
        backgroundColor: 'white',
        borderRadius: 8,
    },
    dropDownLabel: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Lato-Regular',
    },
    selectedItemContainer: {
        backgroundColor: 'lightgrey', // Background color for selected item
        borderRadius: 8,
    },
    arrowIcon: {
        color: 'black',
    },


    textMinMax: {
        fontFamily: 'Lato-Bold',
        paddingHorizontal: 10,
        fontSize: 18,
        color: 'grey'

    },
    inputMinMax: {
        borderRadius: 8,
        backgroundColor: '#ECECEC',
        width: "45%",
        height: 80,
        fontSize: 14,
        borderWidth: 0.5,
        borderColor: 'grey',
        outlineWidth: 0,
        justifyContent: "center"
    },
    input: {
        paddingHorizontal: 10,
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: 'black'
    },
    betweenButton: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 8,
        marginRight: 5,
        marginLeft: 5,
    },
});
