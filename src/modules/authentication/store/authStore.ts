import { defineStore } from "pinia"
import { AuthService } from "@/services/AuthService"

export const useAuthStore = defineStore("auth", {
    state: () => ({
        userEmail: localStorage.getItem("userEmail") || null,
        isAuthenticated: !!localStorage.getItem("accessToken"),
    }),
    actions: {
        async login(email: string, password: string) {
            const res = await AuthService.login(email, password)

            // Save tokens (matching your actual response structure)
            localStorage.setItem("accessToken", res.data.access_token)
            localStorage.setItem("refreshToken", res.data.refresh_token)
            localStorage.setItem("userEmail", email) // Store the email from the parameter

            this.userEmail = email
            this.isAuthenticated = true
        },
        logout() {
            const refreshToken = localStorage.getItem("refreshToken")
            if (refreshToken) {
                AuthService.logout(refreshToken)
            }
            localStorage.clear()
            this.userEmail = null
            this.isAuthenticated = false
        }
    },
    getters: {
        loggedIn: (state) => state.isAuthenticated,
    }
})
