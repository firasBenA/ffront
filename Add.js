import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { launchImageLibraryAsync } from 'expo-image-picker';




const Photo = () => {

    let [fontsLoaded] = useFonts({
    
        'Lato-Bold': require('./assets/Fonts//Lato/Lato-Bold.ttf'),
        'Lato-Regular': require('./assets/Fonts//Lato/Lato-Regular.ttf'),
        'Lato-Black': require('./assets/Fonts//Lato/Lato-Black.ttf'),
    
      });
      if (!fontsLoaded) {
        return null;
      }
    
      const selectImage = async () => {
        const options = {
            mediaTypes: 'Images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        };
        const result = await launchImageLibraryAsync(options);

        if (!result.cancelled) {
            setImageUrl(result.assets[0].uri); // Set the selected image data
            console.log(result.assets[0].uri)
        }

    };
    return (
        <View style={styles.UploadContainer}>
            <Text style={styles.UploadConatinertext}>Add some photos of your boat</Text>

            <TouchableOpacity style={styles.UploadCard} onPress={selectImage} >
                <Image
                    source={require('./assets/icons/upload.png')}
                    style={{ width: 50, height: 50 }}
                />
                <Text style={styles.Uploadtext}>Drag your photos here</Text>
                <Text style={styles.Uploadtext1}>Choose at least 1 photo</Text>

                <Text style={styles.Uploadtext2}>Upload from your device</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    UploadContainer: {
        marginTop: 45,
        paddingHorizontal: 20,
        paddingTop: 150,
        justifyContent:"center"
    },
    UploadConatinertext:{
        fontSize: 18,
        fontFamily:'Lato-Regular',

    },
    UploadCard: {
        borderColor:'grey',
        justifyContent: "center",
        alignItems: 'center',
        height: 300,
        width: "100%",
        borderWidth: 1,
        padding: 30,
        borderRadius: 12,
        marginTop:20
    },
   
   
    Uploadtext: {
        fontSize: 22,
        paddingTop: 30,
        fontFamily:'Lato-Regular',
    },
    Uploadtext1: {
        fontSize: 16,
        paddingTop: 14,
        fontFamily:'Lato-Regular',


    },
    Uploadtext2: {
        fontFamily:'Lato-Bold',
        paddingTop:30,
        textDecorationLine: 'underline'
    },
});

export default Photo;
