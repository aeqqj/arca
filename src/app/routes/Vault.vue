<script setup lang="ts">
import MainLayout from '@/components/MainLayout.vue';
import Post from '@/components/Post.vue';
import { ChevronDown } from 'lucide-vue-next';
import { dummyPostResponses } from '@/dummy/DummyPostResponse';
import type { PostResponse } from '@/types/Post';
import { ref, onMounted } from 'vue';

const posts = ref<PostResponse[]>([]);

onMounted(() => {
  posts.value = dummyPostResponses;
});

</script>

<template>
    <MainLayout>
        <div class="flex flex-col gap-6">
            <p class="flex items-center w-fit gap-1">Best <ChevronDown :size="20"/></p>
            <div class="flex flex-col gap-8">
                <Post v-for="post in posts" :key="post.id" :post="post" />
            </div>
        </div>
    </MainLayout>
</template>
