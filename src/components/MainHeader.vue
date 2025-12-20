<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import SearchBar from "./MainSearchBar.vue";
import { CirclePlus, Shield, Vault, User as UserIcon } from "lucide-vue-next";
import { useAuthStore } from '@/modules/authentication/store/authStore';
import { useUserSearch } from '@/composables/getUserSearch';
import type { PostResponse } from "@/types/Post";
import type { User } from "@/types/User";

const auth = useAuthStore();
const { getUserIdByEmail } = useUserSearch();
const school: string = "SAS";
const showUserModal = ref(false);
const router = useRouter();
const searchQuery = ref("");
const posts = ref<PostResponse[]>([]);
const users = ref<User[]>([]);

// Navigation functions
const goToHome = () => router.push({ name: "Home" });
const goToAdmin = () => router.push({ name: "Admin" });
const goToCreate = () => router.push({ name: "Create" });
const goToVault = () => router.push({ name: "Vault" });

const goToProfile = async () => {
    console.log('goToProfile called');
    console.log('auth.userEmail:', auth.userEmail);
    
    if (auth.userEmail) {
        console.log('Fetching userId...');
        const userId = await getUserIdByEmail(auth.userEmail);
        console.log('userId:', userId);
        
        if (userId) {
            console.log('Pushing to route with userId:', userId);
            router.push({ name: 'Profile', params: { userId: userId } });
        } else {
            console.log('userId is null or undefined');
        }
    } else {
        console.log('No user email found');
    }
    showUserModal.value = false;
};

const toggleUserModal = () => {
    showUserModal.value = !showUserModal.value;
};

const logout = () => {
    showUserModal.value = false;
    auth.logout();
    router.push({ name: 'Authentication' });
};
</script>

<template>
    <div
        class="h-16 px-6 py-2 flex justify-between items-center border-b border-foreground0/20 fixed top-0 left-0 right-0 bg-background0 z-50">
        <button @click="goToHome" class="font-outfit font-semibold text-3xl">arca • {{ school }}</button>
        <SearchBar @search="searchQuery = $event" />
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
            <div class="relative">
                <button @click="toggleUserModal">
                    <UserIcon :size="28" />
                </button>
                <div v-if="showUserModal"
                    class="absolute right-0 mt-2 w-40 bg-background1 border border-foreground0/20 rounded-lg shadow-lg flex flex-col">
                    <button @click="goToProfile" class="px-4 py-2 hover:bg-foreground0/10 text-left rounded-t-lg">
                        View Profile
                    </button>
                    <button @click="logout" class="px-4 py-2 hover:bg-foreground0/10 text-left rounded-b-lg">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
