import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Feather'; 
import { useState } from 'react';


const ButtonTransactionActivity1 = () => {
    const [isChecked, setIsChecked] = useState(false);

const IconButton = ({ onPress, iconName, buttonText }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.buttonContent}>
        <Icon name={iconName} size={20} color="black" />
        <Text style={styles.buttonText}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:13,
    marginLeft:-15
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    fontSize:20
   
  },
  buttonContent: {
   
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default ButtonTransactionActivity1;