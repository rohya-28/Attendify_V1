import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { useState } from "react";
import { View, Text, Image } from "react-native";
import { ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CollegeInfo = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const onSignUpPress = async () => {
    console.log(form);
    // Add your sign-up logic here
  };

  return (
    <GestureHandlerRootView>
      <ScrollView className="flex-1 bg-white ">
        <View className="flex-1 bg-white">
          <View>
            <View className="relative w-full h-[250px]">
              <Image
                source={images.signUpCar}
                className="z-0 w-full h-[250px]"
              />
              <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                Register Your College
              </Text>
            </View>

            <View className="p-5">
              <InputField
                label="College Name"
                placeholder="Enter College Name"
                icon={icons.person}
                value={form.name}
                onChangeText={(value) => setForm({ ...form, name: value })}
              />
              <InputField
                label="Address"
                placeholder="Enter Address"
                icon={icons.home}
                value={form.address}
                onChangeText={(value) => setForm({ ...form, address: value })}
              />
              <InputField
                label="Latitude"
                placeholder="Enter Latitude"
                icon={icons.map}
                value={form.latitude}
                keyboardType="numeric"
                onChangeText={(value) => setForm({ ...form, latitude: value })}
              />
              <InputField
                label="Longitude"
                placeholder="Enter Longitude"
                icon={icons.map}
                value={form.longitude}
                keyboardType="numeric"
                onChangeText={(value) => setForm({ ...form, longitude: value })}
              />
              <CustomButton
                title="Sign Up"
                onPress={onSignUpPress}
                className="mt-4"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default CollegeInfo;
