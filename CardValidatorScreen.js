import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { BASE_URL } from './config';

const CardValidatorScreen = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [resultMessage, setResultMessage] = useState('');

  const handleCheckCard = async () => {
    try {
      const response = await fetch(`${BASE_URL}Card/checkcard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardNumber: cardNumber,
          expiryMonth: expiryMonth,
          expiryYear: expiryYear,
          cvv: cvv,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResultMessage(data.message);
      } else {
        setResultMessage(data.message || 'Error validating card');
      }
    } catch (error) {
      setResultMessage('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card Validator</Text>
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Month"
        value={expiryMonth}
        onChangeText={setExpiryMonth}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Year"
        value={expiryYear}
        onChangeText={setExpiryYear}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
      />
      <Button title="Check Card" onPress={handleCheckCard} />
      <Text style={styles.result}>{resultMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CardValidatorScreen;
