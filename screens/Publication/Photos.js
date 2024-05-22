import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';


const windowWidth = Dimensions.get('window').width;




const Photos = () => {

    let [fontsLoaded] = useFonts({
        'Montserrat-Light': require('../../assets/Fonts/Montserrat-Light.ttf'),
        'Montserrat-Regular': require('../../assets/Fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold': require('../../assets/Fonts/Montserrat-SemiBold.ttf'),
        'Lato-Regular': require('../../assets/Fonts/Lato-Regular.ttf'),

    });
    
    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView stickyHeaderIndices={[0]} style={{}}>
            <Header/>
            <Text style={{ fontSize: 26, marginVertical: 20, marginHorizontal: 14, fontFamily: "Lato-Regular" }}>
                Photo Gallery
            </Text>
            <View style={{ flexDirection: "row", marginHorizontal: 8 }}>
                <View style={{ flexDirection: "column", width: "50%" }}>
                    <Image source={require("../.././assets/image/boat1.webp")} style={{ width: windowWidth / 2 - 20, height: 135, margin: 5, borderRadius: 8, }} />
                    <Image source={require("../.././assets/image/boat2.webp")} style={{ width: windowWidth / 2 - 20, height: 135, margin: 5, borderRadius: 8, }} />
                    <Image source={require("../.././assets/image/boat3.webp")} style={{ width: windowWidth / 2 - 20, height: 135, margin: 5, borderRadius: 8, }} />
                    <Image source={require("../.././assets/image/boat4.webp")} style={{ width: windowWidth / 2 - 20, height: 135, margin: 5, borderRadius: 8, }} />
                    <Image source={require("../.././assets/image/boat1.webp")} style={{ width: windowWidth / 2 - 20, height: 135, margin: 5, borderRadius: 8, }} />

                </View>
                <View style={{ flexDirection: "column", width: "50%" }}>
                    <Image source={require("../.././assets/image/boat1.webp")} style={{ width: windowWidth / 2 - 20, height: 135, margin: 5, borderRadius: 8, }} />
                    <Image source={require("../.././assets/image/boat2.webp")} style={{ width: windowWidth / 2 - 20, height: 135, margin: 5, borderRadius: 8, }} />
                    <Image source={require("../.././assets/image/boat3.webp")} style={{ width: windowWidth / 2 - 20, height: 135, margin: 5, borderRadius: 8, }} />
                    <Image source={require("../.././assets/image/boat4.webp")} style={{ width: windowWidth / 2 - 20, height: 135, margin: 5, borderRadius: 8, }} />

                </View>

            </View>


        </ScrollView>
    )


}

const Header = () => {
    return (
        <View style={{ flexDirection: "row", height: 80, width: "105%", elevation: 4, justifyContent: "space-between", paddingTop: 15, paddingLeft: 8 ,backgroundColor:'white'}}>
            <TouchableOpacity >
                <Image source={require("../.././assets/icons/right-arrow.png")} style={{ width: 20, height: 20, marginVertical: 20, marginLeft: 10 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 50 }}>
                <TouchableOpacity >
                    <Image source={require("../.././assets/icons/share.png")} style={{ width: 20, height: 20, margin: 20 }} />
                </TouchableOpacity>

                <Text>Share</Text>
            </View>
        </View>
    )

}

export default Photos