
import { View, Text, Alert, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity, TextInput, Modal, Image, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useFonts } from 'expo-font';
import Header from '../../components/Header';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import CommentScreen from './CommentScreen';
import DateTimePicker from '@react-native-community/datetimepicker';
import PaymentCard from './PaymentCard';







const Publication = () => {
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state
  const [averageRating, setAverageRating] = useState(null);
  const [feedbackCount, setFeedbackCount] = useState(0); // State for feedback count
  const [paymentModalVisible, setpaymentModalVisible] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [boats, setBoats] = useState(null);
  const [equipment, setEquipment] = useState(null);

  const [userAvatar, setUserAvatar] = useState('');
  const [userIdRole, setUserIdRole] = useState(null);
  const [langue, setLangue] = useState('');
  const [dateInscription, setDateInscription] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');
  const navigation = useNavigation();
  const { boatId, userId } = useRoute().params;

  const [price, setPrice] = useState('');

  const [markedDates, setMarkedDates] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const [showCalendarBegin, setShowCalendarBegin] = useState(false);
  const [showCalendarEnd, setShowCalendarEnd] = useState(false);
  const [selectedDateBegin, setSelectedDateBegin] = useState('');
  const [selectedDateEnd, setSelectedDateEnd] = useState('');
  const [dateMargin, setDateMargin] = useState(null); // State to store the margin
  const [cleaningFee, setcleaningFee] = useState(59); // State to store the margin
  const [serviceFee, setServiceFee] = useState(65); // State to store the margin
  const [totalFee, setTotalFee] = useState(65); // State to store the margin
  const pricePerNight = parseFloat(price);
  const totalPrice = pricePerNight * dateMargin;
  const newTotalFee = totalPrice + cleaningFee + serviceFee;

  const [cardDetails, setCardDetails] = useState({
    cardHolder: '',
    cardNumber: '',
    cardMonth: 0,
    cardYear: 0,
    cardCvv: '',
    isCardFlipped: false,
  });

  let [fontsLoaded] = useFonts({
    'Lato-Bold': require('../../assets/Fonts/Lato/Lato-Bold.ttf'),
    'Lato-Regular': require('../../assets/Fonts/Lato/Lato-Regular.ttf'),
    'Lato-Black': require('../../assets/Fonts/Lato/Lato-Black.ttf'),
  });

  const onRefresh = () => {
    setRefreshing(true);
    // Add your refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

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
    );
  };

  const handleCheckCard = async () => {

    const expiryMonth = parseInt(cardDetails.cardMonth);
    const expiryYear = parseInt(cardDetails.cardYear);

    try {
      const response = await axios.post(`${BASE_URL}Card/checkcard`, {
        cardNumber: cardDetails.cardNumber,
        expiryMonth: expiryMonth,
        expiryYear: expiryYear,
        cvv: cardDetails.cardCvv
      });

      console.log("Response:", response.data);

      if (response.data.message === 'Card is valid') {
        Alert.alert('Success', 'Card is valid');
        reserve();
      } else {
        Alert.alert('Error', 'Card is not valid');
      }
    } catch (error) {
      console.error('Error checking card:', error);
      Alert.alert('Error', 'An error occurred while checking the card');
    }
  };


  const handleChange = (name, value) => {
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission, e.g., send data to server, etc.
    console.log('Submitted card details:', cardDetails);
  };

  const fetchReservationsByBoatId = (boatId) => {
    axios.get(`${BASE_URL}api/Reservation/boat/${boatId}`)
      .then(response => {
        let dates = {};
        response.data.forEach(reservation => {
          let start = new Date(reservation.startDate);
          let end = new Date(reservation.endDate);
          while (start <= end) {
            const dateString = start.toISOString().split('T')[0];
            dates[dateString] = { marked: true, dotColor: 'red', color: 'red', textColor: 'white' };
            start.setDate(start.getDate() + 1);
          }
        });
        setMarkedDates(dates);
      }).catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchReservationsByBoatId(boatId);
  }, [boatId]);

  const handleReserve = (startDate, endDate) => {
    let newDates = { ...markedDates };
    let start = new Date(startDate);
    let end = new Date(endDate);
    while (start <= end) {
      const dateString = start.toISOString().split('T')[0];
      newDates[dateString] = { marked: true, dotColor: 'red', color: 'red', textColor: 'white' };
      start.setDate(start.getDate() + 1);
    }
    setMarkedDates(newDates);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };


  const onChangeStart = (event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate || startDate;
    setShowStart(false);
    setStartDate(currentDate);
    calculateDateMargin(currentDate, endDate); // Pass current date and end date
  };

  const onChangeEnd = (event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate || endDate;
    setShowEnd(false);
    setEndDate(currentDate);
    calculateDateMargin(startDate, currentDate); // Pass start date and current date
  };

  const isDateOverlap = (startDate, endDate, reservations) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return reservations.some(reservation => {
      const resStart = new Date(reservation.startDate);
      const resEnd = new Date(reservation.endDate);

      return (start <= resEnd && end >= resStart);
    });
  };

  const reserve = async () => {
    const userData = await AsyncStorage.getItem('user');
    const user = JSON.parse(userData);
    const reservantName = user.name;
    const reservantId = user.id;
    console.log('User ID:', reservantId, 'Reservant Name:', reservantName);

    axios.get(`${BASE_URL}api/Reservation/boat/${boatId}`)
      .then(response => {
        if (isDateOverlap(startDate, endDate, response.data)) {
          Alert.alert('Reservation Failed', 'Selected dates are already reserved for this boat.');
          return;
        }

        axios.post(`${BASE_URL}api/Reservation`, {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          réservantName: reservantName,
          prixTotale: newTotalFee,
          idUser: reservantId,
          idBoat: boatId,
        }).then(response => {
          Alert.alert('Reservation Successful');
        }).catch(error => {
          Alert.alert('Reservation Failed', error.response ? error.response.data : 'An error occurred');
          console.log('Reservation Failed', error.response ? error.response.data : error.message);
        });
      }).catch(error => {
        Alert.alert('Reservation Failed', 'Could not verify availability');
        console.log('Error fetching reservations', error.message);
      });
  };

  const Reservation = async () => {
    const userData = await AsyncStorage.getItem('user');
    const user = JSON.parse(userData);
    const reservantName = user.name;
    const reservantId = user.id;
    console.log('User ID:', reservantId, 'Reservant Name:', reservantName);

    try {
      const response = await axios.post(`${BASE_URL}api/Reservation`, {
        réservantName: reservantName,
        dateDebut: selectedDateBegin,
        dateFin: selectedDateEnd,
        prixTotale: newTotalFee,
        idUser: reservantId,
        idBoat: boatId,
      });
      console.log('Reservation data:', response.data);
    } catch (error) {
      console.error('Error Reservation:', error);
      console.log('Error Response Data:', error.response?.data);
    }
  };



  const openPhotos = () => {
    navigation.navigate('Photos');
  };

  const openProfile = (userId) => {
    console.log(userId)
    navigation.navigate('ProfileUser', { userId });
  };

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/Boat/boat/${boatId}`);
        setBoats(response.data);
        setPrice(response.data.price);
        setLoading(false)
        console.log('Boat data:', response.data);
      } catch (error) {
        console.error('Error fetching boats:', error);
      }
    };

    const fetchBoatsEquipments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/Equipment/equipment/boat/${boatId}`);
        setEquipment(response.data);
        setLoading(false)
        console.log('Boat equipments:', response.data);
      } catch (error) {
        console.error('Error fetching boats:', error);
      }
    };

    const fetchUser = async () => {
      console.log(userId)
      try {
        const response = await axios.get(`${BASE_URL}api/User/${userId}`);

        setUserAvatar(response.data.avatar);
        setUserIdRole(response.data.idRole);
        setUserName(response.data.name);
        setDateInscription(response.data.dateInscription);
        setLangue(response.data.langue);

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/FeedBack/AverageRatingByBoatId/${boatId}`);
        const averageRating = response.data.toFixed(1);
        setAverageRating(averageRating);
      } catch (error) {
        console.error('Error fetching average rating:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/Feedback/ByBoatId/${boatId}`);
        console.log('Feedback API Response:', response.data); // Debugging: Log API response

        const feedbacks = response.data;
        const feedbackCount = feedbacks.length;
        console.log('Feedback Count:', feedbackCount); // Debugging: Log feedback count
        setFeedbackCount(feedbackCount);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();

    fetchAverageRating();
    fetchBoats();
    fetchUser();
    fetchBoatsEquipments()
  }, [boatId, userId]);


  if (!boatId) {
    return <Text>No item foun</Text>;
  }

  if (loading || !boats) {
    return (
      <View>
        <Header />
        <View style={{ justifyContent: "center", paddingTop: "50%" }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      </View>

    );
  }

  if (!fontsLoaded) {
    return null;
  }

  const openPaymentModal = () => {
    setpaymentModalVisible(true);
  };


  const handleDatePressBegin = () => {
    setShowCalendarBegin(true);
  };

  const handleDatePressEnd = () => {
    setShowCalendarEnd(true);
  };

  const handleDayPressBegin = (day) => {
    setSelectedDateBegin(day.dateString);
    setShowCalendarBegin(false);
    calculateDateMargin(day.dateString, selectedDateEnd);

  };

  const handleDayPressEnd = (day) => {

    setSelectedDateEnd(day.dateString);
    setShowCalendarEnd(false);
    calculateDateMargin(selectedDateBegin, day.dateString); // Calculate margin after setting end date

  };

  const calculateDateMargin = (start, end) => {
    try {
      const startDate = new Date(start);
      const endDate = new Date(end);
      let diffInDays = Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
      diffInDays = diffInDays === 0 ? 1 : diffInDays;
      setDateMargin(diffInDays);
    } catch (error) {
      console.error("Error calculating date margin:", error);
    }
  };

  const handleContact = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');


      const userDetails = await AsyncStorage.getItem('user');
      const user = JSON.parse(userDetails);
      const MyUserId = user.id
      console.log(MyUserId);

      const response = await axios.post(`${BASE_URL}api/conversation`, {
        userId1: MyUserId,
        userId2: userId,
      });

      // Handle the response, e.g., navigate to the conversation screen
      console.log('Conversation created:', response.data);

    } catch (error) {
      console.error('Error creating conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatMemberSinceDate = (dateString) => {
    if (!dateString) return '';

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
  };

  const formatLanguagesSpoken = (languages) => {
    if (!languages || languages.length === 0) {
      return 'English';
    } else {
      return languages[0]; // Return the first language if only one language is spoken
    }
  };

  const allEquipmentsZero = (equipment) => {
    return (
      equipment.every(item => item.bathingLadder === 0) &&
      equipment.every(item => item.gps === 0) &&
      equipment.every(item => item.hotWater === 0) &&
      equipment.every(item => item.pilot === null) &&
      equipment.every(item => item.shower === 0) &&
      equipment.every(item => item.speaker === 0) &&
      equipment.every(item => item.tv === 0) &&
      equipment.every(item => item.wifi === 0)
    );
  };


  return (

    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View>
          {boats.imageUrl && <Image source={{ uri: `${BASE_URL}` + boats.imageUrl }} style={styles.image} />}



        </View>
        <View style={styles.textContainer}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text style={styles.LocationText}>{boats.city}, {boats.country} </Text>
            <Image source={require("../.././assets/icons/more.png")} style={{ width: 30, height: 30, marginRight: 15 }} />
          </View>

          <Text style={styles.textName}>{boats.name}</Text>
          <Text style={styles.simpleText}>{boats.capacity} Capacity . {boats.nbrCabins} Cabins . {boats.nbrBedrooms} Baths</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.itemContainer}>
          <Text style={styles.simpleText} >{boats.description}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.titleText}>On Board Equipment</Text>
          <View style={{ flexDirection: "column" }}>
            {equipment && equipment.length > 0 ? (
              allEquipmentsZero(equipment) ? (
                <Text style={styles.noEquipmentText}>No equipments available</Text>
              ) : (
                equipment.map((item, index) => (
                  <View key={index} style={{ flexDirection: "column", marginBottom: 30 }}>
                    {/* Check if Automatic Pilot equipment is available */}
                    {item.pilot === 1 && (
                      <View style={{ flexDirection: "row", alignItems: "center", width: "50%" }}>
                        <Image source={require("../.././assets/icons/equipments/pilot.png")} style={styles.Icon} />
                        <Text style={styles.Icontext}>Automatic Pilot</Text>
                      </View>
                    )}
                    {/* Check if Deck Shower equipment is available */}
                    {item.shower === 1 && (
                      <View style={{ flexDirection: "row", alignItems: "center", width: "50%" }}>
                        <Image source={require("../.././assets/icons/equipments/shower.png")} style={styles.Icon} />
                        <Text style={styles.Icontext}>Deck Shower</Text>
                      </View>
                    )}
                    {/* Check if Outboard Motor equipment is available */}
                    {item.bathingLadder === 1 && (
                      <View style={{ flexDirection: "row", alignItems: "center", width: "50%" }}>
                        <Image source={require("../.././assets/icons/equipments/bathing-ladder.png")} style={styles.Icon} />
                        <Text style={styles.Icontext}>Bathing Ladder</Text>
                      </View>
                    )}

                    {/* Check if GPS equipment is available */}
                    {item.gps === 1 && (
                      <View style={{ flexDirection: "row", alignItems: "center", width: "50%" }}>
                        <Image source={require("../.././assets/icons/equipments/gps.png")} style={styles.Icon} />
                        <Text style={styles.Icontext}>GPS</Text>
                      </View>
                    )}

                    {item.hotWater === 1 && (
                      <View style={{ flexDirection: "row", alignItems: "center", width: "50%" }}>
                        <Image source={require("../.././assets/icons/equipments/hot-water.png")} style={styles.Icon} />
                        <Text style={styles.Icontext}>Deck Shower</Text>
                      </View>
                    )}

                    {item.tv === 1 && (
                      <View style={{ flexDirection: "row", alignItems: "center", width: "50%" }}>
                        <Image source={require("../.././assets/icons/equipments/TV.png")} style={styles.Icon} />
                        <Text style={styles.Icontext}>Deck Shower</Text>
                      </View>
                    )}

                    {item.speaker === 1 && (
                      <View style={{ flexDirection: "row", alignItems: "center", width: "50%" }}>
                        <Image source={require("../.././assets/icons/equipments/speaker.png")} style={styles.Icon} />
                        <Text style={styles.Icontext}>Speaker</Text>
                      </View>
                    )}

                    {item.wifi === 1 && (
                      <View style={{ flexDirection: "row", alignItems: "center", width: "50%" }}>
                        <Image source={require("../.././assets/icons/equipments/wifi.png")} style={styles.Icon} />
                        <Text style={styles.Icontext}>WiFi</Text>
                      </View>
                    )}
                  </View>
                ))
              )
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
        </View>



        <View style={styles.itemContainer}>

          <Text style={styles.titleText}>Owner Info</Text>
          <View style={{ flexDirection: "column" }} >
            <View>
              <TouchableOpacity onPress={() => openProfile(boats.userId)} style={{ flexDirection: "row", marginTop: 10, marginBottom: 25 }}>
                {userAvatar && <Image source={{ uri: `${BASE_URL}` + userAvatar }} style={{ width: 70, height: 70, borderRadius: 50 }} />}
                <View style={{ flexDirection: "column" }}>
                  <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, marginLeft: 15, paddingTop: 12 }}>{userName}</Text>
                  <Text style={{ fontFamily: 'Lato-Regular', fontSize: 16, marginLeft: 15, paddingTop: 4 }}>Rating</Text>
                </View>
              </TouchableOpacity>

            </View>
            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 17, marginLeft: 10, paddingBottom: 20 }}>Member since :  {formatMemberSinceDate(dateInscription)}</Text>
            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 17, marginLeft: 10, paddingBottom: 20 }}>Languages spoken: {formatLanguagesSpoken(langue)}</Text>
            {userIdRole === null ? (
              <View style={styles.container}>
                <Text>Loading...</Text>
              </View>
            ) : userIdRole === 2 ? (
              <TouchableOpacity style={styles.btn} onPress={handleContact}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Send a message</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.btn} onPress={() => handleRestrictedAction()}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Send a message</Text>
              </TouchableOpacity>
            )}

          </View>

        </View>
        <View style={{ marginHorizontal: 15, marginBottom: 20, height: 400 }}>
          <Text style={styles.titleText}>Location</Text>
          <Text style={{ fontSize: 18, fontFamily: "Lato-Regular", color: "grey" }}>Santa Maria Maggiore, Milazzo</Text>
          <View style={{ flex: 1, borderRadius: 20, overflow: 'hidden', marginTop: 20 }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{ width: '100%', height: '100%' }}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          </View>
        </View>
        <View style={styles.commentContainer}>
          <View style={{ flexDirection: 'row', alignItems: "center", marginHorizontal: 15 }}>
            <Icon name="star" size={25} color="black" style={{ paddingBottom: 8, marginRight: 8 }} />
            <Text style={styles.titleText}>{averageRating} - {feedbackCount} Reviews</Text>
          </View>
          <CommentScreen boatId={boatId} />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View>
          <Text style={styles.PriceText}>${price} / night</Text>
          <Text style={styles.ReviewText}>{averageRating} ( {feedbackCount} reviews )</Text>
        </View>
        {userIdRole === null ? (
          <View style={styles.container}>
            <Text>Loading...</Text>
          </View>
        ) :
          userIdRole === 2 ? (
            <TouchableOpacity style={styles.reserverBtn} onPress={() => setModalVisible(true)}>
              <Text style={{ fontFamily: "Lato-Bold", fontSize: 16, color: "white", alignSelf: "center", paddingVertical: 15 }}>Reserve</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.reserverBtn} onPress={() => handleRestrictedAction()}>
              <Text style={{ fontFamily: "Lato-Bold", fontSize: 16, color: "white", alignSelf: "center", paddingVertical: 15 }}>Reserve</Text>
            </TouchableOpacity>
          )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}>
          <View style={{ backgroundColor: 'white', borderRadius: 10 }}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', top: 15, right: 20 }}>
              <Icon name="close" size={30} color="black" />
            </TouchableOpacity>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', marginTop: 65, opacity: .5 }} />
          </View>
          <View style={{ paddingTop: 60, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              <Text style={{ fontFamily: 'Lato-Bold', fontSize: 22 }}>${price}</Text>
              <Text style={{ fontFamily: 'Lato-Regular', fontSize: 18 }}> / night</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              <Icon name="star" size={22} color="black" style={{ marginRight: 10 }} />
              <Text style={{ fontFamily: 'Lato-Regular', fontSize: 16 }}>{averageRating} </Text>
              <Text style={{ fontFamily: 'Lato-Light', fontSize: 16 }}>( {feedbackCount} reviews )</Text>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.cell}>


                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setShowStart(true)}>

                  <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 14, paddingBottom: 10 }}>Trip Start</Text>
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 18, color: 'grey' }}>{formatDate(startDate) || 'Add date'}</Text>
                  </View>
                </TouchableOpacity>

              </View>

              <View style={styles.cell}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setShowEnd(true)}>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 14, paddingBottom: 10 }}>Trip End</Text>
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 18, color: 'grey' }}>{formatDate(endDate) || 'Add date'}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

          </View>

          {showStart && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={onChangeStart}
            />
          )}

          {showEnd && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={onChangeEnd}
            />
          )}

          <Calendar
            markedDates={markedDates}
            markingType={'period'}
            theme={{
              textDayFontFamily: 'Lato-Regular', // Font family for day text
              textMonthFontFamily: 'Lato-Bold', // Font family for month text
              textDayHeaderFontFamily: 'Lato-Bold', // Font family for day header text
            }}
            style={{ marginBottom: 20 }}
          />

          <TouchableOpacity style={styles.modalReserverBtn} onPress={openPaymentModal}>
            <Text style={{ fontFamily: "Lato-Black", fontSize: 20, color: "white", alignSelf: "center", paddingVertical: 28 }}>Confirm</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={paymentModalVisible}
            onRequestClose={() => {
              setpaymentModalVisible(!modalVisible);
            }}
          >
            <View style={styles.paymentmodalContainer}>
              <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                <PaymentCard {...cardDetails} />

                <View style={{ marginTop: 20 }}>
                  <Text style={styles.paymentLabel}>Card Number</Text>
                  <TextInput
                    value={cardDetails.cardNumber}
                    style={styles.paymentinput}
                    onChangeText={(text) => handleChange('cardNumber', text)}
                    keyboardType="numeric"

                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.paymentLabel}>Card Holder Name</Text>
                  <TextInput
                    value={cardDetails.cardHolder}
                    style={styles.paymentinput}
                    onChangeText={(text) => handleChange('cardHolder', text)}
                  />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems: "center" }}>

                  <View style={{ flexDirection: "column", width: "34%" }}>
                    <Text style={styles.paymentLabel}>Expiration Date</Text>
                    <TextInput
                      style={styles.paymentminiInput}
                      placeholder='Year'
                      onChangeText={(text) => handleChange('cardMonth', parseInt(text))}
                      keyboardType="numeric"

                    />
                  </View>
                  <View style={{ flexDirection: "column", width: "34%" }}>
                    <Text style={styles.paymentLabel}>.</Text>
                    <TextInput
                      style={styles.paymentminiInput}
                      placeholder='Month'
                      onChangeText={(text) => handleChange('cardYear', parseInt(text))}
                      keyboardType="numeric"

                    />
                  </View>

                  <View style={{ flexDirection: "column", width: "30%" }}>
                    <Text style={styles.paymentLabel}>Security Code</Text>
                    <TextInput
                      style={styles.paymentminiInput}
                      onChangeText={(text) => handleChange('cardCvv', text)}
                      keyboardType="numeric"

                    />
                  </View>
                </View>

                <TouchableOpacity style={[styles.paymentPasswordModalReserverBtn, { backgroundColor: "black" }]} onPress={handleCheckCard}>
                  <Text style={{ fontFamily: "Lato-Bold", fontSize: 18, color: "white", alignSelf: "center", }}>save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={{ marginTop: 100 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ fontFamily: "Lato-Regular", fontSize: 18, color: 'grey' }}>${price} x {Math.ceil(dateMargin)} Nights </Text>
              <Text style={{ fontFamily: "Lato-Bold", fontSize: 18 }}>${Math.ceil(totalPrice.toFixed(2))}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ fontFamily: "Lato-Regular", fontSize: 18, color: 'grey' }}>Cleaning Fee</Text>
              <Text style={{ fontFamily: "Lato-Bold", fontSize: 18 }}>${Math.ceil(cleaningFee)}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ fontFamily: "Lato-Regular", fontSize: 18, color: 'grey' }}>Service Fee</Text>
              <Text style={{ fontFamily: "Lato-Bold", fontSize: 18 }}>${serviceFee}</Text>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', opacity: .8, marginBottom: 20 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ fontFamily: "Lato-Regular", fontSize: 18, color: 'grey' }}>Total Fee</Text>
              <Text style={{ fontFamily: "Lato-Bold", fontSize: 18, color: 'red' }}>${Math.ceil(newTotalFee)}</Text>
            </View>
          </View>

        </ScrollView>
      </Modal>

    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  commentContainer: {
    height: 500,
    marginBottom: 100,
  },

  image: {
    width: "100%",
    height: 250,
    resizeMode: 'cover'
  },

  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
    bottom: 0,
    right: 0,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8
  },

  textContainer: {
    marginLeft: 15,
    marginTop: 20,
  },

  itemContainer: {
    marginHorizontal: 15,
    marginBottom: 30
  },
  LocationText: {
    fontSize: 18,
    paddingTop: 8,
    fontFamily: 'Lato-Regular'
  },

  textName: {
    fontSize: 28,
    color: 'black',
    fontWeight: "500",
    paddingTop: 8,
    fontFamily: 'Lato-Bold'

  },

  simpleText: {
    fontSize: 18,
    color: 'black',
    paddingTop: 8,
    fontFamily: 'Lato-Regular'
  },

  titleText: {
    fontSize: 18,
    color: 'black',
    paddingTop: 8,
    marginBottom: 20,
    fontFamily: 'Lato-Bold'
  },


  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    width: "95%",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center"
  },

  linetext: {

    fontSize: 25,
    color: 'black',
    marginLeft: 15,
  },

  Icon: {
    width: 35,
    height: 35,
    marginRight: 20
  },

  Icontext: {
    marginRight: 20,
    fontFamily: "Lato-Regular"

  },

  specs: {
    borderBottomWidth: 0.3,
    paddingBottom: 15,
    paddingLeft: 10,
    marginBottom: 15,
    borderColor: "grey"

  },

  smallText: {
    fontWeight: "300",
    fontSize: 16,
    color: "grey"
  },

  btn: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    elevation: 20,
    height: 90,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },

  PriceText: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    paddingBottom: 8
  },

  ReviewText: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
  },

  reserverBtn: {
    backgroundColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderRadius: 10,
    height: "60%",
    width: "30%"

  },
  modalReserverBtn: {
    backgroundColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderRadius: 12,
    height: 90,
    width: "100%"

  },

  table: {
    marginTop: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDDDD',
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDD',
  },
  cell: {
    flex: 1,
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: '#DDDDD',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 16,
  },

  paymentmodalContainer: {
    backgroundColor: "white",
    height: "100%"
  },

  paymentinput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    width: '97%',
    height: 50,
    padding: 10,
    fontFamily: "Lato-Regular",
  },
  paymentLabel: {
    paddingLeft: 4,
    fontFamily: "Lato-Regular",
  },
  paymentminiInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    width: "94%",
    height: 50,
    padding: 10
  },
  paymentPasswordModalReserverBtn: {
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderRadius: 12,
    height: 70,
    width: "100%",
    justifyContent: "center"
  }


})


export default Publication;