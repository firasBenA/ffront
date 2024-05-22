import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons from Expo

const Favorite = () => {
    const [heartColor, setHeartColor] = useState('#F5F5F5'); 

    const toggleHeartColor = () => {
        const newColor = heartColor === '#F5F5F5' ? 'red' : '#F5F5F5'; 
        setHeartColor(newColor);
    };

    return (
            <View style={styles.container}>
                <TouchableOpacity onPress={toggleHeartColor}>
                    <FontAwesome name="heart" size={28} color={heartColor} />
                </TouchableOpacity>
            </View>
    );
}

const styles = StyleSheet.create({
   
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Favorite;