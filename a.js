import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const Filter = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [withCrewEnabled, setWithCrewEnabled] = useState(false);
  const [freeCancellationEnabled, setFreeCancellationEnabled] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(50); // State variable for the number of people

  let [fontsLoaded] = useFonts({
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
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
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Filter</Text>
          <Text style={styles.closeBtn}>Close</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.headerTitle}>Price Per Day</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#000000" // Change the color of the track to black
            maximumTrackTintColor="#000000"
            thumbTintColor="#000000" // Change the color of the thumb to black
            onValueChange={handleRangeChange}
          />
          <View style={styles.maxmin}>
            {/ Min input /}
            <View style={styles.inputContainer}>
              <Text style={styles.text}>Min</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={minValue.toString()}
                editable={false}
              />
            </View>
            {/ Max input /}
            <View style={styles.inputContainer}>
              <Text style={styles.text}>Max</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={maxValue.toString()}
                editable={false}
              />
            </View>
          </View>

          {/ Number Of People /}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Number Of People</Text>
            <View style={styles.betweenContainer}>
              <TouchableOpacity style={styles.betweenButton} onPress={decrementNumberOfPeople}>
                <Feather name="minus" size={20} color="black" />
              </TouchableOpacity>
              {/ Value between Min and Max /}
              <Text style={styles.betweenValue}>{numberOfPeople}</Text>
              <TouchableOpacity style={styles.betweenButton} onPress={incrementNumberOfPeople}>
                <Feather name="plus" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/ With Crew Switch /}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>With Crew</Text>
          <View style={styles.containerSwitch}>
            <Switch
              trackColor={{ false: "#767577", true: "black" }}
              thumbColor={withCrewEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleWithCrewSwitch}
              value={withCrewEnabled}
            />
          </View>
        </View>
        {/ Free Cancellation Switch /}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Free Cancellation</Text>
          <View style={styles.containerSwitch}>
            <Switch
              trackColor={{ false: "#767577", true: "black" }}
              thumbColor={freeCancellationEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleFreeCancellationSwitch}
              value={freeCancellationEnabled}
            />
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
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 26,
    color: 'black',
    fontFamily: 'Lato-Bold',
  },
  closeBtn: {
    fontSize: 16,
    color: 'grey',
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceContainer: {
    marginTop: 20,
  },
  maxmin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    backgroundColor: '#ECECEC',
    paddingVertical: 8,
    flex: 1,
    marginRight: 10,
  },
  text: {
    color: 'black',
    paddingTop: 4,
    paddingHorizontal: 12,
  },
  input: {
    backgroundColor: '#ECECEC',
    padding: 12,
    paddingBottom: 4,
    paddingTop: 0,
    fontSize: 14,
    borderWidth: 0,
    outlineWidth: 0,
  },
  betweenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  betweenButton: {
    backgroundColor: '#ECECEC',
    borderRadius: 8,
    padding: 8,
    marginRight: 5,
    marginLeft: 5,
  },
  betweenValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerSwitch: {
    alignItems: "center",
    justifyContent: 'space-between',
  }
});
