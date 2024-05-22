import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const QuantitySelector = ({ value, onChangeText }) => {
    const [quantity, setQuantity] = useState(value || 1); // Initial quantity

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
        onChangeText(quantity + 1); // Update the parent component's value
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
            onChangeText(quantity - 1); // Update the parent component's value
        }
    };

    return (
        <LinearGradient
            colors={['#F5F5F5', 'grey']}
            start={[0, 0]}
            end={[1, 12]}
            style={styles.container}
        >
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>$</Text>
                <TextInput
                    style={styles.inputText}
                    value={quantity.toString()}
                    onChangeText={text => {
                        setQuantity(parseInt(text) || 0); // Update local state
                        onChangeText(parseInt(text) || 0); // Update the parent component's value
                    }}
                    keyboardType="numeric"
                />
                <Text style={{ fontSize: 16, alignSelf: "center", paddingHorizontal: 5 }}>per day</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.button} onPress={handleIncrement}>
                    <Image source={require("../assets/icons/plus.png")} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleDecrement}>
                    <Image source={require("../assets/icons/minus.png")} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingVertical: 25,
        borderRadius: 12,
        marginTop: 20,
        borderWidth: 0.5,
        borderRadius: 12
    },
    inputText: {
        fontSize: 30,
        fontWeight: "bold",
    },
    button: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default QuantitySelector;
