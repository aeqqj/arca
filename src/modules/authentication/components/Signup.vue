<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { togglePage } from '../store/switchStore';
import { AuthService } from '@/services/AuthService';
import { useAuthStore } from '../store/authStore';

const router = useRouter();
const auth = useAuthStore();

// Form fields
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// State
const loading = ref(false);
const error = ref<string | null>(null);

const validateForm = () => {
    // Reset error
    error.value = null;

    // Validation
    if (!firstName.value.trim()) {
        error.value = 'First name is required';
        return false;
    }

    if (!lastName.value.trim()) {
        error.value = 'Last name is required';
        return false;
    }

    if (!email.value.trim()) {
        error.value = 'Email is required';
        return false;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        error.value = 'Please enter a valid email';
        return false;
    }

    if (!email.value.toLowerCase().endsWith('@usc.edu.ph')) {
        error.value = 'Only @usc.edu.ph email addresses are allowed';
        return false;
    }

    if (!password.value) {
        error.value = 'Password is required';
        return false;
    }

    if (password.value.length < 8) {
        error.value = 'Password must be at least 8 characters';
        return false;
    }

    if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match';
        return false;
    }

    return true;
};

const handleSignup = async () => {
    if (!validateForm()) return;

    try {
        loading.value = true;
        error.value = null;

        // Register user
        const response = await AuthService.register({
            first_name: firstName.value.trim(),
            last_name: lastName.value.trim(),
            email: email.value.trim(),
            password: password.value,
        });

        console.log('Registration successful:', response.data);

        // Auto-login after registration
        const loginResponse = await AuthService.login(email.value, password.value);

        // Store tokens
        localStorage.setItem('accessToken', loginResponse.data.accessToken);
        localStorage.setItem('refreshToken', loginResponse.data.refreshToken);

        // Update auth store
        auth.login(email.value);

        // Redirect to home
        router.push({ name: 'Home' });

    } catch (err: any) {
        console.error('Signup error:', err);
        error.value = err.response?.data?.message || 'Registration failed. Please try again.';
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <h3 class="font-outfit font-semibold text-shadow-lg">
        come along!
    </h3>
    <div class="flex flex-col gap-8">
        <div v-if="error" class="w-full px-4 py-2 bg-red-100 text-red-700 rounded-xl text-sm">
            {{ error }}
        </div>

        <form id="sign-up" @submit.prevent="handleSignup" class="flex flex-col gap-8">
            <!-- Email (full width) -->
            <div class="flex flex-col justify-start text-left gap-1">
                <label>Email</label>
                <input v-model="email" type="email" placeholder="Enter your email"
                    class="w-full px-5 py-3 bg-background1 rounded-xl shadow-xl" :disabled="loading" />
            </div>

            <!-- First Name and Last Name (side by side) -->
            <div class="flex gap-4">
                <div class="flex flex-col justify-start text-left gap-1 flex-1">
                    <label>First Name</label>
                    <input v-model="firstName" type="text" placeholder="First name"
                        class="w-full px-5 py-3 bg-background1 rounded-xl shadow-xl" :disabled="loading" />
                </div>

                <div class="flex flex-col justify-start text-left gap-1 flex-1">
                    <label>Last Name</label>
                    <input v-model="lastName" type="text" placeholder="Last name"
                        class="w-full px-5 py-3 bg-background1 rounded-xl shadow-xl" :disabled="loading" />
                </div>
            </div>

            <!-- Password and Confirm Password (side by side) -->
            <div class="flex gap-4">
                <div class="flex flex-col justify-start text-left gap-1 flex-1">
                    <label>Password</label>
                    <input v-model="password" type="password" placeholder="Password"
                        class="w-full px-5 py-3 bg-background1 rounded-xl shadow-xl" :disabled="loading" />
                </div>

                <div class="flex flex-col justify-start text-left gap-1 flex-1">
                    <label>Confirm Password</label>
                    <input v-model="confirmPassword" type="password" placeholder="Confirm password"
                        class="w-full px-5 py-3 bg-background1 rounded-xl shadow-xl" :disabled="loading" />
                </div>
            </div>
        </form>

        <div class="flex flex-col gap-4">
            <button form="sign-up" type="submit" :disabled="loading"
                class="w-full px-5 py-3 bg-foreground0 text-background0 rounded-xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                {{ loading ? 'Creating account...' : 'Sign up' }}
            </button>
            <p class="text-foreground0 opacity-60">
                Already have an account?
                <button @click="togglePage" class="underline" :disabled="loading">
                    Sign in
                </button>
            </p>
        </div>
    </div>
</template>
