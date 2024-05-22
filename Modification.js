import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const Modification = () => {
    return (






        <ScrollView  >

            <View style={styles.TopContainer}>
                <Text style={styles.WelcomeText}>Welcome back </Text>

            </View>


            <View style={styles.container}>

                <View style={{ marginTop: "10%", marginBottom: 40 }}>
                    <Text style={styles.simpleText}>change your boat name :</Text>
                    <TextInput
                        style={styles.inputContainer}
                    />
                </View>
                <View style={{ marginBottom: 40 }}>
                    <Text style={styles.simpleText}>What type of boat you have?</Text>
                    <View style={{ marginTop: 20 }}>

                    </View>
                </View>

                <View style={{ marginBottom: 60 }}>
                    <Text style={styles.simpleText}>Now, set the price </Text>

                </View>

                <View style={{ marginBottom: 50 }}>
                    <Text style={styles.simpleText}>Create your description</Text>
                    <TextInput

                        style={styles.inputContainer} />
                </View>


                <View style={{ marginBottom: 80 }}>
                    <Text style={styles.simpleText}>About your boat</Text>
                    <LinearGradient
                        colors={['white', '#DDDDDD']}
                        start={[0, 0]}
                        end={[1, 10]} style={styles.priceContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: 16, fontFamily: "Lato-Bold" }}> Bed rooms</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity >
                                <Image source={require("./assets/icons/minus.png")} style={{ width: 30, height: 30, margin: 10 }} />
                            </TouchableOpacity>
                            <TextInput
                                style={{ fontSize: 20, fontFamily: "Lato-Regular" }}
                                // Ensure quantity is a number
                                keyboardType="numeric"
                            />
                            <TouchableOpacity >
                                <Image source={require("./assets/icons/pluss.png")} style={{ width: 30, height: 30, margin: 10 }} />
                            </TouchableOpacity>
                        </View>

                    </LinearGradient>
                    <LinearGradient
                        colors={['white', '#DDDDDD']}
                        start={[0, 0]}
                        end={[1, 10]} style={styles.priceContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: 16, fontFamily: "Lato-Bold" }}> Capacity</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity >
                                <Image source={require("./assets/icons/minus.png")} style={{ width: 30, height: 30, margin: 10 }} />
                            </TouchableOpacity>
                            <TextInput
                                style={{ fontSize: 20, fontFamily: "Lato-Regular" }}

                                // Ensure quantity is a number
                                keyboardType="numeric"
                            />
                            <TouchableOpacity >
                                <Image source={require("./assets/icons/pluss.png")} style={{ width: 30, height: 30, margin: 10 }} />
                            </TouchableOpacity>
                        </View>

                    </LinearGradient>
                    <LinearGradient
                        colors={['white', '#DDDDDD']}
                        start={[0, 0]}
                        end={[1, 10]} style={styles.priceContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: 16, fontFamily: "Lato-Bold" }}> Cabins</Text>
                        </View>
                        <View style={{ flexDirection: "row", fontFamily: "Lato-Bold" }}>
                            <TouchableOpacity >
                                <Image source={require("./assets/icons/minus.png")} style={{ width: 30, height: 30, margin: 10 }} />
                            </TouchableOpacity>
                            <TextInput
                                style={{ fontSize: 20, fontFamily: "Lato-Regular" }}

                                // Ensure quantity is a number
                                keyboardType="numeric"
                            />
                            <TouchableOpacity >
                                <Image source={require("./assets/icons/pluss.png")} style={{ width: 30, height: 30, margin: 10 }} />
                            </TouchableOpacity>
                        </View>

                    </LinearGradient>
                </View>
            </View>


            <View >


                <View style={styles.UploadContainer}>
                    <Text style={styles.UploadConatinertext}>Add some photos of your boat</Text>

                    <TouchableOpacity style={styles.UploadCard}  >
                        <Image
                            source={require('./assets/icons/upload.png')}
                            style={{ width: 50, height: 50 }}
                        />
                        <Text style={styles.Uploadtext}>Drag your photos here</Text>
                        <Text style={styles.Uploadtext1}>Choose at least 1 photo</Text>

                        <Text style={styles.Uploadtext2}>Upload from your device</Text>
                    </TouchableOpacity>
                </View>
            </View>


            
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.btnContainer} >
                    <Image source={require('./assets/icons/ship.png')} style={{ width: 40, height: 40, marginRight: 30 }} />
                    <Text style={{ fontSize: 18, fontFamily: "Lato-Bold" }}>Delete Boat</Text>
                </TouchableOpacity>
            </View>







        </ScrollView>



    )
};

