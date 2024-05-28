import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { BASE_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RatingModal from './RatingModal';
import { useNavigation } from '@react-navigation/native';

const Comment = ({ comment, text, time, rating }) => {
    const { user } = comment;
    if (!user) {
        return <Text>Error: User data not available</Text>;
    }

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Icon
                    key={i}
                    name={i <= rating ? 'star' : 'star-o'}
                    size={30}
                    color={i <= rating ? 'black' : 'grey'}
                />
            );
        }
        return stars;
    };

    return (
        <View style={styles.commentContainer}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <View style={styles.userInfo}>
                    {user.avatar ? (
                        <Image source={{ uri: `${BASE_URL}` + user.avatar }} style={styles.profileImage} />
                    ) : (
                        <Image source={require('../../assets/image/user.png')} style={styles.profileImage} />
                    )}
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={[styles.profileName, { marginBottom: 8 }]}>{user.name}</Text>
                        <Text style={styles.time}>{time}</Text>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                        {renderStars()}
                    </View>
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, left: 20 }}>San Diego, CA</Text>
                </View>
            </View>
            <Text style={styles.commentText}>{comment.comment}</Text>
            <Text style={styles.commentTime}>{time}</Text>
        </View>
    );
};

const CommentScreen = ({ boatId }) => {
    const [comments, setComments] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [feedbackCount, setFeedbackCount] = useState(0);
    const [userRole, setUserRole] = useState(null);

    const navigation = useNavigation();

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
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
            { cancelable: false }
        );
    };

    const handleModalSubmit = async (rating, comment) => {
        try {
            const userDataString = await AsyncStorage.getItem('user');
            const user = JSON.parse(userDataString);
            const userId = user.id;

            // Check if the user has already submitted a rating for the boat
            const existingRatingResponse = await axios.get(`${BASE_URL}api/Feedback/ByUserAndBoatId/${userId}/${boatId}`);

            if (existingRatingResponse.data === 0) {
                // If the response is 0, it means no feedback exists, so upload a new feedback
                const response = await axios.post(`${BASE_URL}api/Feedback`, {
                    rating: rating,
                    comment: comment,
                    IdUser: userId,
                    IdBoat: boatId,
                });

                setRating(0);
                setNewComment('');
                toggleModal();
            } else {
                // If the response is not 0, it means feedback exists, so display a message
                Alert.alert(
                    'Already Rated',
                    'You have already submitted a rating for this boat.',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
                );
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('user');
                const user = JSON.parse(userDataString);
                setUserRole(user.idRole);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(`${BASE_URL}api/Feedback/ByBoatId/${boatId}`);
                setComments(response.data);
                const feedbackCount = response.data.length;
                setFeedbackCount(feedbackCount);
                const userIds = response.data.map(comment => comment.idUser);
                const uniqueUserIds = [...new Set(userIds)];

                const usersPromises = uniqueUserIds.map(async (userId) => {
                    const userResponse = await axios.get(`${BASE_URL}api/User/${userId}`);
                    return userResponse.data;
                });

                const usersData = await Promise.all(usersPromises);
                const usersMap = Object.fromEntries(usersData.map(user => [user.id, user]));

                const updatedComments = response.data.map(comment => ({
                    ...comment,
                    user: usersMap[comment.idUser],
                }));

                setComments(updatedComments);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
        fetchFeedbacks();
    }, [boatId]);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {comments.length === 0 ? (
                    <View>
                        <Text style={styles.commentText}>No comments available</Text>
                        {userRole === null ? (
                            <View style={styles.container}>
                                <Text>Loading...</Text>
                            </View>
                        ) : userRole === 2 ? (
                            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
                                <Text style={styles.modalButtonText}>Rate and Comment</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.modalButton} onPress={handleRestrictedAction}>
                                <Text style={styles.modalButtonText}>Rate and Comment</Text>
                            </TouchableOpacity>
                        )}
                        <RatingModal
                            visible={isModalVisible}
                            onClose={toggleModal}
                            onSubmit={handleModalSubmit}
                        />
                    </View>
                ) : (
                    <>
                        <ScrollView style={styles.scrollView}>
                            {comments.map((comment, index) => (
                                <Comment key={index} comment={comment} text={comment.text} time={comment.time} rating={comment.rating} />
                            ))}
                        </ScrollView>
                        {userRole === null ? (
                            <View style={styles.container}>
                                <Text>Loading...</Text>
                            </View>
                        ) : userRole === 2 ? (
                            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
                                <Text style={styles.modalButtonText}>Rate and Comment</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.modalButton} onPress={handleRestrictedAction}>
                                <Text style={styles.modalButtonText}>Rate and Comment</Text>
                            </TouchableOpacity>
                        )}
                        <RatingModal
                            visible={isModalVisible}
                            onClose={toggleModal}
                            onSubmit={handleModalSubmit}
                        />
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    scrollView: {
        flex: 1,
    },
    commentContainer: {
        marginVertical: 5,
        borderRadius: 8,
        borderBottomWidth: 0.5,
        borderColor: "#DDDDD",
        padding: 10,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 10,
    },
    profileName: {
        fontFamily: 'Lato-Bold',
    },
    commentText: {
        marginTop: 20,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
    },
    time: {
        fontSize: 16,
        fontFamily: 'Lato-Regular',
    },
    commentTime: {
        alignSelf: 'flex-end',
        color: '#999',
    },
    modalButton: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: "dodgerblue"
    },
    modalButtonText: {
        color: 'dodgerblue',
        fontWeight: 'bold',
    },
});

export default CommentScreen;
