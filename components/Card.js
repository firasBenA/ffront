import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import StarRating from './StarRating'; // Assuming StarRating component is correctly implemented
import { useFonts } from 'expo-font';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Favorite from './Favorite';
import Icon from 'react-native-vector-icons/Feather';
import { BASE_URL } from '../config';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 10;

const Card = ({ title, imageUrl, description, city, capacity, nbrCabins, nbrBedrooms, boatId, country, price, showIcon }) => {

  const [averageRating, setAverageRating] = useState(0);
  const [isCardFavorited, setIsCardFavorited] = useState(false);
  const [feedbackCount, setFeedbackCount] = useState(0); // State for feedback count

  const navigation = useNavigation();

  const goToSetting = () => {
    navigation.navigate('EditBoat', { boatId });
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/Feedback/ByBoatId/${boatId}`);
        console.log('Feedback API Response:', response.data); // Debugging: Log API response

        const feedbacks = response.data;
        const feedbackCount = feedbacks.length;
        console.log('Feedback Count:', feedbackCount); // Debugging: Log feedback count
        setFeedbackCount(feedbackCount);
      } catch (error) {
      }
    };


    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/Feedback/AverageRatingByBoatId/${boatId}`);
        setAverageRating(response.data);
        console.log('Average Rating:', response.data); // Log average rating
      } catch (error) {
      }
    };

    fetchFeedbacks();
    fetchAverageRating();
  }, [boatId]);

  let [fontsLoaded] = useFonts({
    'Lato-Bold': require('../assets/Fonts/Lato/Lato-Bold.ttf'),
    'Lato-Regular': require('../assets/Fonts/Lato/Lato-Regular.ttf'),
    'Lato-Black': require('../assets/Fonts/Lato/Lato-Black.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.containerCard}>
      <View style={styles.card}>
        <View style={styles.imageBox}>
          {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
          <View style={styles.overlay}>
            <TouchableOpacity onPress={goToSetting} style={[styles.touchable, { zIndex: 999999 }]}>
              {showIcon && (
                <Icon name="settings" size={30} style={styles.Editicon} />
              )}
            </TouchableOpacity>
            <Favorite style={styles.heartIcon} />
          </View>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={1}>{description}</Text>
          <Text style={styles.place}>{city}, {country}</Text>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.avg}>A partire de </Text>
              <Text style={styles.price}>{price}$</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <StarRating averageRating={averageRating} />
              <Text style={{ marginRight: 10, paddingLeft: 5, fontSize: 16, fontWeight: "400" }}>({feedbackCount})</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    paddingBottom: 20,
    alignItems: 'center',
    width: "100%"
  },
  card: {
    height: 420,
    width: CARD_WIDTH,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15
  },
  imageBox: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    position: 'relative',
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'flex-end',
    padding: 15
  },
  heartIcon: {
    color: 'red',
    zIndex: 999,
  },
  Editicon: {
    color: 'white',
    margin: 5
  },
  touchable: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 999,
    margin: 5
  },
  titleBox: {
    left: 8,
    paddingTop: 12
  },
  title: {
    fontSize: 16,
    color: "black",
    paddingVertical: 10,
    fontFamily: "Lato-Bold"
  },
  description: {
    fontSize: 18,
    color: "black",
    fontWeight: "400",
    paddingBottom: 4,
    fontFamily: 'Lato-Regular'
  },
  place: {
    fontSize: 16,
    color: "grey",
    fontWeight: "300",
    paddingBottom: 13,
    fontFamily: 'Lato-Regular'
  },
  price: {
    fontSize: 18,
    color: "black",
    fontFamily: 'Lato-Regular'
  },
  avg: {
    fontSize: 17,
    paddingLeft: 5,
    fontWeight: "300",
    color: "grey",
  },
});

export default Card;
