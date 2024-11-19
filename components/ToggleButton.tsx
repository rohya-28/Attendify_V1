import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ToggleButtonProps {
  role?: "STUDENT" | "ADMIN"; // Make role optional
  label: React.ReactNode; // Allow any valid React node as the label (string, JSX, etc.)
  labelOne?: string; // Dynamic label for the "STUDENT" button
  labelTwo?: string; // Dynamic label for the "ADMIN" button
  onToggle: (role: "STUDENT" | "ADMIN") => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  role = "STUDENT", // Default value is "STUDENT"
  onToggle,
  label,
  labelOne = "Student", // Default value for student button label
  labelTwo = "Admin", // Default value for admin button label
}) => {
  const [currentRole, setCurrentRole] = useState<"STUDENT" | "ADMIN">(role);

  useEffect(() => {
    if (role) {
      setCurrentRole(role); // Update state if role prop changes
    }
  }, [role]);

  const handleToggle = (newRole: "STUDENT" | "ADMIN") => {
    setCurrentRole(newRole); // Update the state to the selected role
    onToggle(newRole); // Call the onToggle prop to notify parent component
  };

  return (
    <View className="my-2 w-full">
      {/* Label (Dynamic content wrapped in Text component) */}
      <Text className="text-sm font-JakartaSemiBold mb-3">{label}</Text>

      {/* Toggle Button */}
      <View className="flex flex-row rounded-sm overflow-hidden border border-neutral-100">
        <TouchableOpacity
          className={`flex-1 p-[12px] items-center justify-center ${currentRole === "STUDENT" ? "bg-primary-500 text-white" : "bg-neutral-100 text-black"}`}
          onPress={() => handleToggle("STUDENT")}
        >
          <Text
            className={`font-JakartaSemiBold text-sm ${currentRole === "STUDENT" ? "text-white" : "text-black"}`}
          >
            {labelOne} {/* Dynamic student button label */}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 p-[12px] items-center justify-center ${currentRole === "ADMIN" ? "bg-primary-500 text-white" : "bg-neutral-100 text-black"}`}
          onPress={() => handleToggle("ADMIN")}
        >
          <Text
            className={`font-JakartaSemiBold text-sm ${currentRole === "ADMIN" ? "text-white" : "text-black"}`}
          >
            {labelTwo} {/* Dynamic admin button label */}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToggleButton;
