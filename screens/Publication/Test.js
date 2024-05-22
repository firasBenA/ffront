import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import PaymentCard from './PaymentCard'; // Assuming Card component is in a separate file
import { useFonts } from 'expo-font';

const CardForm = () => {
  const [cardDetails, setCardDetails] = useState({
    cardHolder: '',
    cardNumber: '',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
    isCardFlipped: false,
  });

  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  let [fontsLoaded] = useFonts({
    'Lato-Bold': require('../../assets/Fonts/Lato/Lato-Bold.ttf'),
    'Lato-Regular': require('../../assets/Fonts/Lato/Lato-Regular.ttf'),
    'Lato-Black': require('../../assets/Fonts/Lato/Lato-Black.ttf'),
});



if (!fontsLoaded) {
    return null;
}




  const handleChange = (name, value) => {
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission, e.g., send data to server, etc.
    console.log('Submitted card details:', cardDetails);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  return (
    <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
      <PaymentCard {...cardDetails} />

      <View style={{ marginTop: 20 }}>
        <Text style={styles.Label}>Card Number</Text>
        <TextInput
          value={cardDetails.cardNumber}
          style={styles.input}
          onChangeText={(text) => handleChange('cardNumber', text)}
          keyboardType="numeric"

        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.Label}>Card Holder Name</Text>
        <TextInput
          value={cardDetails.cardHolder}
          style={styles.input}
          onChangeText={(text) => handleChange('cardHolder', text)}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems: "center" }}>
        <View style={{ flexDirection: "column", width: "34%" }}>
          <Text style={styles.Label}>Expiration Date</Text>
          <TextInput
            style={styles.miniInput}
            placeholder='Month'
            onChangeText={(text) => handleChange('cardYear', text)}
            keyboardType="numeric"

          />
        </View>
        <View style={{ flexDirection: "column", width: "34%" }}>
          <Text style={styles.Label}>.</Text>
          <TextInput
            style={styles.miniInput}
            placeholder='Year'
            onChangeText={(text) => handleChange('cardMonth', text)}
            keyboardType="numeric"

          />
        </View>
        <View style={{ flexDirection: "column", width: "30%" }}>
          <Text style={styles.Label}>Security Code</Text>
          <TextInput
            style={styles.miniInput}
            onChangeText={(text) => handleChange('cardCvv', text)}
            keyboardType="numeric"

          />
        </View>
      </View>

      <TouchableOpacity style={[styles.PasswordModalReserverBtn, { backgroundColor: "black" }]} onPress={handleSubmit}>
        <Text style={{ fontFamily: "Lato-Bold", fontSize: 18, color: "white", alignSelf: "center", }}>save</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    width: '97%',
    height: 50,
    padding: 10,
    fontFamily: "Lato-Regular",
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
  PasswordModalReserverBtn: {
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderRadius: 12,
    height: 70,
    width: "100%",
    justifyContent: "center"

},
});

export default CardForm;
