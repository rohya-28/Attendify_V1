import { create } from 'zustand'

export interface TokenStore {
  token: string
  setToken: (data: string) => void
}

const useAuthStore = create<TokenStore>((set) => ({
  token: '',
  setToken: (data: string) => set(() => ({ token: data })),
}))

export default useAuthStore
