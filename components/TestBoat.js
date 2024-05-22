import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const MyCalendar = () => {
  const [showCalendarBegin, setShowCalendarBegin] = useState(false);
  const [showCalendarEnd, setShowCalendarEnd] = useState(false);
  const [selectedDateBegin, setSelectedDateBegin] = useState('');
  const [selectedDateEnd, setSelectedDateEnd] = useState('');

  const handleDatePressBegin = () => {
    setShowCalendarBegin(true);
  };

  const handleDatePressEnd = () => {
    setShowCalendarEnd(true);
  };

  const handleDayPressBegin = (day) => {
    setSelectedDateBegin(day.dateString);
    setShowCalendarBegin(false);
  };

  const handleDayPressEnd = (day) => {
    setSelectedDateEnd(day.dateString);
    setShowCalendarEnd(false);
  };

  return (
    <View style={{ paddingTop: 90 }}>
      <TouchableOpacity style={styles.input} onPress={handleDatePressBegin}>
        <Text>{selectedDateBegin || 'Select Begin Date'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input} onPress={handleDatePressEnd}>
        <Text>{selectedDateEnd || 'Select End Date'}</Text>
      </TouchableOpacity>

      {showCalendarBegin && (
        <Calendar
          // Set initial date
          current={'2024-04-29'}
          // Handler which gets executed on day press
          onDayPress={handleDayPressBegin}
        />
      )}

      {showCalendarEnd && (
        <Calendar
          // Set initial date
          current={'2024-04-29'}
          // Handler which gets executed on day press
          onDayPress={handleDayPressEnd}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
  },
});

export default MyCalendar;
