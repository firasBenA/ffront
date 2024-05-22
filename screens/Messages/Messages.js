// Message.js
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';

const Message = ({ list }) => {
    const navigation = useNavigation();

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
        <ScrollView stickyHeaderIndices={[0]}>

            <Header />
            <FlatList
                data={list}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMessageItem}
                contentContainerStyle={styles.flatListContainer}
            />
        </ScrollView>

    );
};

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
