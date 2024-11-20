import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to store the token in AsyncStorage
export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("auth_token", token);
    console.log("Token saved successfully!");
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

// Function to retrieve the token from AsyncStorage
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("auth_token");
    if (token !== null) {
      console.log("Token retrieved:", token);
      return token; // Return the token if it exists
    } else {
      console.log("No token found");
      return null; // Return null if no token is found
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem("auth_token"); // Replace "auth_token" with your storage key
    console.log("Token deleted successfully!");
  } catch (error) {
    console.error("Error deleting token:", error);
  }
};
