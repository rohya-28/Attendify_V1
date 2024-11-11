import React, { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import DateTimeInput from '@/components/DateTimeInput'
import InputField from '@/components/InputField'
import { icons } from '@/constants'
import useAuthStore from '@/store/useAuthStore'
import { View, Text, Image } from 'react-native'
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import collegeService from '@/api/collegeService'
import { LectureData } from '@/types/type'

const Home = () => {
  const role = useAuthStore((state) => state.role)
  const [startTime, setStartTime] = useState<Date | null>(null) // State for start time
  const [endTime, setEndTime] = useState<Date | null>(null) // State for end time
  const [attendanceCode, setAttendanceCode] = useState('') // State for student attendance code
  const [subject, setSubject] = useState('') // State for admin subject name

  // Submit handler
  const handleSubmit = async () => {
    // Ensure startTime is a valid date and calculate dayOfWeek
    let dayOfWeek = ''
    if (startTime) {
      const date = new Date(startTime) // Convert startTime to Date object
      // Adjust the timezone by setting to local time and extracting day
      dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' }) // Get the weekday name (e.g., Monday, Tuesday, etc.)
    }

    const teacherId = useAuthStore.getState().userId

    const data = {
      teacherId,
      subject,
      startTime: startTime ? startTime.toISOString() : '',
      endTime: endTime ? endTime.toISOString() : '',
      dayOfWeek, // Add the dayOfWeek field to the data object
    }

    if (role === 'STUDENT') {
      // Log data for student role (attendance code)
      console.log('Student Data Submitted:', {
        attendanceCode,
        startTime: startTime ? startTime.toISOString() : '',
        endTime: endTime ? endTime.toISOString() : '',
      })
    } else if (role === 'ADMIN') {
      console.log(data)
      // Log data for admin role (lecture creation)
      console.log('Admin Data Submitted:', data)

      // Send data to the backend API using axios
      try {
        const response = await collegeService.createLecture(data) // Using axios service

        if (response.success) {
          console.log('Lecture Created:', response.data)
        } else {
          console.error('Error creating lecture:', response.message)
        }
      } catch (error: any) {
        console.error(
          'Error creating lecture:',
          error.response?.data || error.message
        )
      }
    }
  }

  return (
    <GestureHandlerRootView>
      <ScrollView>
        <SafeAreaView className="w-full h-full justify-center items-center bg-white">
          <View className="h-full w-[95%]">
            {/* Heading Section */}
            <View className="mt-2">
              <View className="bg-[#0C0C0C] rounded-full h-12 w-12 justify-center items-center">
                <Image
                  source={icons.profile}
                  tintColor="white"
                  resizeMode="contain"
                  className="w-10 h-10"
                />
              </View>
              <View className="mt-6 shadow-lg">
                <Text className="text-2xl font-JakartaLight text-slate-700">
                  Hello,
                </Text>
                <Text className="text-2xl font-JakartaSemiBold text-blue-600">
                  Max Steel
                </Text>
              </View>
            </View>

            <View className="mt-4  h-24  w-full    flex-row justify-evenly items-center overflow-hidden shadow-md shadow-neutral-400/700 ">
              <View className="h-full w-[47%] flex justify-start items-center rounded-2xl bg-[#F5F9FF] border border-[#61A2FE] drop-shadow-2xl">
                <Text className="text-lg text-[#61A2FE] text-center font-JakartaSemiBold ">
                  Total Lecture
                </Text>
                <Text className="mt-2 text-2xl text-[#61A2FE] text-center font-JakartaSemiBold ">
                  20
                </Text>
              </View>
              <View className="h-full w-[47%] flex justify-start items-center rounded-2xl bg-[#F5FCFB] border border-[#30BEB6] drop-shadow-2xl">
                <Text className="text-lg text-[#30BEB6] text-center font-JakartaSemiBold ">
                  Attended Lecture
                </Text>
                <Text className="mt-2 text-2xl text-[#30BEB6] text-center font-JakartaSemiBold ">
                  30
                </Text>
              </View>
            </View>

            {/* Role-based Form Section */}
            {role === 'student' ? (
              <View className="mt-4 h-48 w-full rounded-md flex-col justify-between items-center border">
                <InputField
                  label="Enter Attendance Code"
                  placeholder="Enter code"
                  icon={icons.person}
                  value={attendanceCode}
                  onChangeText={setAttendanceCode}
                  className="w-full h-full"
                />
                <CustomButton
                  title="Submit"
                  onPress={handleSubmit}
                  className="rounded-md mt-4"
                />
              </View>
            ) : (
              <View className="mt-4 h-[550px] w-full flex-col items-center border border-yellow-500">
                <View className="h-[80%] w-[100%] rounded-xl flex-col bg-[#F4F4FB] justify-around overflow-hidden">
                  <InputField
                    label="Subject Name"
                    placeholder="Enter Subject Name"
                    icon={icons.person}
                    value={subject}
                    onChangeText={setSubject}
                    className="w-full h-full"
                    containerStyle="bg-white"
                  />
                  <DateTimeInput
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                  />
                  <CustomButton
                    title="Submit"
                    onPress={handleSubmit}
                    className="rounded-md mt-4"
                  />
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default Home
