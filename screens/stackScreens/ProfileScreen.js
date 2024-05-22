import { View, Text, StyleSheet, TouchableOpacity, Image ,Button,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext ,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import SignInScreen from '../loginScreens/SignInScreen';

import AuthService  from '../../AuthService';


function ProfileScreen({ route }) {
  const { logout } = useContext(AuthService);


  const [userData, setUserData] = useState(null);


  const navigation = useNavigation();
  
  const handleUserNamePress = () => {
    navigation.navigate('ProfileScreen'); 
  };
  const goToTransaction = () => {
    navigation.navigate('Transaction'); 
  };




  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      console.log('Logout successful');
      navigation.replace('SignInScreen'); // Replace instead of navigate
    } else {
      console.log('Logout failed');
    }
  };
  

  //const {userInfo, isAuthenticated, signIn } = useContext(AuthContext);

  /*if (!isAuthenticated) {
    return (
      <View>
          <SignInScreen/>
      </View>
    );
  }*/
        //userInfo.user.result.name

  return (
    <View style={styles.container}>
      <ScrollView >
        <View style={styles.profileContainer}>
          <View>
            <Icon name="user" size={80} color="black" style={styles.userBorder} />
          </View>
          <Text style={{ color: '#B4B4B8' }}>Changer Photo</Text>
          <Text style={styles.textProfile}>Firas</Text>
        </View>
        <Text style={{ paddingTop: 40, paddingLeft: 18, fontSize: 12, color: '#B4B4B8', fontWeight: 500 }}>Actions principale</Text>

        <View style={styles.acprBtns}>
          <TouchableOpacity style={styles.buttonContainer}>
            <View style={styles.buttonContent}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="heart" size={20} color="black" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Mes Favories</Text>
              </View>
              <Image source={require('../../assets/icons/right-arrow.png')} style={styles.buttonImage} />


            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContainer}>
            <View style={styles.buttonContent}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="bell" size={20} color="black" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Mes Notifications</Text>
              </View>
              <Image source={require('../../assets/icons/right-arrow.png')} style={styles.buttonImage} />


            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={goToTransaction}>
            <View style={styles.buttonContent}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="bell" size={20} color="black" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Mes Transaction</Text>
              </View>
              <Image source={require('../../assets/icons/right-arrow.png')} style={styles.buttonImage} />


            </View>
          </TouchableOpacity>

        </View>
        <Text style={{paddingBottom: 15, paddingTop: 15, paddingLeft: 18, fontSize: 12, color: '#B4B4B8', fontWeight: 500 }}>Autres actions </Text>



        <View style={styles.autreAcBtns}>



          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('ProfilSettingScreen')}>
            <View style={styles.buttonContent}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="settings" size={25} color="black" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Parametre</Text>
              </View>

              <Image source={require('../../assets/icons/right-arrow.png')} style={styles.buttonImage} />

            </View>
          </TouchableOpacity>

          
          <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
            <View style={styles.buttonContent}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="log-out" size={25} color="black" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Log-Out</Text>
              </View>
              <Image source={require('../../assets/icons/right-arrow.png')} style={styles.buttonImage} />

            </View>
          </TouchableOpacity>
        </View>




      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingTop: 60,
  },

  userBorder: {

    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 60,
    padding: 15,
    marginBottom: 5,
    paddingLeft: 18


  },

  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',

  },

  textProfile: {
    fontSize: 20,
    marginBottom: 20


  },

  buttonText: {
    fontSize: 16,
    fontWeight:"500"
  },
  buttonIcon: {
    marginRight: 25
  },

  acprBtns: {
    alignItems: "center",
    marginBottom: 30
  },

  autreAcBtns: {
    alignItems: "center",
    top:-10
  },

  buttonContainer: {

    marginTop: 12,
    padding: 10,
    borderWidth: 0.3,
    borderColor: 'grey',
    borderRadius: 10,
    width: "90%",
    height: 70,

  },

  userBorderBtn: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 60,
    padding: 10,
    margin: 5,
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 15,
    justifyContent: "space-between"
  },
  buttonImage: {
    width: 13,
    height: 13,
    marginRight: 12
  },


});






export default ProfileScreen

