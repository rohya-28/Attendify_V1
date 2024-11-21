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
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  // organizationName: Yup.string().required("Organization name is required"),
  // organizationId: Yup.string().required("Organization ID is required"),
  // organizationId: Yup.string().optional(),
});

const Sign_Up = () => {
  const [role, setRole] = useState<"STUDENT" | "ADMIN">("ADMIN");
  const [verifyCode, setVerifyCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Function to toggle role between student and admin
  const toggleRole = () => {
    setRole((prevRole) => (prevRole === "STUDENT" ? "ADMIN" : "STUDENT"));
  };

  const router = useRouter();

  const handleVerifyCode = async (code: string, setValues: any) => {
    console.log("Entered Code:", verifyCode);

    const response = await authService.verifyCode({ code });
    console.log("Verification Successful:", response);

    setValues({
      email: response.email || "",
      organizationName: response.organizationName || "",
      role: response.role === "TEACHER" ? "ADMIN" : "STUDENT" || "", // assuming this exists in your response
      organizationId: response.organizationId || "", // assuming this exists in your response
    });
    setIsVerified(true); // Mark as verified

    // You can add additional logic here, e.g., API calls to verify the code
  };

  // Handle form submission
  const onSignUpPress = async (values: FormikValues) => {
    router.push({
      pathname: "/(auth)/collegeInfo",
      params: {
        ...values,
        role,
      },
    });
    console.log(values);
    try {
      if (isVerified) {
        // Example API call
        console.log(role);
        console.log("mkmdkm", values);

        const response = await authService.signUp({ ...values });
        console.log("Sign Up Successful:", response);
        router.push("/(auth)/sign-in");
      } else {
        router.push({
          pathname: "/(auth)/collegeInfo",
          params: {
            ...values,
            role,
          },
        });
      }
    } catch (error) {
      console.error("Sign Up Failed:", error);
    }
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
                phoneNumber: "",
                organizationName: "",
                organizationId: "",
                role,
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
                setValues,
              }) => (
                <View className="p-5">
                  <View className="flex flex-row justify-between items-end w-full">
                    {/* First Name Input Field */}
                    <View className="w-[55%]">
                      <InputField
                        label="Verify"
                        placeholder="Enter Code"
                        icon={icons.person}
                        value={verifyCode}
                        onChangeText={setVerifyCode}
                        onBlur={handleBlur("firstName")}
                      />
                    </View>
                    <View className="w-[40%] mb-2">
                      <CustomButton
                        title="verify code"
                        className="rounded-sm font-JakartaLight text-sm"
                        onPress={() => handleVerifyCode(verifyCode, setValues)}
                      />
                    </View>
                  </View>
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
                    editable={!isVerified}
                    error={
                      touched.email && errors.email ? errors.email : undefined
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
                    label="Phone No3"
                    placeholder="Enter Phone No"
                    icon={icons.email}
                    value={values.phoneNumber}
                    keyboardType="numeric"
                    onChangeText={handleChange("phoneNumber")}
                    onBlur={handleBlur("phoneNo")}
                    error={
                      touched.phoneNumber && errors.phoneNumber
                        ? errors.phoneNumber
                        : undefined
                    }
                  />

                  {/* Organization Name Input Field */}
                  <InputField
                    label="Organization Name"
                    placeholder="Enter Organization Name"
                    icon={icons.email}
                    value={values.organizationName}
                    onChangeText={handleChange("organizationName")}
                    onBlur={handleBlur("organizationName")}
                    editable={!isVerified}
                    error={
                      touched.organizationName && errors.organizationName
                        ? errors.organizationName
                        : undefined
                    }
                  />

                  {/* Organization ID Input Field */}
                  {isVerified ? (
                    <InputField
                      label="Organization ID"
                      placeholder="Enter Organization ID"
                      icon={icons.email}
                      value={values.organizationId}
                      onChangeText={handleChange("organizationId")}
                      onBlur={handleBlur("organizationId")}
                      error={
                        touched.organizationId && errors.organizationId
                          ? errors.organizationId
                          : undefined
                      }
                    />
                  ) : (
                    ""
                  )}

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
                    role={isVerified ? values.role : role}
                    onToggle={toggleRole}
                    isDisabled={isVerified}
                  />

                  {/* Submit Button */}
                  {isVerified ? (
                    <CustomButton
                      title="Sign Up"
                      onPress={handleSubmit as any}
                      className="mt-4"
                    />
                  ) : (
                    ""
                  )}
                  {/* trigger yup validation onpress next */}
                  {!isVerified ? (
                    <Link
                      href="/(auth)/collegeInfo"
                      className="font-JakartaSemiBold text-[15px] py-4 rounded-lg shadow mt-8 text-center"
                    >
                      <Text
                        onPress={handleSubmit as any}
                        className="text-primary-500 "
                      >
                        Next{" "}
                      </Text>
                    </Link>
                  ) : (
                    ""
                  )}

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
