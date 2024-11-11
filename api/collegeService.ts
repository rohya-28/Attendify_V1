import axios from 'axios'
import { UserProfile, LectureData } from '@/types/type' // Assuming LectureData is the correct type for creating a lecture
import useAuthStore from '@/store/useAuthStore'

const api = axios.create({
  baseURL: 'http://192.168.30.198:5513/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

const collegeService = {
  // Sign up new user
  signUp: async (formData: UserProfile) => {
    try {
      const response = await api.post(`/users/signup`, formData)
      console.log('User signed up: ', formData)
      return response.data
    } catch (error: any) {
      console.error('Error signing up:', error.response?.data || error.message)
      throw error
    }
  },

  // Submit college information
  submitCollegeInfo: async (formData: {
    name: string
    address: string
    latitude: string
    longitude: string
  }) => {
    try {
      const response = await api.post(`/college-info`, formData)
      console.log('College information submitted:', formData)
      return response.data
    } catch (error: any) {
      console.error(
        'Error submitting college info:',
        error.response?.data || error.message
      )
      throw error
    }
  },

  // Create a new lecture
  createLecture: async (formData: LectureData) => {
    const token = useAuthStore.getState().token
    console.log(formData)

    try {
      const response = await api.post('/lecture/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('Lecture created:', formData)
      return response.data
    } catch (error: any) {
      console.error(
        'Error creating lecture:',
        error.response?.data || error.message
      )
      throw error
    }
  },
}

export default collegeService
