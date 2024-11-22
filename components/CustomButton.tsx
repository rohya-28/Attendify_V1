import { ButtonProps } from "@/types/type";
import { TouchableOpacity, Text } from "react-native";

const getBgVariantStyle = (
  variant: ButtonProps["bgVariant"],
  disabled: boolean
) => {
  if (disabled) return "bg-gray-300"; // Disabled background
  switch (variant) {
    case "secondary":
      return "bg-indigo-600";
    case "danger":
      return "bg-white";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286ff]";
  }
};

const getTextVariantStyle = (
  variant: ButtonProps["textVariant"],
  disabled: boolean
) => {
  if (disabled) return "text-gray-100"; // Disabled text color
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-indigo-600";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  width = "w-full",
  disabled = false,
  ...props
}: ButtonProps & { disabled?: boolean }) => {
  return (
    <TouchableOpacity
      onPress={!disabled ? onPress : undefined} // Prevent onPress if disabled
      className={`${width} rounded-full flex flex-row p-[12px] justify-center items-center shadow-md shadow-neutral-400/700 ${getBgVariantStyle(
        bgVariant,
        disabled
      )} ${className} ${disabled ? "opacity-50" : ""}`} // Add opacity for disabled state
      disabled={disabled}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={`text-lg font-bold ${getTextVariantStyle(
          textVariant,
          disabled
        )}`}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
