import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ToggleButtonProps {
  role: "STUDENT" | "ADMIN";
  label: string;
  onToggle: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  role,
  onToggle,
  label,
}) => {
  return (
    <View className="my-2 w-full">
      {/* Label */}
      <Text className="text-sm font-JakartaSemiBold mb-3">{label}</Text>

      {/* Toggle Button */}
      <View className="flex flex-row rounded-sm overflow-hidden border border-neutral-100">
        <TouchableOpacity
          className={`flex-1 p-[12px] items-center justify-center ${role === "STUDENT" ? "bg-primary-500 text-white" : "bg-neutral-100 text-black"}`}
          onPress={onToggle}
        >
          <Text
            className={`font-JakartaSemiBold text-sm ${role === "STUDENT" ? "text-white" : "text-black"}`}
          >
            Student
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 p-[12px] items-center justify-center ${role === "ADMIN" ? "bg-primary-500 text-white" : "bg-neutral-100 text-black"}`}
          onPress={onToggle}
        >
          <Text
            className={`font-JakartaSemiBold text-sm ${role === "ADMIN" ? "text-white" : "text-black"}`}
          >
            Admin
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToggleButton;
