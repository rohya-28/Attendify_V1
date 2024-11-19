import axios from "axios";
import { UserProfile } from "@/types/type";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL_HOSTED,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log(
  "EXPO_PUBLIC_BASE_URL_HOSTED",
  process.env.EXPO_PUBLIC_BASE_URL_HOSTED
);

const authService = {
  signUp: async (formData: UserProfile) => {
    try {
      const response = await api.post(`/user/signup`, formData);
      console.log("testing ", formData);
      return response.data;
    } catch (error: any) {
      console.log("Error signing up:", error.response?.data || error.message);
      throw error;
    }
  },

  signIn: async (formData: { email: string; password: string }) => {
    try {
      const response = await api.post(`/user/signIn`, formData);
      return response.data;
    } catch (error: any) {
      console.log("Error signing in:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default authService;
