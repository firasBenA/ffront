import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import TopPlacesCarousel from './TopPlacesCarousel';
import { TOP_PLACES } from '../Data/index'
import { useFonts } from 'expo-font';



const DestinationContainer = () => {
    let [fontsLoaded] = useFonts({
        'BarlowCondensed-Regular': require('../assets/Fonts/BarlowCondensed-Regular.ttf'),
        'BarlowCondensed-SemiBold': require('../assets/Fonts/BarlowCondensed-SemiBold.ttf'),
        'Lato-Bold': require('../assets/Fonts//Lato/Lato-Bold.ttf'),
        'Lato-Regular': require('../assets/Fonts//Lato/Lato-Regular.ttf'),
        'Lato-Black': require('../assets/Fonts//Lato/Lato-Black.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }


    return (
        <View>
            <View style={styles.destinationContainer}>
                <Text style={styles.bigText}>Top Destination For Boat Rentals</Text>
                <Text style={styles.smallText}>Unsatiable It Considered Invitation He Traveling.</Text>
                <TopPlacesCarousel list={TOP_PLACES} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    destinationContainer: {
        marginTop: 70,
    },
    bigText: {
        fontSize: 22,
        marginLeft: 10,
        marginBottom: 5,
        fontFamily: 'Lato-Bold',


    },

    smallText: {
        fontSize: 14,
        paddingBottom: 5,
        marginLeft: 10,
        marginBottom: 10,
        opacity: .8,
        fontFamily: 'Lato-Regular'

    },
});



export default DestinationContainer