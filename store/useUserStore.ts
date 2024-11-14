// store/useUserStore.ts
import { create } from 'zustand'

interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  profilePic: string
  role: string
  organizationId: string
}

interface UserStore {
  [x: string]: any
  user: User | null // Start with null
  setUser: (user: User | null) => void // Allow setting user to null for logout
}

const useUserStore = create<UserStore>((set) => ({
  user: null, // Initial user state is null
  setUser: (user: User | null) => set({ user }), // Function to update user
}))

export default useUserStore
