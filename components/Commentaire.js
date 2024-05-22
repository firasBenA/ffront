import React, { useState , useRef  } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import StarRating from './StarRating';



const Commentaire = ({ name, description, imageSource }) => {

    let [fontsLoaded] = useFonts({

        'Lato-Bold': require('../assets/Fonts/Lato/Lato-Bold.ttf'),
        'Lato-Regular': require('../assets/Fonts/Lato/Lato-Regular.ttf'),
        'Lato-Black': require('../assets/Fonts/Lato/Lato-Black.ttf'),

    });
    const [rating, setRating] = useState(4);

    if (!fontsLoaded) {
        return null;
    }

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

   

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.bigText}>Testimonial</Text>
                <Text style={styles.smallText}>Unsatiable It Considered Invitation He Travelling Insensible.</Text>
            </View>
            <ScrollView horizontal >
                <View style={styles.card}>
                    <Text style={styles.description}>“This template used e-commerce for your branding site cannot believe we are able to use our most that I have got a brand new landing page after getting. I to make it cool. OMG!”</Text>
                    <View style={styles.line} />
                    <Text style={styles.name}>Anis Ghodhbani</Text>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 8, justifyContent: "space-between", paddingRight: 10 }}>
                        <Text style={{ fontFamily: "Lato-Regular", fontSize: 16, marginLeft: 15, }}>boat owner</Text>
                        <StarRating rating={rating} onRatingChange={handleRatingChange} />
                    </View>

                </View>


                <View style={styles.card}>
                    <Text style={styles.description}>“This template used e-commerce for your branding site cannot believe we are able to use our most that I have got a brand new landing page after getting. I to make it cool. OMG!”</Text>
                    <View style={styles.line} />
                    <Text style={styles.name}>Anis Ghodhbeni</Text>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 8, justifyContent: "space-between", paddingRight: 10 }}>
                        <Text style={{ fontFamily: "Lato-Regular", fontSize: 16, marginLeft: 15, }}>boat owner</Text>
                        <StarRating rating={rating} onRatingChange={handleRatingChange} />
                    </View>
                </View>


                <View style={styles.card}>
                    <Text style={styles.description}>“This template used e-commerce for your branding site cannot believe we are able to use our most that I have got a brand new landing page after getting. I to make it cool. OMG!”</Text>
                    <View style={styles.line} />
                    <Text style={styles.name}>Anis Ghodhbeni</Text>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 8, justifyContent: "space-between", paddingRight: 10 }}>
                        <Text style={{ fontFamily: "Lato-Regular", fontSize: 16, marginLeft: 15, }}>boat owner</Text>
                        <StarRating rating={rating} onRatingChange={handleRatingChange} />
                    </View>
                </View>


                <View style={styles.card}>
                    <Text style={styles.description}>“This template used e-commerce for your branding site cannot believe we are able to use our most that I have got a brand new landing page after getting. I to make it cool. OMG!”</Text>
                    <View style={styles.line} />
                    <Text style={styles.name}>Anis Ghodhbeni</Text>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 8, justifyContent: "space-between", paddingRight: 10 }}>
                        <Text style={{ fontFamily: "Lato-Regular", fontSize: 16, marginLeft: 15, }}>boat owner</Text>
                        <StarRating rating={rating} onRatingChange={handleRatingChange} />
                    </View>
                </View>


                <View style={styles.card}>
                    <Text style={styles.description}>“This template used e-commerce for your branding site cannot believe we are able to use our most that I have got a brand new landing page after getting. I to make it cool. OMG!”</Text>
                    <View style={styles.line} />
                    <Text style={styles.name}>Anis Ghodhbeni</Text>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 8, justifyContent: "space-between", paddingRight: 10 }}>
                        <Text style={{ fontFamily: "Lato-Regular", fontSize: 16, marginLeft: 15, }}>boat owner</Text>
                        <StarRating rating={rating} onRatingChange={handleRatingChange} />
                    </View>
                </View>




            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginLeft: 10,
        marginBottom: 20,

    },
    card: {
        width: 300,
        height: 290,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#333',
        marginHorizontal: 5,
        marginBottom: 20,
        marginTop:12,
        padding: 10
    },

    line: {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.3,
        width: "95%",
        marginBottom: 15,
        alignSelf: "center"
    },
    name: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 15,
        fontFamily: "Lato-Bold"
    },
    description: {
        fontSize: 16,
        margin: 15,
        fontFamily: "Lato-Regular",
        color: '#111',
        opacity: .7
    },
    bigText: {
        fontSize: 22,
        marginLeft: 10,
        marginBottom: 5,
        fontFamily: 'Lato-Bold'

    },

    smallText: {
        fontSize: 14,
        paddingBottom: 5,
        marginLeft: 10,
        marginBottom: 10,
        opacity: .8,
        fontFamily: 'Lato-Regular'

    },

});

export default Commentaire;
