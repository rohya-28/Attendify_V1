// pages/Profile.tsx
import React from "react";
import { View, Text, ScrollView, Alert, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useUserStore from "@/store/useUserStore";
import useCurrentDateTime from "@/hooks/useUserDateTime";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { useState } from "react";
import ToggleButton from "@/components/ToggleButton";
import * as Yup from "yup";
import { Formik } from "formik";
import useAuthStore from "@/store/useAuthStore";
import { LinearGradient } from "expo-linear-gradient";
import { deleteToken } from "@/store/asyncStore";
import { router } from "expo-router";

export const inviteSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const Profile = () => {
  const { user } = useUserStore();
  const roleUser = useAuthStore((state) => state.role);

  const currentDateTime = useCurrentDateTime(); // Get current date and time
  const [role, setRole] = useState<"STUDENT" | "ADMIN">("STUDENT"); // Role state for toggling between student and admin

  // Function to toggle between roles
  const toggleRole = () => {
    setRole((prevRole) => (prevRole === "STUDENT" ? "ADMIN" : "STUDENT"));
  };

  // Function to handle form submission
  const submitInviteForm = (values: { email: string }) => {
    console.log(`Inviting ${values.email} as a ${role}`);
    // Add further logic to handle the invitation process here
  };

  const handleLogout = async () => {
    try {
      await deleteToken(); // Remove the token
      console.log("User successfully logged out.");

      router.push("/(auth)/sign-in");

      // Optionally navigate to the Welcome or Login screen
      // Example: navigation.replace("Welcome");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!user) {
    return <Text>No user data found</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false} // Hide vertical scrollbar
        showsHorizontalScrollIndicator={false}
      >
        <Text className="text-2xl font-JakartaBold">Profile</Text>
        <View className="mt-6 h-auto">
          <View className="bg-white overflow-hidden shadow rounded-lg border">
            {/* Header */}
            <View className="px-4 py-5">
              <Text className="text-lg leading-6 font-medium text-gray-900">
                User Details
              </Text>
              <Text className="mt-1 max-w-2xl text-sm text-gray-500">
                This is some information about the user.
              </Text>
            </View>

            {/* User Info Section */}
            <View className="border-t border-gray-200 px-4 py-5">
              {/* Full Name */}
              <View className="py-3 flex-row justify-between">
                <Text className="text-sm font-medium text-gray-500">
                  Full name
                </Text>
                <Text className="text-sm text-gray-900">{`${user.firstName} ${user.lastName}`}</Text>
              </View>
              {/* Email */}
              <View className="py-3 flex-row justify-between">
                <Text className="text-sm font-medium text-gray-500">
                  Email address
                </Text>
                <Text className="text-sm text-gray-900">{user.email}</Text>
              </View>
              {/* Phone Number */}
              <View className="py-3 flex-row justify-between">
                <Text className="text-sm font-medium text-gray-500">
                  Phone number
                </Text>
                <Text className="text-sm text-gray-900">
                  {user.phoneNumber}
                </Text>
              </View>
              {/* Organization ID */}
              <View className="py-3 flex-row justify-between">
                <Text className="text-sm font-medium text-gray-500">
                  Organization ID
                </Text>
                <Text className="text-sm text-gray-900">
                  {user.organizationId}
                </Text>
              </View>
            </View>
          </View>

          {/* logout button */}
          <View className="mt-6 flex-1 justify-end w-24">
            {/* <Button
              title="Logout"
              onPress={() => {
                // Call the logout function
                // This will clear the user data from the store and navigate to the login screen
                logout();
              }}
            /> */}
            <Button title="Log out" onPress={handleLogout} />
          </View>

          {roleUser === "ADMIN" ? (
            <>
              <View className="h-72 w-full mt-4 border bg-[#F5F9FF] border-[#61A2FE] drop-shadow-2xl ">
                {/* Invite Form Section */}
                <View className="w-full h-full rounded-md flex-col justify-evenly items-center ">
                  <View className="h-full w-[94%] flex-col justify-around overflow-hidden">
                    {/* Role Toggle Button */}
                    <ToggleButton
                      label="Select Role"
                      role={role}
                      onToggle={toggleRole}
                    />

                    {/* Formik Form for Email Input */}
                    <Formik
                      initialValues={{ email: "" }}
                      validationSchema={inviteSchema}
                      onSubmit={submitInviteForm}
                    >
                      {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                      }) => (
                        <>
                          {/* Email Input */}
                          <View className="h-[20%] mt-4">
                            <Text className="ml-4 text-lg text-[#0C0C0C] font-JakartaSemiBold">
                              Enter Email
                            </Text>
                          </View>
                          <View className="h-[30%] w-[94%] ml-3">
                            <InputField
                              label=""
                              placeholder="Enter Email"
                              icon={icons.email}
                              value={values.email}
                              onChangeText={handleChange("email")}
                              onBlur={handleBlur("email")}
                              containerStyle="bg-white"
                              error={
                                touched.email && errors.email
                                  ? errors.email
                                  : undefined
                              }
                            />
                          </View>

                          {/* Submit Button */}
                          <View className="h-[30%] w-[94%] ml-3 flex flex-col justify-center">
                            <CustomButton
                              title={`Send Invite as ${role}`}
                              className="rounded-md"
                              onPress={handleSubmit as any}
                            />
                          </View>
                        </>
                      )}
                    </Formik>
                  </View>
                </View>
              </View>
            </>
          ) : (
            " "
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
function removeToken() {
  throw new Error("Function not implemented.");
}
