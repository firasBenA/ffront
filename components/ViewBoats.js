import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

import SearchScreen from '../screens/Search/SearchScreen'

const Card = () => {

  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('SearchScreen');
};

  let [fontsLoaded] = useFonts({
    'BarlowCondensed-Regular': require('../assets/Fonts/BarlowCondensed-Regular.ttf'),
    'BarlowCondensed-SemiBold': require('../assets/Fonts/BarlowCondensed-SemiBold.ttf'),
    'BarlowCondensed-Light': require('../assets/Fonts/BarlowCondensed-Light.ttf'),
    'Montserrat-Light': require('../assets/Fonts/Montserrat-Light.ttf'),
    'Montserrat-Regular': require('../assets/Fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('../assets/Fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../assets/Fonts/Montserrat-Bold.ttf'),
    'Lato-Bold': require('../assets/Fonts//Lato/Lato-Bold.ttf'),
    'Lato-Regular': require('../assets/Fonts//Lato/Lato-Regular.ttf'),
    'Lato-Black': require('../assets/Fonts//Lato/Lato-Black.ttf'),


  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/image/ocean.webp')}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Your Care, Our Value </Text>
            <Text style={styles.paragraph}>Find and book your dream boat through Yacht. Charter Fleet, the world's leading luxury boat comparison site.</Text>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>View Boat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 280,
    marginBottom: 80,
    marginTop: 35,

  },

  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0, // Added to cover the entire image
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
  },

  textContainer: {
    flex: 1,
    width:"100%",
  },

  text: {
    fontSize: 24,
    color: '#F5F5F5',
    marginBottom: 25,
    textAlign: 'center',
    marginTop:20,
    fontFamily:"Lato-Bold"
  },

  paragraph: {
    fontSize: 18,
    color: '#F5F5F5',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily:"Lato-Regular"

    
  },

  button: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width:"50%",
    alignSelf:"center"
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default Card;
