import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ToggleButtonProps {
  role: "STUDENT" | "ADMIN";
  label: string;
  onToggle: (newRole: "STUDENT" | "ADMIN") => void;
  isDisabled?: boolean; // Prop to control toggling
  inviteScreen?: boolean; // Prop to control toggling
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  role,
  label,
  onToggle,
  isDisabled = false, // Default value
  inviteScreen = false, // Default value
}) => {
  return (
    <View className="my-2 w-full">
      {/* Label */}
      <Text className="text-sm font-JakartaSemiBold mb-3">{label}</Text>

      {/* Toggle Button */}
      <View className="flex flex-row rounded-sm overflow-hidden border border-neutral-100">
        {/* Student Button */}
        <TouchableOpacity
          className={`flex-1 p-[12px] items-center justify-center ${
            role === "STUDENT" ? "bg-primary-500" : "bg-neutral-100"
          } ${isDisabled ? "opacity-50" : ""}`} // Adjust opacity when disabled
          onPress={() => !isDisabled && onToggle("STUDENT")} // Prevent toggle if disabled
          disabled={isDisabled} // Disable interaction
        >
          <Text
            className={`font-JakartaSemiBold text-sm ${
              role === "STUDENT" ? "text-white" : "text-black"
            }`}
          >
            Student
          </Text>
        </TouchableOpacity>

        {/* Admin Button */}
        <TouchableOpacity
          className={`flex-1 p-[12px] items-center justify-center ${
            role === "ADMIN" ? "bg-primary-500" : "bg-neutral-100"
          } ${isDisabled ? "opacity-50" : ""}`} // Adjust opacity when disabled
          onPress={() => !isDisabled && onToggle("ADMIN")} // Prevent toggle if disabled
          disabled={isDisabled} // Disable interaction
        >
          <Text
            className={`font-JakartaSemiBold text-sm ${
              role === "ADMIN" ? "text-white" : "text-black"
            }`}
          >
            {inviteScreen ? "Teacher" : "Admin"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToggleButton;
