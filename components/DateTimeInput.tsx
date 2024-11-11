import React, { useState } from 'react'
import { View, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import CustomButton from './CustomButton'

const DateTimeInput = ({ setStartTime, setEndTime }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || startDate
    setShowStartPicker(false)
    setStartDate(currentDate)

    // Adjust the selected date to local time before passing it to the parent component
    const localStartTime = new Date(
      currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
    )
    setStartTime(localStartTime) // Update the start time in local time
  }

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || endDate
    setShowEndPicker(false)
    setEndDate(currentDate)

    // Adjust the selected date to local time before passing it to the parent component
    const localEndTime = new Date(
      currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
    )
    setEndTime(localEndTime) // Update the end time in local time
  }

  return (
    <View>
      <CustomButton
        className="rounded-md"
        title="Select Start Time"
        onPress={() => setShowStartPicker(true)}
      />
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="time"
          display="default"
          onChange={onChangeStart}
        />
      )}

      <CustomButton
        className="rounded-md mt-4"
        title="Select End Time"
        onPress={() => setShowEndPicker(true)}
      />
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="time"
          display="default"
          onChange={onChangeEnd}
        />
      )}
    </View>
  )
}

export default DateTimeInput
