import axios from "axios";
import { UserProfile, LectureData, LectureValues } from "@/types/type"; // Assuming LectureData is the correct type for creating a lecture
import useAuthStore from "@/store/useAuthStore";
import { mixedData } from "../store/mockData";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL_HOSTED,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const collegeService = {
  // Sign up new user
  signUp: async (formData: UserProfile) => {
    try {
      const response = await api.post(`/user/signup`, formData);
      console.log("User signed up: ", formData);
      return response.data;
    } catch (error: any) {
      console.error("Error signing up:", error.response?.data || error.message);
      throw error;
    }
  },

  // Submit college information
  submitCollegeInfo: async (formData: {
    name: string;
    address: string;
    latitude: string;
    longitude: string;
  }) => {
    try {
      const response = await api.post(`/college-info`, formData);
      console.log("College information submitted:", formData);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error submitting college info:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Create a new lecture
  createLecture: async (formData: LectureData) => {
    const token = useAuthStore.getState().token;

    try {
      const response = await api.post("/lecture/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Lecture created:", formData);
      return response.data;
    } catch (error: any) {
      console.log(
        "Error creating lecture:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  deleteLecture: async (lectureId: string) => {
    const token = useAuthStore.getState().token;

    try {
      const response = await api.delete(`/lecture/delete/${lectureId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Lecture deleted:", lectureId);
      return response.data;
    } catch (error: any) {
      console.log(
        "Error deleting lecture:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  getUserData: async () => {
    const token = useAuthStore.getState().token;

    try {
      const response = await api.get("/user/get-my-profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching user data:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  getLectureData: async () => {
    const token = useAuthStore.getState().token;

    try {
      const response = await api.get("/lecture/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching lecture data:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  createSession: async (sessionData: LectureValues) => {
    try {
      const response = await api.post("session/create", sessionData);
      console.log("Session Created SuccessFully:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching lecture data:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
  getMockAnalyticsData: async () => {
    const token = useAuthStore.getState().token; // Assuming you're using token for authorization

    try {
      console.log("Fetching analytics data...");

      // Simulating an API delay with mock data
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(mixedData); // Resolving with the mock data after 1 second
        }, 1000);
      });

      console.log("Analytics data fetched:", data.lectures);
      return data; // Return the mock analytics data
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      throw error;
    }
  },
};

export default collegeService;
