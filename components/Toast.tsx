import Toast from "react-native-toast-message";

// Directly show toast from the component
const showCustomToast = (
  type: "success" | "error" | "info",
  message: string
) => {
  Toast.show({
    type: type, // 'success', 'error', or 'info'
    position: "top", // Positioning the toast at the top
    text1: message, // The main message
    visibilityTime: 4000, // Duration of the toast
    autoHide: true, // Automatically hide after visibilityTime
    topOffset: 50, // Adjust this value to control the space from the top of the screen
  });
};

export { showCustomToast };
