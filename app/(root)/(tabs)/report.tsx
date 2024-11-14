import collegeService from '@/api/collegeService'
import CustomButton from '@/components/CustomButton'
import useAuthStore from '@/store/useAuthStore'
import useLectureStore from '@/store/useLectureStore'
import { Text, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface SessionValues {
  teacherId: string
  lectureId: string
  isActive: true
}

const Report = () => {
  const lectures = useLectureStore((state) => state.lectures)
  const role = useAuthStore((state) => state.role)

  const formatTime = (time: string) => {
    const date = new Date(time)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    const day = d.getDate().toString().padStart(2, '0') // Get day with leading zero
    const month = (d.getMonth() + 1).toString().padStart(2, '0') // Get month with leading zero
    const year = d.getFullYear() // Get full year
    return `${day}/${month}/${year}`
  }

  const handleSubmit = async (lecture: SessionValues) => {
    console.log('Submitting lecture:', lecture)

    try {
      const response = await collegeService.createSession(lecture)
      console.log('Session Created Successful:', response)
    } catch (error: any) {
      if (error.response) {
        console.error('Error signing in:', error.response.data)
      } else {
        console.error('Sign In Failed:', error.message)
      }
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="fixed">
          <Text className="text-2xl font-JakartaBold ">Report</Text>
        </View>
        <View className="w-100% h-auto mb-24 flex justify-top items-center">
          {lectures.map((lecture, index) => (
            <View
              className="w-[95%] h-[230px] mx-auto mt-4 bg-indigo-600 shadow-lg rounded-lg"
              key={index}
            >
              <View className="mt-4 ml-2 flex flex-row items-center justify-between">
                <Text className="text-2xl leading-snug font-JakartaExtraBold text-gray-50 truncate mb-1 sm:mb-0">
                  {lecture.subject}
                </Text>
                <Text className="mr-4  leading-snug font-JakartaMedium text-gray-50">
                  {' '}
                  {formatDate(lecture.startTime)}
                </Text>
              </View>
              <View className="mt-2 ml-2">
                <Text className="text-base leading-snug font-JakartaMedium text-gray-50 truncate mb-1 sm:mb-0">
                  Starting Time : {formatTime(lecture.startTime)}
                </Text>
                <Text className="text-base leading-snug font-JakartaMedium text-gray-50 truncate mb-1 sm:mb-0">
                  Ending Time : {formatTime(lecture.endTime)}
                </Text>
              </View>
              <View className="w-[100%] items-center mt-8">
                <CustomButton
                  title={role === 'ADMIN' ? 'Start Session' : 'Mark Attendence'}
                  className="w-[95%] rounded-lg"
                  bgVariant="danger"
                  textVariant="secondary"
                  onPress={() =>
                    handleSubmit({
                      teacherId: lecture.teacherId,
                      lectureId: lecture._id,
                      isActive: true,
                    })
                  }
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Report
