import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';

const StarRating = ({ averageRating }) => {
  const [filledStars, setFilledStars] = useState(0);

  useEffect(() => {
    // Calculate the filled stars based on the average rating
    const filledStarsCount = Math.round(averageRating);
    setFilledStars(filledStarsCount);
    console.log('Average Rating:', averageRating); // Log average rating
  }, [averageRating]);

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((starPosition) => (
        <TouchableOpacity
          key={starPosition}
          activeOpacity={0.7}
        >
          <Image
            source={starPosition <= filledStars ? require('../assets/icons/starFilled.png') : require('../assets/icons/star.png')}
            style={styles.starIcon}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 18,
    height: 18,
    marginHorizontal: 3,
  },
  averageRatingText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default StarRating;
