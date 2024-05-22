import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import DatePicker from './DatePicker';  // Ensure DatePicker is imported correctly
import { BASE_URL } from './config';

const CalendarComponent = () => {
    const [markedDates, setMarkedDates] = useState({});

    const fetchReservations = () => {
        axios.get(`${BASE_URL}api/Reservation`)
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
        fetchReservations();
    }, []);

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

    return (
        <View>
            <Calendar
                markedDates={markedDates}
                markingType={'period'}
            />
            <DatePicker onReserve={handleReserve} />
        </View>
    );
};

export default CalendarComponent;
