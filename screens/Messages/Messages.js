// Message.js
import React ,{useState,useEffect}from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
const Message = ({ list }) => {
    const [IdRole, setIdRole] = useState();

    const navigation = useNavigation();


    const handleRestrictedAction = () => {
        Alert.alert(
            "Access Denied",
            "You need to sign in to perform this action.",
            [
                {
                    text: "OK",
                    onPress: () => navigation.navigate('SignInScreen'),
                },
            ],
            { cancelable: false }
        );
    };

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('user');
                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                   
                    setIdRole(userData.idRole);


                } else {
                    console.log('User data not found.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getUserData();
        console.log(userId);
    }, []);

    const renderMessageItem = ({ item }) => {

        const handlePress = () => {
            // navigation.navigate('ChatScreen', { username: item.username, avatar: item.avatar });
            navigation.navigate('ChatScreen');
        };

        return (

            <TouchableOpacity onPress={handlePress}>
                <View style={styles.container}>
                    <Image source={item.avatar} style={styles.avatar} />
                    <View style={styles.messageContent}>
                        <Text style={styles.username}>Firas Ben Achour</Text>
                        <Text style={styles.messagePreview}>a</Text>
                    </View>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
            </TouchableOpacity>

        );
    };



    return (
        IdRole === null ? (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        ) : IdRole === 2? (

            <ScrollView stickyHeaderIndices={[0]}>

                <Header />
                <FlatList
                    data={list}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderMessageItem}
                    contentContainerStyle={styles.flatListContainer}
                />
            </ScrollView>
        ) : (
            handleRestrictedAction()
        )
    );


}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderColor: "#e0e0e0",
        backgroundColor: '#ffffff',
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 25,
        marginRight: 10,
    },
    messageContent: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    messagePreview: {
        fontSize: 14,
        color: '#666666',
    },
    timestamp: {
        fontSize: 12,
        color: '#999999',
    },
    flatListContainer: {
        flexGrow: 1,
    },
});

export default Message;
