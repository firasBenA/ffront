import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from './config';
import { useNavigation } from '@react-navigation/native';

// UserProfile component
const UserProfile = ({ user, handleToggleStatus }) => {
    const navigation = useNavigation();

    const openProfile = (userId) => {
        navigation.navigate('ProfileUser', { userId });
    };

    return (  
            <View style={[styles.profileContainer, user.active === 0 && styles.inactiveUser]}>
                <Image source={{ uri: `${BASE_URL}` + user.avatar }} style={styles.avatar} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
                <TouchableOpacity style={[styles.button, user.active === 1 ? styles.activeButton : styles.inactiveButton]} onPress={() => handleToggleStatus(user.id, user.active === 1)}>
                    <Text style={styles.buttonText}>{user.active === 1 ? 'Block' : 'Unblock'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={() => openProfile(user.id)}>
                    <Text style={[styles.buttonText, styles.confirmButtonText]}>Consulter</Text>
                </TouchableOpacity>
            </View>
    );
};

// AdministrerCompte component
const AdministrerCompte = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}api/User`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleToggleStatus = async (userId, isActive) => {
        try {
            const action = isActive ? 'block' : 'unblock';
            await axios.put(`${BASE_URL}api/User/${userId}/${action}`);
            fetchUsers(); // Refresh the users list after blocking/unblocking
        } catch (error) {
            console.error(`Error ${isActive ? 'blocking' : 'unblocking'} user:`, error);
            Alert.alert('Error', `Failed to ${isActive ? 'block' : 'unblock'} user`);
        }
    };

    const renderUserProfile = ({ item }) => (
        <UserProfile
            user={item}
            handleToggleStatus={handleToggleStatus}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderUserProfile}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingVertical: 20,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    inactiveUser: {
        borderColor: 'red',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 12,
        color: '#888888',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#dddddd',
    },
    buttonText: {
        fontSize: 14,
        color: '#333333',
        textAlign: 'center',
    },
    confirmButton: {
        backgroundColor: 'dodgerblue',
        borderColor: 'dodgerblue',
    },
    confirmButtonText: {
        color: '#ffffff',
    },
    confirmButton: {
        backgroundColor: 'dodgerblue',
        borderColor: 'dodgerblue',
    },
    confirmButtonText: {
        color: '#ffffff',
    },
});

export default AdministrerCompte;
