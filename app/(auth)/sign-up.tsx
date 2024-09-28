import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import ToggleButton from "@/components/ToggleButton";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, Image } from "react-native";
import { ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import authService from "@/api/authService";

import * as Yup from "yup";
import { Formik, FormikValues } from "formik";

// Validation schema using Yup
export const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot be longer than 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot be longer than 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  profilePic:
    Yup.string().url("Invalid URL for profile picture").optional() || null,
  phoneNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

const Sign_Up = () => {
  const [role, setRole] = useState<"student" | "admin">("student");

  // Function to toggle role between student and admin
  const toggleRole = () => {
    setRole((prevRole) => (prevRole === "student" ? "admin" : "student"));
  };

  // Handle form submission
  const onSignUpPress = async (values: FormikValues) => {
    console.log({ ...values, role });

    try {
      const formData = { ...values, role };
      const response = await authService.signUp(formData);
      console.log("Sign Up Successful:", response);
      // Handle success, e.g., navigate to another page or show a success message
    } catch (error) {
      console.error("Sign Up Failed:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <GestureHandlerRootView>
      <ScrollView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
          <View>
            <View className="relative w-full h-[250px]">
              <Image
                source={images.signUpCar}
                className="z-0 w-full h-[250px]"
              />

              <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                Create Your Account
              </Text>
            </View>

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                profilePic: "",
                phoneNo: "",
              }}
              validationSchema={signUpSchema}
              onSubmit={onSignUpPress}
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
                  {/* First Name Input Field */}
                  <InputField
                    label="First Name"
                    placeholder="First Name"
                    icon={icons.person}
                    value={values.firstName}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    error={
                      touched.firstName && errors.firstName
                        ? errors.firstName
                        : undefined
                    }
                  />

                  {/* Last Name Input Field */}
                  <InputField
                    label="Last Name"
                    placeholder="Last Name"
                    icon={icons.person}
                    value={values.lastName}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    error={
                      touched.lastName && errors.lastName
                        ? errors.lastName
                        : undefined
                    }
                  />

                  {/* Email Input Field */}
                  <InputField
                    label="Email"
                    placeholder="Enter Email"
                    icon={icons.email}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    error={
                      touched.email && errors.email
                        ? errors.lastName
                        : undefined
                    }
                  />

                  {/* Profile Pic Input Field */}
                  <InputField
                    label="Profile Pic"
                    placeholder="Profile Pic"
                    icon={icons.person}
                    value={values.profilePic}
                    onChangeText={handleChange("profilePic")}
                    onBlur={handleBlur("profilePic")}
                    error={
                      touched.profilePic && errors.profilePic
                        ? errors.profilePic
                        : undefined
                    }
                  />

                  {/* Phone No Input Field */}
                  <InputField
                    label="Phone No"
                    placeholder="Enter Phone No"
                    icon={icons.email}
                    value={values.phoneNo}
                    keyboardType="numeric"
                    onChangeText={handleChange("phoneNo")}
                    onBlur={handleBlur("phoneNo")}
                    error={
                      touched.phoneNo && errors.phoneNo
                        ? errors.phoneNo
                        : undefined
                    }
                  />

                  {/* Password Input Field */}
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
                        ? errors.phoneNo
                        : undefined
                    }
                  />

                  {/* Toggle Button for Role */}
                  <ToggleButton role={role} onToggle={toggleRole} />

                  {/* Submit Button */}
                  <CustomButton
                    title="Sign Up"
                    onPress={handleSubmit as any}
                    className="mt-4"
                  />

                  {/* Link to Sign In */}
                  <Link
                    href="/(auth)/sign-in"
                    className="font-JakartaSemiBold text-[15px] text-general-200 mt-8 text-center"
                  >
                    <Text>Already have an Account? </Text>
                    <Text className="text-primary-500">Log In</Text>
                  </Link>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Sign_Up;
