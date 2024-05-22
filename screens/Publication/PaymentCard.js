import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';


const CARDS = {
    visa: '^4',
    mastercard: '^5[1-5]', //first digit 5 , 2nd digit from 1-5 ..
    discover: '^6011',
    unionpay: '^62',
};



const PaymentCard = ({
    cardHolder,
    cardNumber,
    cardMonth,
    cardYear,
    cardCvv,
    isCardFlipped,
}) => {

    
    let [fontsLoaded] = useFonts({
        'Lato-Bold': require('../../assets/Fonts/Lato/Lato-Bold.ttf'),
        'Lato-Regular': require('../../assets/Fonts/Lato/Lato-Regular.ttf'),
        'Lato-Black': require('../../assets/Fonts/Lato/Lato-Black.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    const cardType = (cardNumber) => {
        if (!cardNumber || typeof cardNumber !== 'string') {
            return 'visa'; 
        }

        const number = cardNumber;
        let re;
        for (const [card, pattern] of Object.entries(CARDS)) {
            re = new RegExp(pattern);
            if (number.match(re) != null) {
                return card;
            }
        }

        return 'visa'; // Default type if no matching pattern is found
    };

    const useCardType = useMemo(() => {
        return cardType(cardNumber);
    }, [cardNumber]);

    const maskCardNumber = (cardNumber) => {
        if (!cardNumber || typeof cardNumber !== 'string') return ''; // Return an empty string if cardNumber is undefined or not a string
        const cardNumberArr = cardNumber.split('');
        cardNumberArr.forEach((val, index) => {
            if (index > 4 && index < 14) {
                if (cardNumberArr[index] !== ' ') {
                    cardNumberArr[index] = '*';
                }
            }
        });

        return cardNumberArr.join('');
    };



    return (
        <View style={[styles.cardItem, isCardFlipped && styles.active]}>
            {/* Front side */}
            <View style={styles.cardSide}>
                <Image
                    source={require('../../assets/image/CreditCardBackground.jpeg')}
                    style={styles.cardBackground}
                />
                <Image
                    source={require('../../assets/image/chip.png')}
                    style={styles.chip}
                />
                <View style={styles.cardType}>
                    <Image
                    source={require('../../assets/image/visa.png')}
                    style={styles.cardTypeImg}
                    />
                </View>
                <Text style={styles.cardNumber}>{maskCardNumber(cardNumber)}</Text>
                <View style={styles.cardContent}>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardHolder}>Card Holder</Text>
                        <Text style={styles.cardName}>
                            {typeof cardHolder === 'string' ? cardHolder.split('').join('') : 'FULL NAME'}
                        </Text>
                    </View>
                    <View style={styles.cardDate}>
                        <Text style={styles.dateTitle}>Expires</Text>
                        <Text style={styles.dateItem}>
                            {cardMonth ? cardMonth : 'MM'} /{' '}
                            {cardYear ? cardYear.toString().substr(-2) : 'YY'}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Back side 
            <View style={[styles.cardSide, styles.backSide]}>
                <Image
                    source={require('./assets/image/CreditCardBackground.jpeg')}
                    style={styles.cardBackground}
                />
                <View style={styles.cvv}>
                    <Text style={styles.cvvTitle}>CVV</Text>
                    <Text style={styles.cvvBand}>****</Text>
                    <Image
                        source={{ uri: `/card-type/${useCardType}.png` }}
                        style={styles.cardTypeImg}
                    />
                </View>
            </View>
            */}
            
        </View>
    );
};

const styles = StyleSheet.create({
    cardItem: {
        marginHorizontal: 50,
        marginVertical: 50,
        width: 300,
        height: 180,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    active: {
        transform: [{ rotateY: '180deg' }],
    },
    cardSide: {

        borderRadius: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backSide: {

        borderRadius: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#2364d2',
    },
    cardBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    chip: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 10,
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginTop: 20,
    },
    cardType: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    cardTypeImg: {
        width: 50,
        height: 30,
        resizeMode: 'contain',
    },
    cardNumber: {
        zIndex: 1,
        fontSize: 16,
        color: '#fff',
        opacity:0.7,
        marginTop: 20,
        fontFamily:"Lato-Bold"
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: "space-between",
        position: 'absolute',
        bottom: 2,
        left: 20,
        right: 20,
    },

    cardInfo: {
        marginBottom: 10,
    },
    cardHolder: {
        zIndex: 1,
        fontSize: 10,
        color: '#fff',
        opacity: 0.7,
        fontFamily: 'Lato-Bold'
    },
    cardName: {
        zIndex: 1,
        paddingTop:5,
        fontFamily: 'Lato-Bold',
        fontSize: 11,
        color: '#fff',
        textTransform: 'uppercase',
    },
    cardDate: {
        zIndex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Lato-Bold',

    },
    dateTitle: {
        zIndex: 1,
        fontSize: 10,
        color: '#fff',
        opacity: 0.7,
        marginRight: 5,
        fontFamily: 'Lato-Bold',

    },
    dateItem: {
        paddingTop:5,
        zIndex: 1,
        fontSize: 11,
        color: '#fff',
        fontFamily: 'Lato-Bold',

    },
    cvv: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'flex-end',
    },
    cvvTitle: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.7,
        marginBottom: 5,
    },
    cvvBand: {
        backgroundColor: '#fff',
        width: 100,
        height: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default PaymentCard;
