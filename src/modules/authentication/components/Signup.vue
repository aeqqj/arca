<script setup lang="ts">
import Layout from "./Layout.vue";
</script>

<template>
    <Layout>
        <h3 class="font-outfit font-semibold text-shadow-lg">
            come along!
        </h3>
        <div class="flex flex-col gap-8">
            <form id="sign-in" class="flex flex-col gap-8">
                <div class="flex flex-col justify-start text-left gap-1">
                    <label>Name</label>
                    <input type="text" placeholder="Enter your email"
                        class="w-80 px-5 py-3 bg-background1 rounded-xl shadow-xl" />
                </div>
                <div class="flex flex-col justify-start text-left gap-1">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email"
                        class="w-80 px-5 py-3 bg-background1 rounded-xl shadow-xl" />
                </div>
                <div class="flex flex-col justify-start text-left gap-1">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your email"
                        class="w-80 px-5 py-3 bg-background1 rounded-xl shadow-xl" />
                </div>
            </form>
            <div class="flex flex-col gap-4">
                <button form="sign-in" class="w-80 px-5 py-3 bg-foreground0 text-background0 rounded-xl shadow-xl">
                    Sign up
                </button>
                <p class="text-foreground0 opacity-60">Don't have an account? <button class="underline">Sign up</button>
                </p>
            </div>
        </div>
    </Layout>
</template>
