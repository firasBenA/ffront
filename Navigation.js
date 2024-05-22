import React from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import HomeScreen from './screens/Home/HomeScreen';
import SignInScreen from './screens/loginScreens/SignInScreen';
import SignUpScreen from './screens/loginScreens/SignUpScreen';
import MessagesScreen from './screens/tabScreens/MessagesScreen';
import AddScreen from './screens/Add/AddScreen';
import NotificationScreen from './screens/tabScreens/NotificationScreen';
import ProfilSettingScreen from './screens/Profile/ProfilSettingScreen';
import SearchScreen from './screens/Search/SearchScreen';
import Publication from './screens/Publication/Publication';
import Photos from './screens/Publication/Photos';
import AddWelcome from './screens/Add/AddWelcome';
import ProfilScreen from './screens/Profile/ProfilScreen';
import ChatScreen from './screens/Messages/ChatScreen';
import Messages from './screens/Messages/Messages';
import dummyMessages from './Data';
import Filter from './screens/Search/Filter';
import Transaction from './screens/stackScreens/Transaction';

const Tab = createBottomTabNavigator();
const TabGroup = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 100 }
      }}
    >

      <Tab.Screen name="Home" component={HomeScreen}
        options={{

          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Image
              source={require("./assets/icons/home.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
        }} />
      <Tab.Screen name="Search" component={SearchScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarIcon: () => (
            <Icon name="search" color={'black'} size={25} />
          ),
        }} />
      <Tab.Screen name="Add" component={AddStackGroup}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <View style={{ marginTop: -24, backgroundColor: 'white', borderRadius: 50, padding: 10, elevation: 5, }}>
              <Image
                source={require("./assets/icons/add.png")}
                style={{ width: 30, height: 30 }}
              />
            </View>
          ),
        }} />
      <Tab.Screen
        name="Messages"
        options={{
          headerShown: false,
          tabBarLabel: 'Messages',
          tabBarIcon: () => (
            <Icon name="send" color={'black'} size={25} />
          )
        }}
      >
        {() => <Messages list={dummyMessages} />}
      </Tab.Screen>
      <Tab.Screen name="Profile" component={ProfilScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Notification',
          tabBarIcon: () => (
            <Icon name="bell" color={'black'} size={25} />
          ),
        }} />
    </Tab.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeStackGroup() {
  return (

    <HomeStack.Navigator>
      {isLoggedIn ? ( 
        <>
          <HomeStack.Screen name="HomeScreen" component={TabGroup} options={{ headerShown: false }} />
          <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false, tabBarVisible: false }} />
          <HomeStack.Screen name="ProfilSettingScreen" component={ProfilSettingScreen} options={{ headerShown: false }} />
          <HomeStack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false, tabBarVisible: false }} />
          <HomeStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false, tabBarVisible: false }} />
          <HomeStack.Screen name="Publication" component={Publication} options={{ headerShown: false }} />
          <HomeStack.Screen name="Photos" component={Photos} options={{ headerShown: false }} />
          <HomeStack.Screen name="ProfilScreen" component={ProfilScreen} options={{ headerShown: false, tabBarVisible: false }} />
          <HomeStack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false, tabBarVisible: false }} />
          <HomeStack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false, tabBarVisible: false }} />
          <HomeStack.Screen name="Filter" component={Filter} options={{ headerShown: false, tabBarVisible: false }} />
          <HomeStack.Screen name="Transaction" component={Transaction} options={{ headerShown: false, tabBarVisible: false }} />
          <HomeStack.Screen name="ProfileUser" component={ProfileUser} options={{ headerShown: false, tabBarVisible: false }} />
        </>
      ) : (
        <>
          <HomeStack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }} />
          <HomeStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
        </>
      )}

    </HomeStack.Navigator>
  );
}

const AddStack = createStackNavigator();

function AddStackGroup() {
  return (
    <AddStack.Navigator>
      <AddStack.Screen name="AddWelcome" component={AddWelcome} options={{ headerShown: false, tabBarVisible: false }} />
      <AddStack.Screen name="Transaction" component={Transaction} options={{ headerShown: false, tabBarVisible: false }} />

    </AddStack.Navigator>
  );
}

const Navigation = () => {
  return (
    <HomeStackGroup />
  );
}

export default Navigation;
