import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCurrentDateTime from "@/hooks/useUserDateTime";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { useState } from "react";
import ToggleButton from "@/components/ToggleButton";
import * as Yup from "yup";
import { Formik } from "formik";

// Validation schema for the invite form
export const inviteSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const Invite = () => {
  const currentDateTime = useCurrentDateTime(); // Get current date and time
  const [role, setRole] = useState<"STUDENT" | "ADMIN">("STUDENT"); // Role state for toggling between student and admin

  // Function to toggle between roles
  const toggleRole = () => {
    setRole((prevRole) => (prevRole === "STUDENT" ? "ADMIN" : "STUDENT"));
  };

  // Function to handle form submission
  const submitInviteForm = (values: { email: string }) => {
    console.log(`Inviting ${values.email} as a ${role}`);
    // Add further logic to handle the invitation process here
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text className="text-2xl font-JakartaBold">Invite</Text>

        {/* Display the current date and time */}
        <View className="mt-4">
          <Text className="text-lg">Current Date & Time:</Text>
          <Text>
            {`Day: ${currentDateTime.day} | Date: ${currentDateTime.date.toLocaleDateString()} | Time: ${currentDateTime.date.toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }
            )}`}
          </Text>
        </View>

        <View className="h-72 w-full mt-4 border bg-[#F5F9FF] border-[#61A2FE] drop-shadow-2xl ">
          {/* Invite Form Section */}
          <View className="w-full h-full rounded-md flex-col justify-evenly items-center ">
            <View className="h-full w-[94%] flex-col justify-around overflow-hidden">
              {/* Role Toggle Button */}
              <ToggleButton
                label="Select Role"
                role={role}
                onToggle={toggleRole}
                labelOne="Student"
                labelTwo="Teacher"
              />

              {/* Formik Form for Email Input */}
              <Formik
                initialValues={{ email: "" }}
                validationSchema={inviteSchema}
                onSubmit={submitInviteForm}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    {/* Email Input */}
                    <View className="h-[20%] mt-4">
                      <Text className="ml-4 text-lg text-[#0C0C0C] font-JakartaSemiBold">
                        Enter Email
                      </Text>
                    </View>
                    <View className="h-[30%] w-[94%] ml-3">
                      <InputField
                        label=""
                        placeholder="Enter Email"
                        icon={icons.email}
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        containerStyle="bg-white"
                        error={
                          touched.email && errors.email
                            ? errors.email
                            : undefined
                        }
                      />
                    </View>

                    {/* Submit Button */}
                    <View className="h-[30%] w-[94%] ml-3 flex flex-col justify-center">
                      <CustomButton
                        title={`Send Invite as ${role}`}
                        className="rounded-md"
                        onPress={handleSubmit as any}
                      />
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Invite;
