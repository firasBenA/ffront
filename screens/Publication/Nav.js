import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthService } from './AuthService'; // Make sure AuthService is imported correctly
import HomeScreen from './screens/Home/HomeScreen';
import LoginScreen from './LoginScreen';
import Test from './screens/Publication/Test'
/////
import { Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import SignInScreen from './screens/loginScreens/SignInScreen';
import SignUpScreen from './screens/loginScreens/SignUpScreen';
import MessagesScreen from './screens/tabScreens/MessagesScreen';
import AddScreen from './screens/Add/AddScreen';
import NotificationScreen from './screens/tabScreens/NotificationScreen';
import ProfileScreen from './screens/stackScreens/ProfileScreen';
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
import ProfileUser from './screens/Profile/ProfileUser'
import EditBoat from './screens/Profile/EditBoat'

import { color } from 'react-native-elements/dist/helpers';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';


const Stack = createStackNavigator();

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
            <Tab.Screen name="Add" component={AddWelcome}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <View style={{ marginTop: -28, backgroundColor: 'transparent', borderRadius: 50 }}>
                            <Image
                                source={require("./assets/Logo.png")}
                                style={{ width: 80, height: 80 }}
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
                    tabBarLabel: 'Profile',
                    tabBarIcon: () => (
                        <Icon name="user" color={'black'} size={25} />
                    ),
                }} />
        </Tab.Navigator>
    );
}

const Nav = () => {
    const { isAuthenticated } = useContext(AuthService);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isAuthenticated ? 'TabGroup' : 'SignInScreen'}>
                <Stack.Screen name="HomeScreen" component={TabGroup} options={{ headerShown: false }} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false, tabBarVisible: false }} />
                <Stack.Screen name="ProfilSettingScreen" component={ProfilSettingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Publication" component={Publication} options={{ headerShown: false }} />
                <Stack.Screen name="Photos" component={Photos} options={{ headerShown: false }} />
                <Stack.Screen name="ProfilScreen" component={ProfilScreen} options={{ headerShown: false, tabBarVisible: false }} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false, tabBarVisible: false }} />
                <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false, tabBarVisible: false }} />
                <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false, tabBarVisible: false }} />
                <Stack.Screen name="Transaction" component={Transaction} options={{ headerShown: false, tabBarVisible: false }} />
                <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ProfileUser" component={ProfileUser} options={{ headerShown: false }} />
                <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
                <Stack.Screen name="EditBoat" component={EditBoat} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Nav;
