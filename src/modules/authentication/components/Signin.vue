<script setup lang="ts">
import { togglePage, switchStore } from '../store/switchStore';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/authentication/store/authStore'
import { AuthService } from '@/services/AuthService'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

const submit = async () => {
    try {
        const res = await AuthService.login(email.value, password.value)

        // save tokens
        localStorage.setItem('accessToken', res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)

        // update auth store
        auth.isAuthenticated = true

        router.push('/home')
    } catch (e: any) {
        error.value = e.response?.data?.error || 'Login failed'
    }
}

</script>

<template>
    <h3 class="font-outfit font-semibold text-shadow-lg">
        welcome back!
    </h3>
    <div class="flex flex-col gap-8">
        <form @submit.prevent="submit" id="sign-in" class="flex flex-col gap-8">
            <div class="flex flex-col justify-start text-left gap-1">
                <label>Email</label>
                <input v-model="email" type="email" placeholder="Enter your email"
                    class="w-80 px-5 py-3 bg-background1 rounded-xl shadow-xl" />
            </div>
            <div class="flex flex-col justify-start text-left gap-1">
                <label>Email</label>
                <input v-model="password" type="password" placeholder="Enter your password"
                    class="w-80 px-5 py-3 bg-background1 rounded-xl shadow-xl" />
                <button class="text-sm text-right opacity-60">
                    Forgot password?
                </button>
            </div>
            <div class="flex flex-col gap-4 text-sm">
                <button type="submit"
                    class="w-80 px-5 py-3 bg-foreground0 text-background0 rounded-xl shadow-xl">
                    Sign in
                </button>
                <p class="opacity-60">
                    Don't have an account?&nbsp;
                    <button @click="togglePage" class="underline">Sign up</button>
                </p>
            </div>
        </form>
    </div>
</template>
