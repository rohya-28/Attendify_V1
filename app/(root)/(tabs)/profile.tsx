// pages/Profile.tsx
import React from "react";
import { View, Text, ScrollView, Alert, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useUserStore from "@/store/useUserStore";

const Profile = () => {
  const { user } = useUserStore(); // Get user data from the store

  if (!user) {
    return <Text>No user data found</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text className="text-2xl font-JakartaBold">Profile</Text>
        <View className="mt-6">
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

              <View className="py-3 flex-row justify-between">
                <Text className="text-sm font-medium text-gray-500">
                  Organization Role
                </Text>
                <Text className="text-sm text-gray-900">{user.role}</Text>
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
            <Button
              title="Log out"
              onPress={() => Alert.alert("Simple Button pressed")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
