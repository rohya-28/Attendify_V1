import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import DateTimeInput from "@/components/DateTimeInput";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { View, Text, Image } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import collegeService from "@/api/collegeService";
import useLectureStore from "@/store/useLectureStore";
import Loader from "@/components/Loader";
import Toast from "react-native-toast-message";
import { showCustomToast, toastConfig } from "@/components/Toast";

const Home = () => {
  const role = useAuthStore((state) => state.role);
  const setUser = useUserStore((state) => state.setUser);
  const setLectures = useLectureStore((state) => state.setLectures);

  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [attendanceCode, setAttendanceCode] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState("");

  // Fetch user and lecture data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setLoadingMessage("Loading Data...");
      try {
        const response = await collegeService.getUserData();
        setUser(response.user); // Store user data in Zustand
        const responseLecture = await collegeService.getLectureData();

        setLectures(responseLecture.lectures);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setUser]);

  const handleSubmit = async () => {
    setLoading(true);
    setLoadingMessage("Creating Lecture...");
    let dayOfWeek = "";
    if (startTime) {
      const date = new Date(startTime);
      dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
    }

    const teacherId = useAuthStore.getState().userId;

    // Convert to UTC string (ISO format)
    const startTimeUTC = startTime ? new Date(startTime).toISOString() : "";
    const endTimeUTC = endTime ? new Date(endTime).toISOString() : "";

    const lectureData = {
      teacherId,
      subject,
      startTime: startTimeUTC, // Use UTC time
      endTime: endTimeUTC, // Use UTC time
      dayOfWeek,
    };

    if (role === "STUDENT") {
      console.log("Student Data Submitted:", {
        attendanceCode,
        startTime: startTimeUTC,
        endTime: endTimeUTC,
      });
    } else if (role === "ADMIN") {
      try {
        const response = await collegeService.createLecture(lectureData);

        if (response && response.Success) {
          console.log("Lecture Created:", response);
          showCustomToast("success", response.message); // Use the message from the response
        } else {
          console.log(
            "Error creating lecture:",
            response.message || "Unexpected error"
          );
          showCustomToast(
            "error",
            response.message || "Failed to create lecture"
          );
        }
      } catch (error: any) {
        console.log(
          "Error creating lecture:",
          error.response?.data || error.message
        );
        showCustomToast("error", error.message || "Failed to create lecture");
      }
    }
    setLoading(false);
  };

  const { user } = useUserStore();

  return (
    <GestureHandlerRootView>
      <ScrollView>
        <SafeAreaView className="w-full h-full justify-center items-center bg-white">
          <View className="h-auto w-[95%]">
            <View className="mt-2">
              <View className="rounded-full h-14 w-14 justify-center items-center">
                <Image
                  source={icons.profile}
                  resizeMode="contain"
                  className="w-10 h-10 rounded-full"
                />
              </View>
              <View className="mt-6 shadow-lg">
                <Text className="text-2xl font-JakartaLight text-slate-700">
                  Hello,
                </Text>
                <Text className="text-2xl font-JakartaSemiBold text-blue-600 capitalize">
                  {user?.firstName} {user?.lastName}
                </Text>
              </View>
            </View>

            <View className="mt-4 h-24 w-full flex-row justify-evenly items-center overflow-hidden shadow-md shadow-neutral-400/700">
              <View className="h-full w-[47%] flex justify-start items-center rounded-2xl bg-[#F5F9FF] border border-[#61A2FE] drop-shadow-2xl">
                <Text className="text-lg text-[#61A2FE] text-center font-JakartaSemiBold">
                  Total Lecture
                </Text>
                <Text className="mt-2 text-2xl text-[#61A2FE] text-center font-JakartaSemiBold">
                  20
                </Text>
              </View>
              <View className="h-full w-[47%] flex justify-start items-center rounded-2xl bg-[#F5FCFB] border border-[#30BEB6] drop-shadow-2xl">
                <Text className="text-lg text-[#30BEB6] text-center font-JakartaSemiBold">
                  Attended Lecture
                </Text>
                <Text className="mt-2 text-2xl text-[#30BEB6] text-center font-JakartaSemiBold">
                  30
                </Text>
              </View>
            </View>

            {role === "STUDENT" ? (
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
              <View className="mt-4 h-[380px] w-full rounded-xl mx-auto mt-4 bg-[#FFFFFF] shadow-lg rounded-lg mb-40 flex-col items-center">
                <View className="h-[90%] w-[95%]  flex-col  justify-evenly overflow-hidden">
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
                    className="rounded-lg mt-2 shadow-none"
                    bgVariant="secondary"
                  />
                </View>
              </View>
            )}
          </View>

          <Toast config={toastConfig} />
        </SafeAreaView>
      </ScrollView>
      <Loader isVisible={loading} message={loadingMessage} />
    </GestureHandlerRootView>
  );
};

export default Home;
