import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, Image } from "react-native";
import { ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Sign_In = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSignInPress = async () => {
    console.log(form);
    // Add your sign-in logic here
  };

  return (
    <GestureHandlerRootView>
      <ScrollView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
          <View>
            <View className="relative w-full h-[250px]">
              <Image
                source={images.signUpCar} // Change to the appropriate image for sign-in
                className="z-0 w-full h-[250px]"
              />
              <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                Sign In to Your Account
              </Text>
            </View>

            <View className="p-5">
              <InputField
                label="Email"
                placeholder="Enter Email"
                icon={icons.email}
                value={form.email}
                onChangeText={(value) => setForm({ ...form, email: value })}
              />
              <InputField
                label="Password"
                placeholder="Enter Password"
                icon={icons.lock}
                value={form.password}
                secureTextEntry={true}
                onChangeText={(value) => setForm({ ...form, password: value })}
              />
              <CustomButton title="Sign In" onPress={onSignInPress} className="mt-4" />

              <Link href="/(auth)/collegeInfo" className="font-JakartaSemiBold text-[15px] text-general-200 mt-8 text-center">
                <Text>Don't have an Account? </Text>
                <Text className="text-primary-500">Sign Up</Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Sign_In;
