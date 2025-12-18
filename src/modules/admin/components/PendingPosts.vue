<script setup lang="ts">
import Post from './Post.vue';
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex justify-between items-end">
            <p class="font-semibold text-start text-2xl">Pending Posts</p>
            <p class="text-xs font-medium">3 posts awaiting response</p>
        </div>
        <div class="flex flex-col gap-8">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    </div>
</template>
