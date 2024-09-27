import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { useState, useEffect } from "react";
import { View, Text, Image, Alert } from "react-native";
import { ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useUserLocation } from "@/hooks/useUserLocation"; // Import the useLocation hook
import authService from "@/api/authService";

const CollegeInfo = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const { location, errorMsg, loading } = useUserLocation();

  useEffect(() => {
    if (location) {
      // Automatically populate latitude and longitude when location is available
      setForm((prevForm) => ({
        ...prevForm,
        latitude: location.coords.latitude.toString(),
        longitude: location.coords.longitude.toString(),
      }));
    }
    if (errorMsg) {
      Alert.alert("Error", errorMsg);
    }
  }, [location, errorMsg]);

  const onRegisterPress = async () => {
    console.log(form); // Log the form data for debugging

    try {
      const formData = { ...form }; // Prepare the form data
      const response = await authService.submitCollegeInfo(formData);
      console.log("College Registration Successful:", response);

      Alert.alert("Success", "College Registered Successfully!");
    } catch (error) {
      console.error("College Registration Failed:", error);

      // Handle error, e.g., show an error message to the user
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

            <View className="p-5">
              <InputField
                label="College Name"
                placeholder="Enter College Name"
                icon={icons.person}
                value={form.name}
                onChangeText={(value) =>
                  setForm((prevForm) => ({ ...prevForm, name: value }))
                }
              />
              <InputField
                label="Address"
                placeholder="Enter Address"
                icon={icons.home}
                value={form.address}
                onChangeText={(value) =>
                  setForm((prevForm) => ({ ...prevForm, address: value }))
                }
              />
              <InputField
                label="Latitude"
                placeholder="Latitude"
                icon={icons.map}
                value={form.latitude}
                keyboardType="numeric"
                onChangeText={(value) =>
                  setForm((prevForm) => ({ ...prevForm, latitude: value }))
                }
                editable={!loading} // Disable if loading location
              />
              <InputField
                label="Longitude"
                placeholder="Longitude"
                icon={icons.map}
                value={form.longitude}
                keyboardType="numeric"
                onChangeText={(value) =>
                  setForm((prevForm) => ({ ...prevForm, longitude: value }))
                }
                editable={!loading} // Disable if loading location
              />
              {loading ? (
                <Text>Loading location...</Text>
              ) : (
                <CustomButton
                  title="Register"
                  onPress={onRegisterPress}
                  className="mt-4"
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default CollegeInfo;
