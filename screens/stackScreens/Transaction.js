import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { useFonts } from 'expo-font';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';  // Import Ionicons

const TransactionActivity = () => {
    const [reservations, setReservations] = useState([]);
    const [boats, setBoats] = useState({});
    const [userId, setUserId] = useState(null);
    const [filterText, setFilterText] = useState('');

    let [fontsLoaded] = useFonts({
        'Lato-Bold': require('../../assets/Fonts/Lato/Lato-Bold.ttf'),
        'Lato-Regular': require('../../assets/Fonts/Lato/Lato-Regular.ttf'),
        'Lato-Black': require('../../assets/Fonts/Lato/Lato-Black.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    useEffect(() => {
        const fetchBoats = async (boatId) => {
            try {
                const response = await axios.get(`${BASE_URL}api/Boat/boat/${boatId}`);
                setBoats((prevBoats) => ({ ...prevBoats, [boatId]: response.data }));
            } catch (error) {
                console.error('Error fetching boats:', error);
            }
        };

        const fetchReservation = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                const user = JSON.parse(userData);
                setUserId(user.id);

                const response = await axios.get(`${BASE_URL}api/Reservation/user/${user.id}`);
                setReservations(response.data);
                response.data.forEach((reservation) => fetchBoats(reservation.idBoat));
            } catch (error) {
                console.log('Error fetching reservations:', error);
            }
        };

        fetchReservation();
    }, []);

    const cancelReservation = async (reservationId) => {
        try {
            const response = await axios.delete(`${BASE_URL}api/Reservation/${reservationId}`);
            console.log('Reservation cancelled:', response.data);
            // Update state or perform any necessary actions after cancellation
            setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== reservationId));
        } catch (error) {
            console.error('Error cancelling reservation:', error);
            // Handle error, such as displaying an error message to the user
        }
    };

    const getStatusStyle = (endDate) => {
        const isPast = new Date(endDate) < new Date();
        return {
            color: isPast ? 'red' : 'green',
            backgroundColor: isPast ? '#FAD2D2' : '#B0EBB4',
        };
    };

    const filteredReservations = reservations.filter((reservation) =>
        boats[reservation.idBoat]?.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <ScrollView style={styles.scrollView}>
            <Header />
            <Text style={styles.headerText}>Reservations</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Filter by boat name"
                    value={filterText}
                    onChangeText={setFilterText}
                />
                <Icon name="search" size={20} color="#000" style={styles.icon} />
            </View>
            <ScrollView horizontal style={styles.horizontalScrollView}>
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={[styles.headerContainer, { backgroundColor: '#EEEEEE' }]}>
                        <Text style={[styles.headerItem1, styles.boldText]}>DATE</Text>
                        <Text style={[styles.headerItem, styles.boldText]}>BOAT</Text>
                        <Text style={[styles.headerItem, styles.boldText]}>PRICE</Text>
                        <Text style={[styles.headerItem, styles.boldText]}>STATUS</Text>
                        <Text style={[styles.headerItem, styles.boldText]}>ANNULER</Text>
                    </View>
                    {filteredReservations.map((reservation) => {
                        const isExpired = new Date(reservation.endDate) < new Date();
                        return (
                            <View key={reservation.id} style={styles.container}>
                                <View style={styles.headerItem1}>
                                    <Text style={styles.dateText}>Begin: {new Date(reservation.startDate).toLocaleDateString()}</Text>
                                    <Text style={styles.dateText}>End: {new Date(reservation.endDate).toLocaleDateString()}</Text>
                                </View>
                                <Text style={styles.boatText}>{boats[reservation.idBoat]?.name}</Text>
                                <Text style={styles.priceText}>${reservation.prixTotale}</Text>
                                <View style={[styles.statusContainer, getStatusStyle(reservation.endDate)]}>
                                    <Text style={styles.statusText}>
                                        {isExpired ? 'Expired' : 'Received'}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={[styles.cancelButton, isExpired && styles.disabledButton]}
                                    onPress={() => !isExpired && cancelReservation(reservation.id)}
                                    disabled={isExpired}
                                >
                                    <Text style={styles.buttonText}>Annuler</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerText: {
        marginHorizontal: 20,
        marginVertical: 20,
        fontFamily: 'Lato-Bold',
        fontSize: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
    },
    horizontalScrollView: {
        flexDirection: 'row',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerItem: {
        width: 100,
    },
    headerItem1: {
        width: 150,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    columnContainer: {
        width: 100,
        alignItems: 'center',
    },
    dateText: {
        fontFamily: 'Lato-Regular',
        textAlign:"center"
    },
    boatText: {
        width: 100,
        textAlign: 'center',
        fontFamily: 'Lato-Regular',
    },
    priceText: {
        width: 100,
        textAlign: 'center',
        fontFamily: 'Lato-Regular',
    },
    statusContainer: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 35,
        padding: 5,
        marginHorizontal: 5,
    },
    statusText: {
        fontFamily: 'Lato-Bold',
    },
    cancelButton: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 35,
        padding: 5,
        marginHorizontal: 5,
        backgroundColor: "#FAD2D2",
    },
    disabledButton: {
        backgroundColor: '#E0E0E0',
    },
    buttonText: {
        fontFamily: 'Lato-Bold',
        color: 'black',
    },
    boldText: {
        fontFamily: 'Lato-Bold',
        textAlign:"center"
    },
});

export default TransactionActivity;
