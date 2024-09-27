import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ToggleButtonProps {
  role: "student" | "admin";
  onToggle: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ role, onToggle }) => {
  return (
    <View className="my-2 w-full">
      {/* Label */}
      <Text className="text-sm font-JakartaSemiBold mb-3">Role</Text>

      {/* Toggle Button */}
      <View className="flex flex-row rounded-sm overflow-hidden border border-neutral-100">
        <TouchableOpacity
          className={`flex-1 p-[12px] items-center justify-center ${role === "student" ? "bg-primary-500 text-white" : "bg-neutral-100 text-black"}`}
          onPress={onToggle}
        >
          <Text
            className={`font-JakartaSemiBold text-sm ${role === "student" ? "text-white" : "text-black"}`}
          >
            Student
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 p-[12px] items-center justify-center ${role === "admin" ? "bg-primary-500 text-white" : "bg-neutral-100 text-black"}`}
          onPress={onToggle}
        >
          <Text
            className={`font-JakartaSemiBold text-sm ${role === "admin" ? "text-white" : "text-black"}`}
          >
            Admin
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToggleButton;
