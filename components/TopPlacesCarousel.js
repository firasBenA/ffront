import React from 'react';
import {Dimensions} from 'react-native';
import { useFonts } from 'expo-font';

import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const CARD_WIDTH = width - 70;
const CARD_HEIGHT = 400;
const CARD_WIDTH_SPACING = CARD_WIDTH + 24;

const TopPlacesCarousel = ({list}) => {

///////

let [fontsLoaded] = useFonts({
  'BarlowCondensed-Regular': require('../assets/Fonts/BarlowCondensed-Regular.ttf'),
});

if (!fontsLoaded) {
  return null; 
}

///////


  return (
    <FlatList
      data={list}
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.id}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={{
              marginLeft: 10,
              marginRight: index === list.length - 1 ? 24 : 0,
            }}>
            <View style={[styles.card, shadow.dark]}>
              <View style={styles.imageBox}>
                <Image source={item.image} style={styles.image} />
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};


export const colors = {
    primary: '#070f18',
    gray: '#8b8989',
    lightGray: '#b2b2b2',
    light: '#fbfbfb',
    white: '#fff',
    black: '#000',
  };
  
  export const shadow = {
    light: {
      shadowColor: colors.black,
      shadowRadius: 4,
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    dark: {
      shadowColor: colors.black,
      shadowRadius: 4,
      shadowOpacity: 0.3,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
  };
  
  export const sizes = {
    width,
    height,
    title: 32,
    h2: 24,
    h3: 18,
    body: 14,
    radius: 16,
  };
  
  export const spacing = {
    s: 8,
    m: 18,
    l: 24,
    xl: 40,
  };

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
  },
  favorite: {
    position: 'absolute',
    top: spacing.m,
    right: spacing.m,
    zIndex: 1,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 80,
    left: 20,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
  },
});

export default TopPlacesCarousel;