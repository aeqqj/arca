<script setup lang="ts">
import { useRouter } from "vue-router";
import SearchBar from "./MainSearchBar.vue";
import { CirclePlus, Shield, Vault, User } from "lucide-vue-next";

const school: string = "SAS";
const router = useRouter();

// Navigation functions
const goToHome = () => router.push({ name: "Home" });
const goToAdmin = () => router.push({ name: "Admin" });
const goToCreate = () => router.push({ name: "Create" });
const goToVault = () => router.push({ name: "Vault" });
const goToProfile = () => router.push({ name: "Profile" });
</script>

<template>
    <div
        class="h-16 px-6 py-2 flex justify-between items-center border-b border-foreground0/20 fixed top-0 left-0 right-0 bg-background0 z-50">
        <button @click="goToHome"class="font-outfit font-semibold text-3xl">arca • {{ school }}</button>

        <SearchBar />

        <div class="flex justify-between items-center gap-6 text-foreground0/60">
            <button class="flex h-fit w-fit px-3 py-1 gap-2 border rounded-xl" @click="goToAdmin">
                <Shield :size="20" />
                <p>Admin</p>
            </button>

            <button class="flex h-fit w-fit px-3 py-1 gap-2 border rounded-xl" @click="goToCreate">
                <CirclePlus :size="20" />
                <p>Create</p>
            </button>

            <button @click="goToVault">
                <Vault :size="28" />
            </button>

            <button @click="goToProfile">
                <User :size="28" />
            </button>
        </div>
    </div>
</template>
