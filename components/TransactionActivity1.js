import { View, Text, StyleSheet  } from 'react-native'
import React from 'react'
import { CheckBox } from 'react-native-elements';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';


const TransactionActivity1 = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckBox Icon={<Icon name="check-square" size={20} color={"black"} />}
                
            />        
            <Text style={{ width: 90 }}>SL.</Text>
            <Text style={{ width: 120 }}>DATE</Text>
            <Text style={{ width: 105 }}>STATUS</Text>
            

            <Text style={{ width: 160 }}>CUSTOMER</Text>
            
            <Text style={{ width: 120 }}>PURCHASED</Text>
            <Text style={{ width: 70 }}>REVENUE</Text>
        </View>

    )
}
const styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingTop: 20,
        flexDirection: "row"
    },
  
})

export default TransactionActivity1