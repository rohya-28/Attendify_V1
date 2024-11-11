import axios from 'axios'
import { UserProfile } from '@/types/type'

const api = axios.create({
  baseURL: 'http://192.168.30.198:5513/api/v1',
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
      return response.data
    } catch (error: any) {
      console.error('Error signing in:', error.response?.data || error.message)
      throw error
    }
  },
}

export default authService
