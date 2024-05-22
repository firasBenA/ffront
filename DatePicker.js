import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { BASE_URL } from './config';

const DatePicker = ({ onReserve }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    const onChangeStart = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStart(false);
        setStartDate(currentDate);
    };

    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEnd(false);
        setEndDate(currentDate);
    };

    const reserve = () => {
        axios.post(`${BASE_URL}api/Reservation`, {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        }).then(response => {
            Alert.alert('Reservation Successful');
            onReserve(startDate, endDate);
        }).catch(error => {
            Alert.alert('Reservation Failed', error.response ? error.response.data : 'An error occurred');
            console.log('Reservation Failed', error.response ? error.response.data : error.message);
        });
    };

    return (
        <View>
            <Button onPress={() => setShowStart(true)} title="Pick Start Date" />
            {showStart && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={onChangeStart}
                />
            )}
            <Button onPress={() => setShowEnd(true)} title="Pick End Date" />
            {showEnd && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={onChangeEnd}
                />
            )}
            <Button onPress={reserve} title="Reserve" />
        </View>
    );
};

export default DatePicker;
