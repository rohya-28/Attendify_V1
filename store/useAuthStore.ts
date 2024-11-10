import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  role: string
  userId: string
  organizationId: string
}

export interface TokenStore {
  token: string
  role: string
  userId: string
  organizationId: string
  setToken: (token: string) => void
  setRole: (role: string) => void // Add setRole
  setUserId: (userId: string) => void // Add setUserId
  setOrganizationId: (organizationId: string) => void // Add setOrganizationId
}

const useAuthStore = create<TokenStore>((set) => ({
  token: '',
  role: '',
  userId: '',
  organizationId: '',

  setToken: (token: string) => {
    let decoded: DecodedToken | null = null

    try {
      decoded = jwtDecode<DecodedToken>(token) // Decode with type safety
    } catch (error) {
      console.error('Invalid token:', error)
      return // Exit if the token is invalid
    }

    if (decoded) {
      set({
        token, // Set token directly
        role: decoded.role,
        userId: decoded.userId,
        organizationId: decoded.organizationId,
      })
    }
  },

  setRole: (role: string) => set({ role }), // Set role
  setUserId: (userId: string) => set({ userId }), // Set user ID
  setOrganizationId: (organizationId: string) => set({ organizationId }), // Set organization ID
}))

export default useAuthStore
