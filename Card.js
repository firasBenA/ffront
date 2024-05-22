import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Favorite from './components/Favorite';

const Card = ({ title, image, description, price, onPress, userId }) => {
  return (
    <TouchableOpacity onPress={onPress}>

      <Text style={styles.title}>{userId}</Text>

      <View style={styles.containerCard}>
        <View style={styles.card}>
          <View style={styles.imageBox}>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            {/* You can add your favorite icon component here */}
            <View style={styles.overlay}>
              <Favorite style={styles.heartIcon} />
            </View>
          </View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.place}>aaaaa</Text>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.price}>$</Text>
                <Text style={styles.price}>{price}</Text>
                <Text style={styles.avg}>avg/Day</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    paddingBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  card: {
    height: 420,
    width: '100%',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 15,
  },
  imageBox: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
  },
  titleBox: {
    paddingTop: 12,
  },
  title: {
    fontSize: 16,
    color: 'black',
    paddingVertical: 10,
    fontFamily: 'Lato-Bold',
  },
  description: {
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
    paddingBottom: 4,
    fontFamily: 'Lato-Regular',
  },
  place: {
    fontSize: 16,
    color: 'grey',
    fontWeight: '300',
    paddingBottom: 13,
    fontFamily: 'Lato-Regular',
  },
  price: {
    fontSize: 18,
    color: 'black',
    paddingBottom: 10,
    fontFamily: 'Lato-Regular',
  },
  avg: {
    fontSize: 17,
    paddingLeft: 5,
    fontWeight: '300',
    color: 'grey',
  },
});

export default Card;
