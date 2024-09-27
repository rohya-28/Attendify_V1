import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import ToggleButton from "@/components/ToggleButton";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, Image } from "react-native";
import { ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import authService from "@/api/authService";

const Sign_Up = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePic: "",
    phoneNo: "",
  });

  const [role, setRole] = useState<"student" | "admin">("student");

  const toggleRole = () => {
    setRole((prevRole) => (prevRole === "student" ? "admin" : "student"));
  };

  const onSignUpPress = async () => {
    console.log({ ...form, role });

    try {
      const formData = { ...form, role };
      const response = await authService.signUp(formData);
      console.log("Sign Up Successful:", response);
      // Handle success, e.g., navigate to another page or show a success message
    } catch (error) {
      console.error("Sign Up Failed:", error);
      // Handle error, e.g., show an error message to the user
    }
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

              <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5 ">
                Create Your Account
              </Text>
            </View>

            <View className="p-5">
              <InputField
                label="Name"
                placeholder="First Name"
                icon={icons.person}
                value={form.firstName}
                onChangeText={(value) => setForm({ ...form, firstName: value })}
              />
              <InputField
                label="Name"
                placeholder="Last Name"
                icon={icons.person}
                value={form.lastName}
                onChangeText={(value) => setForm({ ...form, lastName: value })}
              />
              <InputField
                label="Email"
                placeholder="Enter Email"
                icon={icons.email}
                value={form.email}
                onChangeText={(value) => setForm({ ...form, email: value })}
              />
              <InputField
                label="Profile Pic"
                placeholder="ProfilePic"
                icon={icons.person}
                value={form.profilePic}
                onChangeText={(value) =>
                  setForm({ ...form, profilePic: value })
                }
              />
              <InputField
                label="Phone No"
                placeholder="Enter Email"
                icon={icons.email}
                value={form.phoneNo}
                keyboardType="numeric"
                onChangeText={(value) => setForm({ ...form, phoneNo: value })}
              />
              <InputField
                label="Password"
                placeholder="Enter Password"
                icon={icons.lock}
                value={form.password}
                secureTextEntry={true}
                onChangeText={(value) => setForm({ ...form, password: value })}
              />
              <ToggleButton role={role} onToggle={toggleRole} />
              <CustomButton
                title="Sign Up"
                onPress={onSignUpPress}
                className="mt-4"
              />

              <Link
                href="/(auth)/sign-in"
                className="font-JakartaSemiBold text-[15px] text-general-200 mt-8 text-center"
              >
                <Text>Already have an Account? </Text>
                <Text className="text-primary-500">Log In</Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Sign_Up;