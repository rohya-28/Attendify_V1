import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { View, Text, Image } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const submitCode = async () => {
  console.log("hi"); // Log the form data for debugging
};

const Home = () => {
  return (
    <GestureHandlerRootView>
      <ScrollView>
        <SafeAreaView className="w-full h-full justify-center items-center border border-yellow-500 bg-white">
          <View className="h-full w-[95%] ">
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
            {/* Mandatory Section */}
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
            {/* Student Section */}
            <View className="mt-4 h-48 w-full rounded-md flex-col justify-between items-center border">
              <View className="h-full w-[94%]  flex-col justify-around  overflow-hidden  ">
                <View className="h-[15%] ">
                  <Text className="ml-4 text-lg text-[#0C0C0C]  font-JakartaSemiBold ">
                    Enter Attendance Code
                  </Text>
                </View>
                <View className="h-[30%] w-[94%] ml-3 ">
                  <InputField
                    label=""
                    placeholder="Enter  code"
                    icon={icons.person}
                    value=""
                    onChangeText={submitCode}
                    className="w-full h-full"
                  />
                </View>
                <View className="h-[30%] w-[94%] ml-3  flex flex-col justify-center">
                  <CustomButton title="Submit" className="rounded-md" />
                </View>
              </View>
            </View>
            {/* Teacher Section */}
            <View className="mt-4 h-96 w-full  flex-col  items-center ">
              <View className="h-[70%] w-[100%] rounded-xl flex-col   bg-[#F4F4FB] justify-around   overflow-hidden  ">
                <View className="h-[15%]  ">
                  <Text className="ml-3 mt-2 text-xl text-[#0C0C0C]  font-JakartaSemiBold ">
                    Create a lecture
                  </Text>
                </View>
                <View className="h-[40%] w-[94%] ml-3">
                  <InputField
                    label="Subject Name"
                    placeholder="Enter  Subject Name"
                    icon={icons.person}
                    value=""
                    onChangeText={submitCode}
                    className="w-full h-full"
                    containerStyle="bg-white"
                  />
                </View>
                <View className="h-[35%]  w-[94%] ml-3 mb-4  flex flex-col justify-start">
                  <CustomButton title="Submit" className="rounded-md" />
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Home;
