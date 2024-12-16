import React, { useState } from "react";
import { View, Text, ScrollView, Button, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useUserStore from "@/store/useUserStore";
import useCurrentDateTime from "@/hooks/useUserDateTime";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import ToggleButton from "@/components/ToggleButton";
import * as Yup from "yup";
import { Formik } from "formik";
import useAuthStore from "@/store/useAuthStore";
import { deleteToken } from "@/store/asyncStore";
import { router } from "expo-router";
import axios from "axios";
import authService from "@/api/authService";
import collegeService from "@/api/collegeService";

export const inviteSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const Profile = () => {
  const { user } = useUserStore();
  const roleUser = useAuthStore((state) => state.role);

  const currentDateTime = useCurrentDateTime(); // Get current date and time
  const [role, setRole] = useState<"STUDENT" | "TEACHER">("STUDENT"); // Role state for toggling between student and admin

  // Function to toggle between roles
  const toggleRole = (newRole: "STUDENT" | "TEACHER") => {
    setRole(newRole);
  };

  // Function to handle form submission
  const submitInviteForm = async (values: { email: string }) => {
    try {
      const payload = {
        email: values.email,
        role,
        base_url_client: "http://localhost:2002/",
      };
      console.log("role", role);

      const response = await collegeService.inviteUser(payload);
      console.log("role", role);

      if (response.message === "User invited") {
        Alert.alert("Success", `Invite sent to ${values.email} as ${role}`);
      } else {
        Alert.alert("Error", `Unexpected response: ${response.status}`);
      }
    } catch (error: any) {
      if (error.response) {
        Alert.alert(
          "Error",
          error.response.data.message || "Something went wrong"
        );
      } else {
        Alert.alert("Error", "Unable to send invite. Please try again.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await deleteToken(); // Remove the token
      console.log("User successfully logged out.");

      router.push("/(auth)/sign-in");
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
        showsVerticalScrollIndicator={false}
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
                  {user.organizationId._id}
                </Text>
              </View>

              {/* organization name  */}
              <View className="py-3 flex-row justify-between">
                <Text className="text-sm font-medium text-gray-500">
                  Organization Name
                </Text>
                <Text className="text-sm text-gray-900">
                  {user.organizationName}
                </Text>
              </View>

              {/* role */}
              <View className="py-3 flex-row justify-between">
                <Text className="text-sm font-medium text-gray-500">Role</Text>
                <Text className="text-sm text-gray-900">{roleUser}</Text>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <View className="mt-6 flex-1 justify-end w-24"></View>
          <Button title="Log out" onPress={handleLogout} />

          {roleUser === "TEACHER" || roleUser === "ADMIN" ? (
            <>
              <View className="h-72 w-full mt-4 mb-32 border bg-[#F5F9FF] border-[#61A2FE] drop-shadow-2xl ">
                {/* Invite Form Section */}
                <View className="w-full h-full rounded-md flex-col justify-evenly items-center ">
                  <View className="h-full w-[94%] flex-col justify-around overflow-hidden">
                    {/* Role Toggle Button */}
                    <ToggleButton
                      label="Select Role"
                      role={role}
                      onToggle={toggleRole}
                      inviteScreen={true} // Pass prop to control toggling only for invite screen TODO: alert change later
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
                              title={`Send Invite as ${role === "STUDENT" ? "Student" : "Teacher"}`}
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
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
