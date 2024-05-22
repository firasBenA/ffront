import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BoatSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [matchedBoats, setMatchedBoats] = useState([]);
  const [allBoats, setAllBoats] = useState([]);

  const initialBoats = [
    "Bo7mid Bateau",
    "firas",
    "anis",
    "yassin Bateau",
    "nermine Bateau",
    "amine Bateau",
    "am ali Bateau"
  ];

  useEffect(() => {
    setAllBoats(initialBoats);
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredBoats = allBoats.filter(boat => boat.toLowerCase().includes(text.toLowerCase()));
    setMatchedBoats(filteredBoats);
  };

  const renderBoatItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un bateau"
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={searchText ? matchedBoats : allBoats}
        renderItem={renderBoatItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  input: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemText: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#333',
  },
  list: {
    flexGrow: 1,
  },
});

export default BoatSearch;
