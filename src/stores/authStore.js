import { defineStore } from 'pinia'

import SecureLS from 'secure-ls'
const ls = new SecureLS({ isCompression: false })

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: ls.get('accessToken') || null,
    refreshToken: ls.get('refreshToken') || null,
    accessTokenExpiration: ls.get('accessTokenExpiration') || null
  }),
  getters: {
    isAuthorised() {
      return (
        this.accessToken !== null &&
        this.accessTokenExpiration !== null &&
        Date.now() < this.accessTokenExpiration
      )
    }
  },
  actions: {
    setTokens(accessToken, refreshToken, expiresIn) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this.accessTokenExpiration = Date.now() + expiresIn * 1000

      ls.set('accessToken', accessToken)
      ls.set('refreshToken', refreshToken)
      ls.set('accessTokenExpiration', this.accessTokenExpiration)
    },
    clearTokens() {
      this.accessToken = null
      this.refreshToken = null
      this.accessTokenExpiration = null

      ls.remove('accessToken')
      ls.remove('refreshToken')
      ls.remove('accessTokenExpiration')
    }
  }
})
