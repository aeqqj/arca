<script setup lang="ts">
import Layout from "./Layout.vue";
</script>

<template>
    <Layout>
        <h3 class="font-outfit font-semibold text-shadow-lg">
            welcome back!
        </h3>
        <div class="flex flex-col gap-8">
            <form id="sign-in" class="flex flex-col gap-8">
                <div class="flex flex-col justify-start text-left gap-1">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email"
                        class="w-80 px-5 py-3 bg-background1 rounded-xl shadow-xl" />
                </div>
                <div class="flex flex-col justify-start text-left gap-1">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email"
                        class="w-80 px-5 py-3 bg-background1 rounded-xl shadow-xl" />
                    <button class="text-sm text-right opacity-60">
                        Forgot password?
                    </button>
                </div>
            </form>
            <div class="flex flex-col gap-4 text-sm">
                <button form="sign-in" class="w-80 px-5 py-3 bg-foreground0 text-background0 rounded-xl shadow-xl">
                    Sign in
                </button>
                <p class="opacity-60">
                    Don't have an account?&nbsp;
                    <button class="underline">Sign up</button>
                </p>
            </div>
        </div>
    </Layout>
</template>