export default Modification

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "white"

    },
    container: {
        paddingTop: 50,
        paddingHorizontal: 15,
        backgroundColor: "white"

    },

    TopContainer: {
        marginTop: "10%",
        marginLeft: 20

    },
    TopUploadContainer: {
        marginTop: 100,
        marginLeft: 20

    },
    WelcomeText: {
        fontSize: 24,
        paddingTop: 20,

        fontFamily: "Lato-Bold"
    },
    simpleText: {
        color: "black",
        fontSize: 20,
        fontFamily: "Lato-Regular"
    },
    btnContainer: {

        width: "92%",
        height: 70,
        marginTop: 25,
        borderWidth: .4,
        borderRadius: 8,
        paddingHorizontal: 30,
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor : "cyan"

    },

    gradient: {
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },



    progressBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    progressStep: {
        flex: 1,
        height: 5,
        backgroundColor: '#DDDDDD',
    },
    progressStepActive: {
        backgroundColor: 'black',
    },

    inputContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 8,
        width: "94%",
        height: 50,
        padding: 10
    },
    buttonContainer: {
        width: "30%",
        height: 80,
        margin: 6,
        justifyContent: "space-around",
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    miniIcons: {
        width: 35,
        height: 35,
        marginBottom: 5,
    },



    priceContainer: {
        marginTop: 20,
        borderWidth: .5,
        borderColor: "grey",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 8,
        justifyContent: "space-between"
    },

    uploadContainer: {
        marginTop: 20,
        borderWidth: 2,
        borderColor: "#DDDDDD",
        borderRadius: 20,
        height: 400,
        flexDirection: "column",
        alignItems: "center",

    },

    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 20
    },
    countryPickerButton: {
        paddingHorizontal: 5,
    },
    phoneInput: {
        flex: 1,
        height: 60,
        marginLeft: 5,
    },
    phoneInputText: {
        fontSize: 16,
    },
    mapContainer: {
        marginTop: 20,
        borderRadius: 15,
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        aspectRatio: 20 / 25, // Set aspect ratio for better display
    },
    buttonEquipementsContainer: {
        width: '44%', // Adjust width as needed
        height: 120, // Adjust height as needed
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: "#DDDDDD",
        margin: 8,
        marginVertical: 8, // Adjust vertical margin as needed
        borderRadius: 10, // Add border radius as needed
    },
    selectedLocationContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    selectedLocationText: {
        marginBottom: 10,
    },

    UploadContainer: {
        marginTop: 5,
        paddingHorizontal: 20,
        paddingTop: 10,
        justifyContent: "center"
    },
    UploadConatinertext: {
        fontSize: 18,
        fontFamily: 'Lato-Regular',

    },
    UploadCard: {
        borderColor: '#DDDDDD',
        justifyContent: "center",
        alignItems: 'center',
        height: 240,
        width: "100%",
        borderWidth: 1,
        padding: 30,
        borderRadius: 12,
        marginTop: 20
    },
    UploadConatinertext: {
        fontSize: 18,
        fontFamily: 'Lato-Regular',

    },
    Uploadtext: {
        fontSize: 20,
        paddingTop: 30,
        fontFamily: 'Lato-Regular',
    },
    Uploadtext1: {
        fontSize: 14,
        paddingTop: 14,
        fontFamily: 'Lato-Regular',


    },
    Uploadtext2: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        paddingTop: 30,
        textDecorationLine: 'underline'

    },





})