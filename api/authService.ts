import axios from 'axios';
import { UserProfile } from '@/types/type';

// Base URL for your API
const BASE_URL = "";

const authService = {
  signUp: async (formData: UserProfile) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/sign-up`, formData);
      return response.data;
    } catch (error: any) {
      console.error('Error signing up:', error.response?.data || error.message);
      throw error;
    }
  },

  signIn: async (formData: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/sign-in`, formData);
      return response.data;
    } catch (error: any) {
      console.error('Error signing in:', error.response?.data || error.message);
      throw error;
    }
  },

  submitCollegeInfo: async (formData: { name: string; address: string; latitude: string; longitude: string }) => {
    try {
      const response = await axios.post(`${BASE_URL}/college-info`, formData);
      return response.data;
    } catch (error: any) {
      console.error('Error submitting college info:', error.response?.data || error.message);
      throw error;
    }
  },
};

export default authService;