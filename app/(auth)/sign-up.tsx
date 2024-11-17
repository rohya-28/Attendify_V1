import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import ToggleButton from "@/components/ToggleButton";
import { icons, images } from "@/constants";
import { Link, useRouter } from "expo-router";
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
  // organizationName: Yup.string().required("Organization name is required"),
  // organizationId: Yup.string().required("Organization ID is required"),
  // organizationId: Yup.string().optional(),
});

const Sign_Up = () => {
  const [role, setRole] = useState<"STUDENT" | "ADMIN">("ADMIN");

  // Function to toggle role between student and admin
  const toggleRole = () => {
    setRole((prevRole) => (prevRole === "STUDENT" ? "ADMIN" : "STUDENT"));
  };

  const router = useRouter();

  // Handle form submission
  const onSignUpPress = async (values: FormikValues) => {
    router.push({
      pathname: "/(auth)/collegeInfo",
      params: {
        ...values,
        role,
      },
    });
  };

  return (
    <GestureHandlerRootView>
      <ScrollView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
          <View>
            <View className="relative w-full h-[250px]">
              <Image
                source={images.signUpbg}
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
                organizationName: "",
                organizationId: "",
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
                      touched.email && errors.email ? errors.email : undefined
                    }
                  />

                  {/* Profile Pic Input Field */}
                  {/* <InputField
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
                  /> */}

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

                  {/* Organization Name Input Field */}
                  {/* <InputField
                    label="Organization Name"
                    placeholder="Enter Organization Name"
                    icon={icons.building}
                    value={values.organizationName}
                    onChangeText={handleChange("organizationName")}
                    onBlur={handleBlur("organizationName")}
                    error={
                      touched.organizationName && errors.organizationName
                        ? errors.organizationName
                        : undefined
                    }
                  /> */}

                  {/* Organization ID Input Field */}
                  {/* <InputField
                    label="Organization ID"
                    placeholder="Enter Organization ID"
                    icon={icons.idCard}
                    value={values.organizationId}
                    onChangeText={handleChange("organizationId")}
                    onBlur={handleBlur("organizationId")}
                    error={
                      touched.organizationId && errors.organizationId
                        ? errors.organizationId
                        : undefined
                    }
                  /> */}

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
                        ? errors.password
                        : undefined
                    }
                  />

                  {/* Toggle Button for Role */}
                  <ToggleButton
                    label="Select Your Role"
                    role={role}
                    onToggle={toggleRole}
                  />

                  {/* Submit Button */}
                  {/* <CustomButton
                    title="Sign Up"
                    onPress={handleSubmit as any}
                    className="mt-4"
                  /> */}
                  {/* trigger yup validation onpress next */}
                  <Link
                    href="/(auth)/collegeInfo"
                    className="font-JakartaSemiBold text-[15px] text-general-200 mt-8 text-center"
                  >
                    <Text
                      onPress={handleSubmit as any}
                      className="text-primary-500"
                    >
                      Next{" "}
                    </Text>
                  </Link>

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
