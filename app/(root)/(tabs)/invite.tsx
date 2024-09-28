import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";

const Invite = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update the current date and time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text className="text-2xl font-JakartaBold">Invite</Text>

        {/* Display the current date and time in real-time */}
        <View className="mt-4">
          <Text className="text-lg">Current Date & Time:</Text>
          <Text>
            {`Date: ${currentDateTime.toLocaleDateString()} | Time: ${currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Invite;
