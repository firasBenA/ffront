import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Switch, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';
import { CheckBox } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import Slider from '@react-native-community/slider';


import { useNavigation } from '@react-navigation/native';



const Filter = () => {
    const navigation = useNavigation();

    const goToPublication = () => {
        navigation.navigate('SearchScreen');
    };
    const [searchInputDestination, setSearchInputDestination] = useState('');

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const [withCrewEnabled, setWithCrewEnabled] = useState(false);
    const [freeCancellationEnabled, setFreeCancellationEnabled] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(0); // State variable for the number of people

    const [isOpen, setIsOpen] = useState(false);
    const [currentValues, setCurrentValues] = useState();
    const [selectedDropDownValue, setSelectedDropDownValue] = useState(null);
    const items = [
        { label: '50 Miles', value: 'option1' },
        { label: '70 Miles', value: 'option2' },
        { label: '90 Miles', value: 'option3' },
    ];

    const [isChecked, setIsChecked] = useState(null);


    const handleCheckboxChange = (index) => {
        // Toggle the checked state if the checkbox is already checked
        if (isChecked === index) {
            setIsChecked(null); // Uncheck the checkbox
        } else {
            setIsChecked(index); // Check the checkbox
        }
    }

    let [fontsLoaded] = useFonts({
        'Lato-Bold': require('../../assets/Fonts/Lato/Lato-Bold.ttf'),
        'Lato-Regular': require('../../assets/Fonts/Lato/Lato-Regular.ttf'),
        'Lato-Black': require('../../assets/Fonts/Lato/Lato-Black.ttf'),
    });

    if (!fontsLoaded) {
        console.error('Fonts not loaded!');
        return null;
    }


    const handleRangeChange = (value) => {
        if (value <= minValue) {
            setMinValue(value);
        } else {
            setMaxValue(value);
        }
    };

    const incrementNumberOfPeople = () => {
        setNumberOfPeople(prev => prev + 1); // Increment the number of people
    };

    const decrementNumberOfPeople = () => {
        if (numberOfPeople > 0) {
            setNumberOfPeople(prev => prev - 1); // Decrement the number of people if it's greater than 0
        }
    };

    const toggleWithCrewSwitch = () => {
        setWithCrewEnabled(previousState => !previousState);
    };

    const toggleFreeCancellationSwitch = () => {
        setFreeCancellationEnabled(previousState => !previousState);
    };


    return (
        <View style={styles.container}>
            <ScrollView  stickyHeaderIndices={[0]}>
                <View style={styles.header} >
                    <Text style={styles.headerTitle}>Filter</Text>
                    <Text style={styles.CloseBtn} onPress={goToPublication}>Close</Text>
                </View>
                <View style={{ marginTop: 40, paddingHorizontal: 10 }}>
                    <View style={{ paddingVertical: 12 }}>
                        <Text style={styles.title}>Search Destination</Text>
                        <View style={styles.inputContainer}>
                            <Icon name="map-pin" size={20} color="black" style={styles.icon} />
                            <TextInput value={searchInputDestination} onChangeText={setSearchInputDestination} placeholder="Las Vegas United..." placeholderTextColor="grey" style={{ fontSize: 18, fontFamily: "Lato-Regular", }} />
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
                        <Text style={styles.title}>Categories</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10 }}>
                            <Text style={{ fontSize: 20, color: 'grey', fontFamily: 'Lato-Regular' }}>Sailboat</Text>
                            <CheckBox checked={isChecked === 1} onPress={() => handleCheckboxChange(1)} size={33} checkedColor="black" />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 20, color: 'grey', fontFamily: 'Lato-Regular' }}>Motorboat</Text>
                            <CheckBox checked={isChecked === 2} onPress={() => handleCheckboxChange(2)} size={33} checkedColor="black" />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 20, color: 'grey', fontFamily: 'Lato-Regular' }}>Jet Ski</Text>
                            <CheckBox checked={isChecked === 3} onPress={() => handleCheckboxChange(3)} size={33} checkedColor="black" />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 20, color: 'grey', fontFamily: 'Lato-Regular' }}>Houseboat</Text>
                            <CheckBox checked={isChecked === 4} onPress={() => handleCheckboxChange(4)} size={33} checkedColor="black" />
                        </View>
                    </View>
                    <View style={{ paddingVertical: 12 }}>
                        <Text style={styles.title}>Select Boat Type</Text>
                        <DropDownPicker
                            items={items}
                            open={isOpen}
                            setOpen={() => setIsOpen(!isOpen)}
                            value={currentValues}
                            setValue={(val) => setCurrentValues(val)}
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
                            minimumTrackTintColor="#000000" // Change the color of the track to black
                            maximumTrackTintColor="grey"
                            thumbTintColor="#000000" // Change the color of the thumb to black
                            onValueChange={handleRangeChange}

                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={styles.inputMinMax}>
                                <Text style={styles.textMinMax}>Min</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={minValue.toString()}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.inputMinMax}>
                                <Text style={styles.textMinMax}>Max</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={maxValue.toString()}
                                    editable={false}
                                />
                            </View>
                        </View>

                    </View>

                    <View style={{ paddingVertical: 12, paddingTop: 40, flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
                        <Text style={styles.title}>Number Of People</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity style={styles.betweenButton} onPress={decrementNumberOfPeople}>
                                <Image source={require('../../assets/icons/minus.png')} style={{ width: 30, height: 30, backgroundColor: "white" }} />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: "Lato-Regular", fontSize: 18, flexDirection: "row", alignItems: "center" }}>{numberOfPeople}</Text>
                            <TouchableOpacity style={styles.betweenButton} onPress={incrementNumberOfPeople}>
                                <Image source={require('../../assets/icons/plus.png')} style={{ width: 30, height: 30, backgroundColor: "white" }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ paddingVertical: 12, paddingTop: 40, flexDirection: "column"  }}>
                        <View style={{flexDirection: "row",justifyContent: 'space-between', alignItems: "center"}}>
                            <Text style={styles.title}>With Crew</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "black" }}
                                thumbColor={withCrewEnabled ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleWithCrewSwitch}
                                value={withCrewEnabled}
                            />
                        </View>
                        


                    </View>




                </View>
            </ScrollView>
        </View>
    );
};

export default Filter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "white"
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


