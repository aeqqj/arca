<script setup lang="ts">
import type { PostType } from '@/types/Post';
import Post from './Post.vue';
import { computed } from 'vue';

const props = defineProps<{
    posts: PostType[]
}>()

const emit = defineEmits<{
    (e: 'selectUser', userId: number): void;
    (e: 'approvePost', postId: number): void;
    (e: 'denyPost', postId: number): void;
}>()

function handleApprovePost(postId: number) {
    emit('approvePost', postId);
}

function handleDenyPost(postId: number) {
    emit('denyPost', postId);
}

function handleSelectUser(userId: number) {
    emit('selectUser', userId);
}

const pendingPosts = computed(() => {
    return props.posts.filter(post => post.status != 'REJECTED' && post.status != 'APPROVED');
})

</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex justify-between items-end">
            <p class="font-semibold text-start text-2xl opacity-70">Pending Posts</p>
            <p class="text-xs font-medium opacity-70">{{ pendingPosts.length }} awaiting response</p>
        </div>
        <div v-if="pendingPosts.length === 0" class="flex w-200 h-200 p-6 border border-foreground0/20 rounded-xl justify-center items-center text-xl font-semibold text-foreground0/20">No Pending Posts</div>
        <div v-else class="flex flex-col gap-8">
            <Post v-for="post in pendingPosts" :key="post.id" :post="post" @approvePost="handleApprovePost"
                @denyPost="handleDenyPost" @selectUser="handleSelectUser"/>
        </div>
    </div>
</template>
