<script setup lang="ts">
import Layout from '@/modules/admin/components/Layout.vue';
import PendingPosts from '@/modules/admin/components/PendingPosts.vue';
import UserAccount from '@/modules/admin/components/UserAccount.vue';
import { PostService } from '@/services/PostService';
import { UserService } from '@/services/UserService';
import type { PostResponse } from '@/types/Post';
import type { User } from "@/types/User";
import { ref, onMounted, computed } from 'vue';

const posts = ref<PostResponse[]>([]);
const selectedUser = ref<User | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

// Filter posts by selected user
const userPosts = computed(() => {
    if (!selectedUser.value) return [];
    return posts.value.filter(p => p.user_id === selectedUser.value?.id);
});
async function handleApprovePost(postId: number) {
    try {
        loading.value = true;
        error.value = null;

        // Call the approve endpoint with approved: true
        await PostService.approvePost(postId, {
            approved: true
        });

        posts.value = posts.value.filter(p => p.post_id !== postId);

        selectedUser.value = null;
    } catch (err: any) {
        console.error('Error approving post:', err);
        error.value = err.response?.data?.message || 'Failed to approve post';
    } finally {
        loading.value = false;
    }
}

async function handleDenyPost(postId: number, reason?: string) {
    try {
        loading.value = true;
        error.value = null;

        await PostService.approvePost(postId, {
            approved: false,
            rejection_reason: reason || 'Post does not meet guidelines'
        });

        posts.value = posts.value.filter(p => p.post_id !== postId);

        selectedUser.value = null;
    } catch (err: any) {
        console.error('Error denying post:', err);
        error.value = err.response?.data?.message || 'Failed to deny post';
    } finally {
        loading.value = false;
    }
}

async function handleSelectUser(userId: number) {
    try {
        loading.value = true;
        error.value = null;

        // Fetch user from backend
        const user = await UserService.getUserDetails(userId);
        selectedUser.value = user;
    } catch (err: any) {
        console.error('Error fetching user:', err);
        error.value = err.response?.data?.message || 'Failed to fetch user';
        selectedUser.value = null;
    } finally {
        loading.value = false;
    }
}

async function fetchPendingPosts() {
    try {
        loading.value = true;
        error.value = null;

        // Fetch pending posts from backend
        posts.value = await PostService.getAllPendingApprovalPosts();
    } catch (err: any) {
        console.error('Error fetching pending posts:', err);
        error.value = err.response?.data?.message || 'Failed to fetch pending posts';
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchPendingPosts();
});
</script>

<template>
    <Layout>
        <div v-if="error" class="text-red-500 text-sm px-4 py-2 bg-red-100 rounded mb-4">
            {{ error }}
        </div>

        <div v-if="loading && posts.length === 0" class="text-center py-8">
            Loading pending posts...
        </div>

        <PendingPosts :posts="posts" @approvePost="handleApprovePost" @denyPost="handleDenyPost"
            @selectUser="handleSelectUser" />

        <UserAccount :user="selectedUser" :posts="userPosts" />
    </Layout>
</template>
