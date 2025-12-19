<script setup lang="ts">
import Layout from '@/modules/admin/components/Layout.vue';
import PendingPosts from '@/modules/admin/components/PendingPosts.vue';
import UserAccount from '@/modules/admin/components/UserAccount.vue';
import { dummyPostResponses } from '@/dummy/DummyPostResponse';
import { dummyUsers } from '@/dummy/DummyUsers'
import type { PostType } from '@/types/Post';
import type { UserType } from "@/types/User";
import { ref, onMounted } from 'vue';

const posts = ref<PostType[]>([]);
const selectedUser = ref<UserType | null>(null);

function handleApprovePost(postId: number) {
    const post = posts.value.find(p => p.postId === postId)
    if (post) {
        post.status = 'APPROVED';
        selectedUser.value = null;
    }
}

function handleDenyPost(postId: number) {
    const post = posts.value.find(p => p.postId === postId)
    if (post) {
        post.status = 'REJECTED';
        selectedUser.value = null;
    }
}

function handleSelectUser(userId: number) {
    const user = dummyUsers.find(u => u.id === userId) || null;
    selectedUser.value = user;
}

onMounted(() => {
    posts.value = dummyPostResponses;
})

</script>

<template>
    <Layout>
        <PendingPosts :posts="posts" @approvePost="handleApprovePost" @denyPost="handleDenyPost"
            @selectUser="handleSelectUser" />
        <UserAccount :user="selectedUser" :posts="posts"/>
    </Layout>
</template>
