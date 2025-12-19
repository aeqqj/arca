import axios from "axios"
import { AuthService } from "./AuthService"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem("refreshToken")
      if (!refreshToken) {
        localStorage.clear()
        return Promise.reject(error)
      }

      try {
        const res = await AuthService.refreshToken(refreshToken)
        localStorage.setItem("accessToken", res.data.accessToken)

        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`

        return api(originalRequest)
      } catch (err) {
        localStorage.clear()
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)
