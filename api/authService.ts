import axios from 'axios'
import { UserProfile } from '@/types/type'
import useAuthStore from '@/store/useAuthStore'
import { State } from 'react-native-gesture-handler'

const api = axios.create({
  baseURL: 'http://192.168.18.198:5513/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

const authService = {
  signUp: async (formData: UserProfile) => {
    try {
      const response = await api.post(`/users/signup`, formData)
      console.log('testing ', formData)
      return response.data
    } catch (error: any) {
      console.error('Error signing up:', error.response?.data || error.message)
      throw error
    }
  },

  signIn: async (formData: { email: string; password: string }) => {
    try {
      const response = await api.post(`/users/signIn`, formData)
      console.log(formData)
      return response.data
    } catch (error: any) {
      console.error('Error signing in:', error.response?.data || error.message)
      throw error
    }
  },

  submitCollegeInfo: async (formData: {
    name: string
    address: string
    latitude: string
    longitude: string
  }) => {
    try {
      const response = await api.post(`/college-info`, formData)
      return response.data
    } catch (error: any) {
      console.error(
        'Error submitting college info:',
        error.response?.data || error.message
      )
      throw error
    }
  },
}

export default authService
