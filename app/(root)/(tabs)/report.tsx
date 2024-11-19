import SummaryChart from "@/components/SummaryChart";
import { Text, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Report = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-auto">
          <View className="fixed">
            <Text className="text-2xl font-JakartaBold ">Report</Text>
          </View>
          <View className="w-[100%] flex justify-center items-center">
            <SummaryChart />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Report;
