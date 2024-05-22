import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  const toggleSearch = () => {
    setIsSearchOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (isSearchOpen) {
      // Focus on the input when it becomes visible
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <View style={styles.header}>
      {!isSearchOpen && (
        <View style={styles.logoContainer}>
          <Image style={{ height: 60, width: 60 }} source={require('../assets/Logo.png')} />
        </View>
      )}
      <View style={styles.searchContainer}>
        {isSearchOpen && (
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={(text) => console.log(text)}
          />
        )}
        <TouchableOpacity style={styles.searchIconContainer} onPress={toggleSearch}>
          <Image source={require('.././assets/icons/search.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'white',
    height: 60,
    elevation: 5,
  },
  logoContainer: {
    alignItems: 'flex-start',
    paddingLeft:10
  },
  searchContainer: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  searchIconContainer: {
    marginRight: 10,
  },
});

export default Header;
