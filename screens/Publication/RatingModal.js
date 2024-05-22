import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet ,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RatingModal = ({ visible, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleRating = (value) => {
        setRating(value);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Rate this publication</Text>
                    <View style={styles.starContainer}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <TouchableOpacity key={value} onPress={() => handleRating(value)}>
                                <Icon
                                    name={value <= rating ? 'star' : 'star-o'}
                                    size={30}
                                    color={value <= rating ? 'black' : 'grey'}
                                    style={styles.starIcon}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a comment..."
                        value={comment}
                        onChangeText={(text) => setComment(text)}
                    />
                    <TouchableOpacity style={styles.submitButton} onPress={() => onSubmit(rating, comment)}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    starContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    starIcon: {
        marginHorizontal: 5,
    },
    input: {
        width: '100%',
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: 'dodgerblue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default RatingModal;
