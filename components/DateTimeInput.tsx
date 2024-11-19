import React, { useState } from "react";
import { View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "./CustomButton";

const DateTimeInput = ({ setStartTime, setEndTime }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false);
    setStartDate(currentDate);

    // Adjust the selected date to local time before passing it to the parent component
    const localStartTime = new Date(
      currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
    );
    setStartTime(localStartTime); // Update the start time in local time
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false);
    setEndDate(currentDate);

    // Adjust the selected date to local time before passing it to the parent component
    const localEndTime = new Date(
      currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
    );
    setEndTime(localEndTime); // Update the end time in local time
  };

  // Helper function to format time in 12-hour format
  const formatTime12Hour = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 hours to 12
    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <View className="flex flex-row justify-between h-[150px]">
      {/* Start Time Picker */}
      <View className="flex flex-col justify-evenly items-center w-[50%]">
        <CustomButton
          className="rounded-md w-[90%] h-[50px]"
          title="Start Time"
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
        <View className="w-[100%] h-[70px] flex justify-center items-center">
          <View className="w-[95%] h-[100%] flex bg-indigo-600 rounded-xl justify-center items-center">
            <Text className="text-2xl text-white mb-2 font-JakartaLight">
              {formatTime12Hour(startDate)}
            </Text>
          </View>
        </View>
      </View>

      {/* End Time Picker */}
      <View className="flex flex-col justify-evenly items-center w-[50%]">
        <CustomButton
          className="rounded-md w-[90%] h-[50px]"
          title="End Time"
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
        <View className="w-[100%] h-[70px] flex justify-center items-center">
          <View className="w-[95%] h-[100%] flex bg-indigo-600 rounded-xl justify-center items-center">
            <Text className="text-2xl text-white mb-2 font-JakartaLight">
              {formatTime12Hour(endDate)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DateTimeInput;
