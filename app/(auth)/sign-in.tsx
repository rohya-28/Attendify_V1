import { Link, useRouter } from "expo-router"; // Ensure to import useRouter correctly
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { View, Text, Image, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as Yup from "yup";
import authService from "@/api/authService";
import useAuthStore from "@/store/useAuthStore";
import { jwtDecode } from "jwt-decode";
import Toast from "react-native-toast-message";
import { showCustomToast, toastConfig } from "@/components/Toast";
import { useState } from "react";
import Loader from "@/components/Loader"; // Import the Loader
import { getToken, storeToken } from "@/store/asyncStore";

// Define the type for form values
interface SignInFormValues {
  email: string;
  password: string;
}

// Validation schema for Sign In
const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Sign_In = () => {
  const router = useRouter(); // Initialize the router
  const setToken = useAuthStore((state) => state.setToken);
  const setRole = useAuthStore((state) => state.setRole);
  const setUserId = useAuthStore((state) => state.setUserId);
  const setOrganizationId = useAuthStore((state) => state.setOrganizationId);

  const [loading, setLoading] = useState(false);

  const onSignInPress = async (values: SignInFormValues) => {
    setLoading(true);
    try {
      const response = await authService.signIn(values);
      console.log("Sign In Successful:", response);
      const _accessToken = response.accessToken;

      // Decode the token to get user info
      const decoded = jwtDecode<DecodedToken>(_accessToken);

      // Set token and user details in the store
      setToken(_accessToken); // This will also set role, userId, and organizationId
      await storeToken(_accessToken);
      setRole(decoded.role); // Optionally set role
      setUserId(decoded.sub); // Optionally set user ID

      setOrganizationId(decoded.organizationId); // Optionally set organization ID
      showCustomToast("success", "successful sign-in");
      // Redirect to home page after successful sign-in
      router.push("/home"); // Change '/home' to your actual home route
    } catch (error: any) {
      // If the error is from the API response, show an error toast
      if (error.response) {
        showCustomToast(
          "error",
          error.response.data.message || "Sign In Failed"
        );
      } else {
        // If the error is from another source (e.g., network issues), show a generic error toast
        showCustomToast("error", "An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Hide the loader
    }
  };

  return (
    <GestureHandlerRootView>
      <ScrollView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
          <View>
            <View className="relative w-full h-[250px]">
              <Image
                source={images.signUpbg} // Change to the appropriate image for sign-in
                className="z-0 w-full h-[250px]"
              />
              <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                Sign In to Your Account
              </Text>
            </View>

            <Formik<SignInFormValues>
              initialValues={{ email: "", password: "" }}
              validationSchema={signInSchema}
              onSubmit={onSignInPress}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View className="p-5">
                  <InputField
                    label="Email"
                    placeholder="Enter Email"
                    icon={icons.email}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    error={
                      touched.email && errors.email ? errors.email : undefined
                    }
                  />

                  <InputField
                    label="Password"
                    placeholder="Enter Password"
                    icon={icons.lock}
                    value={values.password}
                    secureTextEntry={true}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    error={
                      touched.password && errors.password
                        ? errors.password
                        : undefined
                    }
                  />

                  <CustomButton
                    title="Sign In"
                    onPress={handleSubmit}
                    className="mt-4"
                  />

                  <Link
                    href="/(auth)/sign-up"
                    className="font-JakartaSemiBold text-[15px] text-general-200 mt-8 text-center"
                  >
                    <Text>Don't have an Account? </Text>
                    <Text className="text-primary-500">Sign Up</Text>
                  </Link>
                </View>
              )}
            </Formik>

            <Toast config={toastConfig} />
          </View>
        </View>
      </ScrollView>
      <Loader isVisible={loading} message="Signing In..." />
    </GestureHandlerRootView>
  );
};

export default Sign_In;
