import axios from "axios"
import { AuthService } from "./AuthService"

export const api = axios.create({
  baseURL: "/api",
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
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken")
      if (!refreshToken) throw error

      const res = await AuthService.refresh(refreshToken)
      localStorage.setItem("accessToken", res.data.accessToken)

      error.config.headers.Authorization =
        `Bearer ${res.data.accessToken}`

      return api(error.config)
    }
    throw error
  }
)
