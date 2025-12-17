<script setup lang="ts">
import MainLayout from '@/components/MainLayout.vue';
import Post from '@/components/Post.vue';
import { ChevronDown } from 'lucide-vue-next';
</script>

<template>
    <MainLayout>
        <div class="flex flex-col gap-6">
            <p class="flex items-center w-fit gap-1">Best <ChevronDown :size="20"/></p>
            <div class="flex flex-col gap-8">
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    </MainLayout>
</template>
