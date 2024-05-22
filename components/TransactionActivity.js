import { View, Text, StyleSheet, Image, } from 'react-native'
import React from 'react'
import { CheckBox } from 'react-native-elements';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

const TransactionActivity = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };


    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckBox
                checked={isChecked}
                onPress={handleCheckboxChange}
                containerStyle={styles.checkboxContainer}
                checkedIcon={<Icon name="check-square" size={20} color={"black"} />}
                uncheckedIcon={<Icon name="square" size={20} color={"grey"} />}
            />

            <Text style={{ width: 90 }}>1045</Text>
            <Text style={{ width: 120 }}>Sun Mar 11 2024</Text>
            <Text style={{ width: 70 }}>Received</Text>

            <View style={styles.logoContainer}>
                <Image style={{ height: 50, width: 50, borderRadius: 50}} source={require('../assets/image/profilepic.png')} />

                <Text>name client</Text>
            </View>
            <Text style={{ width: 120 }}>Sun Mar 11 2024</Text>
            <Text style={{ width: 70 }}>$229.99</Text>

        </View>

    )
}
const styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingTop: 20,
        flexDirection: "row",
        width: 160
    },

})

export default TransactionActivity