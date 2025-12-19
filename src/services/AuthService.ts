import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL

export const AuthService = {
  login: (email: string, password: string) => {
    return axios.post(`${API_URL}/auth/login`, { email, password })
  },

  logout: (refreshToken: string | null) => {
    if (!refreshToken) return
    return axios.post(`${API_URL}/auth/logout`, { refreshToken })
  },

  register: (user: { email: string; password: string; [key: string]: any }) => {
    return axios.post(`${API_URL}/auth/register`, user)
  },

  refreshToken: (refreshToken: string) => {
    return axios.post(`${API_URL}/auth/refresh`, { refreshToken })
  },

  getProfile: (email: string) => {
    return axios.get(`${API_URL}/user/${email}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
  }
}
