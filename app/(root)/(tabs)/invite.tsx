import collegeService from "@/api/collegeService";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import useAuthStore from "@/store/useAuthStore";
import useLectureStore from "@/store/useLectureStore";
import React, { useEffect, useState } from "react";
import { Text, ScrollView, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { showCustomToast, toastConfig } from "@/components/Toast";
import Loader from "@/components/Loader";

interface SessionValues {
  teacherId: string;
  lectureId: string;
  isActive: true;
}

interface Lecture {
  _id: string;
  subject: string; // Add other properties of a lecture as needed
  startTime: string;
  endTime: string;
}

const Invite = () => {
  const [loading, setLoading] = useState(true);
  const setLectures = useLectureStore((state) => state.setLectures);
  const deleteLecture = useLectureStore((state) => state.deleteLecture);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState("");

  const fetchLecturesData = async () => {
    setLoading(true);
    setLoadingMessage("Refreshing..");
    try {
      const responseLecture = await collegeService.getLectureData();
      console.log(responseLecture);

      setLectures(responseLecture.lectures);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLecturesData();
  }, [setLectures]);

  const lectures = useLectureStore((state) => state.lectures);
  const role = useAuthStore((state) => state.role);

  const formatTime = (time: string) => {
    const utcDate = new Date(time); // Parse the time from the server (UTC)
    const localDate = new Date(
      utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
    ); // Convert to local time

    const hours = localDate.getHours() % 12 || 12; // Convert 24-hour to 12-hour format
    const minutes = localDate.getMinutes().toString().padStart(2, "0"); // Ensure two-digit minutes
    const ampm = localDate.getHours() >= 12 ? "PM" : "AM"; // Determine AM/PM

    return `${hours}:${minutes} ${ampm}`; // Return formatted string
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0"); // Get day with leading zero
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Get month with leading zero
    const year = d.getFullYear(); // Get full year
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (lecture: SessionValues) => {
    console.log("Submitting lecture:", lecture);
    setLoading(true);
    setLoadingMessage("Loading...");

    try {
      const response = await collegeService.createSession(lecture);
      console.log("Session Created Successful:", response);
    } catch (error: any) {
      if (error.response) {
        console.error("Error signing in:", error.response.data);
      } else {
        console.error("Sign In Failed:", error.message);
      }
    }
    setLoading(false);
    setLoadingMessage("Loading...");
  };

  const handleDeleteLecture = async (lectureId: string) => {
    setLoading(true);
    setLoadingMessage("Deleting...");

    try {
      const response = await collegeService.deleteLecture(lectureId);
      deleteLecture(lectureId);
      if (response) {
        console.log("Lecture Deleted Successfully:", response.message);
      } else {
        console.log("Failed to Delete Lecture:", response.message);
      }
    } catch (error: any) {
      if (error.response) {
        console.log("Error deleting lecture:", error.response.data);
      } else {
        console.log("Delete Lecture Failed:", error.message);
      }
    }
    setLoading(false);
    setLoadingMessage("Deleting...");
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5 ">
      <ScrollView contentContainerStyle={{ flexGrow: 1, position: "relative" }}>
        <View className="fixed flex flex-row justify-between items-center">
          <Text className="text-2xl font-JakartaBold ">Invite</Text>
          <TouchableOpacity
            onPress={fetchLecturesData}
            className="p-2 rounded-full bg-indigo-600"
          >
            <Image
              source={icons.refresh}
              tintColor="white"
              resizeMode="contain"
              className="w-8 h-8 rounded-full"
            />
          </TouchableOpacity>
        </View>
        <View className="w-100% h-auto mb-24 mt-2 flex justify-top items-center">
          {[...lectures].reverse().map((lecture, index) => (
            <View
              className="w-[95%] h-[230px] mx-auto mt-4 bg-indigo-600 shadow-lg rounded-lg"
              key={index}
            >
              <View className="mt-4 ml-2 flex flex-row items-center justify-between">
                <Text className="text-2xl leading-snug font-extralight text-gray-50 truncate mb-1 sm:mb-0">
                  {lecture.subject}
                </Text>
                <Text className="mr-4 leading-snug font-JakartaMedium text-gray-50">
                  {formatDate(lecture.startTime)}
                </Text>
              </View>
              <View className="mt-2 ml-2 w-full flex flex-row justify-between">
                <View>
                  <Text className="text-base leading-snug font-JakartaMedium text-gray-50 truncate mb-1 sm:mb-0">
                    Starting Time: {formatTime(lecture.startTime)}
                  </Text>
                  <Text className="text-base leading-snug font-JakartaMedium text-gray-50 truncate mb-1 sm:mb-0">
                    Ending Time: {formatTime(lecture.endTime)}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => handleDeleteLecture(lecture._id)}
                    className="p-2 rounded-full bg-[#EF4477] shadow-md mt-2"
                  >
                    <Image
                      source={icons.trash}
                      tintColor="white"
                      resizeMode="contain"
                      className="w-8 h-8 rounded-full  "
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="w-[100%] items-center mt-8">
                <CustomButton
                  title={role === "ADMIN" ? "Start Session" : "Mark Attendance"}
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
      <Loader isVisible={loading} message={loadingMessage} />
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

export default Invite;
