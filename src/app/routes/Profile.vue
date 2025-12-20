<script setup lang="ts">
import Layout from '@/modules/profile/components/Layout.vue';
import Post from '@/components/Post.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import type { PostResponse } from '@/types/Post';
import type { User } from '@/types/User';
import { UserService } from '@/services/UserService';
import { PostService } from '@/services/PostService';
import { useAuthStore } from '@/modules/authentication/store/authStore';
import { useUserSearch } from '@/composables/getUserSearch';

const route = useRoute();
const authStore = useAuthStore();
const { getUserIdByEmail } = useUserSearch();

const user = ref<User | null>(null);
const posts = ref<PostResponse[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const currentUserId = ref<number | null>(null);
const uploading = ref(false);
const isOwnProfile = computed(() => {
    return currentUserId.value !== null && user.value?.id === currentUserId.value;
});

const getProfilePictureUrl = (profilePicture: string | null) => {
    if (!profilePicture) return '/newaccount.png';
    return profilePicture;
};

onMounted(async () => {
    try {
        loading.value = true;
        error.value = null;

        const userId = Number(route.params.userId);
        if (isNaN(userId)) {
            error.value = 'Invalid user ID';
            return;
        }

        // Get current user ID if logged in
        if (authStore.userEmail) {
            currentUserId.value = await getUserIdByEmail(authStore.userEmail);
        }

        const [userDetails, userPosts] = await Promise.all([
            UserService.getUserDetails(userId),
            PostService.getAllUserPost(userId)
        ]);

        user.value = userDetails;
        posts.value = userPosts;

        // Debug logs
        console.log('User Details:', userDetails);
        console.log('Profile Picture URL:', userDetails.profile_picture);
        console.log('Is Own Profile:', isOwnProfile.value);
    } catch (err: any) {
        error.value = err.response?.data?.message || 'Failed to load profile';
        console.error('Error loading profile:', err);
    } finally {
        loading.value = false;
    }
});

const handleFileSelect = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file || !user.value) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        error.value = 'Please select an image file';
        return;
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        error.value = 'Image size must be less than 5MB';
        return;
    }

    try {
        uploading.value = true;
        error.value = null;

        const response = await UserService.updateProfilePicture(user.value.id, file);

        // Debug logs
        console.log('Upload Response:', response);
        console.log('New Profile Picture URL:', response.profile_picture);

        // Update the profile picture in the UI
        user.value.profile_picture = response.profile_picture;

    } catch (err: any) {
        error.value = err.response?.data?.message || 'Failed to upload profile picture';
        console.error('Error uploading profile picture:', err);
    } finally {
        uploading.value = false;
        // Reset input
        input.value = '';
    }
};

const triggerFileInput = () => {
    const fileInput = document.getElementById('profile-picture-input') as HTMLInputElement;
    fileInput?.click();
};
</script>

<template>
    <Layout>
        <div v-if="loading" class="text-center py-8">Loading...</div>
        <div v-else-if="error" class="text-center py-8 text-red-500">{{ error }}</div>
        <div v-else-if="user" class="flex gap-20">
            <div class="flex flex-col gap-14">
                <div class="flex gap-8 items-end">
                    <div class="relative">
                        <img :src="getProfilePictureUrl(user.profile_picture)" alt="picture"
                            class="h-64 w-64 rounded-2xl object-cover"
                            :class="{ 'cursor-pointer': isOwnProfile && !uploading }"
                            @click="isOwnProfile && !uploading ? triggerFileInput() : null">

                        <div v-if="isOwnProfile"
                            class="absolute inset-0 bg-black rounded-2xl opacity-0 hover:opacity-60 transition-opacity flex items-center justify-center cursor-pointer"
                            :class="{ 'pointer-events-none opacity-50': uploading }"
                            @click="!uploading ? triggerFileInput() : null">
                            <p class="text-white font-semibold text-center px-4">
                                {{ uploading ? 'Uploading...' : 'Click to change profile picture' }}
                            </p>
                        </div>

                        <input v-if="isOwnProfile" id="profile-picture-input" type="file" accept="image/*"
                            class="hidden" @change="handleFileSelect" :disabled="uploading">
                    </div>

                    <div class="w-lg text-start pb-4 border-t border-foreground0/60 font-semibold">
                        <h4>{{ user.first_name }} {{ user.last_name }}</h4>
                        <div>
                            <p v-if="user.bio" class="text-sm font-normal text-foreground0/80 mt-2">
                                {{ user.bio }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-6">
                    <div class="flex flex-col gap-8">
                        <div v-if="posts.length === 0" class="text-center py-8 text-foreground0/60">
                            No posts yet
                        </div>
                        <Post v-else v-for="post in posts" :key="post.id" :post="post" />
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
