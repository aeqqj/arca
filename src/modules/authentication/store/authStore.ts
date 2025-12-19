import { defineStore } from "pinia"
import { AuthService } from "@/services/AuthService"

export const useAuthStore = defineStore("auth", {
    state: () => ({
        userEmail: localStorage.getItem("userEmail"),  // persist email
        isAuthenticated: !!localStorage.getItem("accessToken"),
    }),

    actions: {
        async login(email: string, password: string) {
            const res = await AuthService.login(email, password)

            // Save tokens
            localStorage.setItem("accessToken", res.data.accessToken)
            localStorage.setItem("refreshToken", res.data.refreshToken)
            localStorage.setItem("userEmail", res.data.email)

            this.userEmail = res.data.email
            this.isAuthenticated = true
        },

        logout() {
            const refreshToken = localStorage.getItem("refreshToken")
            if (refreshToken) {
                AuthService.logout(refreshToken)
            }

            localStorage.clear()
            this.$reset()
        }
    },

    getters: {
        loggedIn: (state) => state.isAuthenticated,
    }
})
