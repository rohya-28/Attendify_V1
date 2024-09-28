import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { useEffect } from "react";
import { View, Text, Image, Alert } from "react-native";
import { ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useUserLocation } from "@/hooks/useUserLocation";
import authService from "@/api/authService";
import { Formik } from "formik";
import * as Yup from "yup";

// Define the interface for the form values
interface CollegeInfoFormValues {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
}

// Validation schema for College Info
const collegeInfoSchema = Yup.object().shape({
  name: Yup.string().required("College name is required"),
  address: Yup.string().required("Address is required"),
  latitude: Yup.number()
    .typeError("Latitude must be a number")
    .required("Latitude is required"),
  longitude: Yup.number()
    .typeError("Longitude must be a number")
    .required("Longitude is required"),
});

const CollegeInfo = () => {
  const { location, errorMsg, loading } = useUserLocation();

  useEffect(() => {
    if (errorMsg) {
      Alert.alert("Error", errorMsg);
    }
  }, [location, errorMsg]);

  const onRegisterPress = async (values: CollegeInfoFormValues) => {
    console.log(values); // Log the form data for debugging

    try {
      const response = await authService.submitCollegeInfo(values);
      console.log("College Registration Successful:", response);

      Alert.alert("Success", "College Registered Successfully!");
    } catch (error) {
      console.error("College Registration Failed:", error);
      Alert.alert("Error", "Failed to register the college. Please try again.");
    }
  };

  return (
    <GestureHandlerRootView>
      <ScrollView className="flex-1 bg-white ">
        <View className="flex-1 bg-white">
          <View>
            <View className="relative w-full h-[250px]">
              <Image
                source={images.signUpCar}
                className="z-0 w-full h-[250px]"
              />
              <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                Register Your College
              </Text>
            </View>

            <Formik<CollegeInfoFormValues>
              initialValues={{
                name: "",
                address: "",
                latitude: location ? location.coords.latitude.toString() : "",
                longitude: location ? location.coords.longitude.toString() : "",
              }}
              validationSchema={collegeInfoSchema}
              onSubmit={onRegisterPress}
              enableReinitialize
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
                    label="College Name"
                    placeholder="Enter College Name"
                    icon={icons.person}
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    error={
                      touched.name && errors.name ? errors.name : undefined
                    }
                  />
                  <InputField
                    label="Address"
                    placeholder="Enter Address"
                    icon={icons.home}
                    value={values.address}
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
                    error={
                      touched.address && errors.address
                        ? errors.address
                        : undefined
                    }
                  />
                  <InputField
                    label="Latitude"
                    placeholder="Latitude"
                    icon={icons.map}
                    value={values.latitude}
                    keyboardType="numeric"
                    onChangeText={handleChange("latitude")}
                    onBlur={handleBlur("latitude")}
                    error={
                      touched.latitude && errors.latitude
                        ? errors.latitude
                        : undefined
                    }
                    editable={!loading}
                  />
                  <InputField
                    label="Longitude"
                    placeholder="Longitude"
                    icon={icons.map}
                    value={values.longitude}
                    keyboardType="numeric"
                    onChangeText={handleChange("longitude")}
                    onBlur={handleBlur("longitude")}
                    error={
                      touched.longitude && errors.longitude
                        ? errors.longitude
                        : undefined
                    }
                    editable={!loading}
                  />
                  {loading ? (
                    <Text>Loading location...</Text>
                  ) : (
                    <CustomButton
                      title="Register"
                      onPress={handleSubmit as any}
                      className="mt-4"
                    />
                  )}
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default CollegeInfo;
