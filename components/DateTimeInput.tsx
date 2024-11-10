import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

const DateTimeInput = () => {
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [formattedDate, setFormattedDate] = useState('')

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowPicker(false)
    setDate(currentDate)

    // Format the date to ISO string
    const isoDateString = currentDate.toISOString()
    setFormattedDate(isoDateString)
  }

  return (
    <View>
      <Button
        title="Select Date and Time"
        onPress={() => setShowPicker(true)}
      />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime" // Set mode to 'datetime' for both date and time
          is24Hour={true} // Use 24-hour format
          onChange={onChange}
        />
      )}
      {formattedDate ? (
        <Text>Selected Date & Time: {formattedDate}</Text>
      ) : (
        <Text>No date selected</Text>
      )}
    </View>
  )
}

export default DateTimeInput
