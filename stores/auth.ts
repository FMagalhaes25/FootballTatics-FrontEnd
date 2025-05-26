import { defineStore } from 'pinia'

type User = {
  name: string
  email: string
  phone: string
  team: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),

  actions: {
    setUser(userData: User) {
      this.user = userData
    },

    setToken(token: string) {
      this.token = token
    },

    login(userData: User, token: string) {
      this.setUser(userData)
      this.setToken(token)
    },

    logout() {
      this.user = null
      this.token = null
    },

    updateUser(data: Partial<User>) {
      if (this.user) {
        this.user = { ...this.user, ...data }
      }
    },
  },

  persist: import.meta.client
    ? {
        key: 'auth',
        storage: localStorage,
      }
    : false,
})