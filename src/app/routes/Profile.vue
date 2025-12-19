<script setup lang="ts">
import Layout from '@/modules/profile/components/Layout.vue';
import Post from '@/components/Post.vue';
import { ref, onMounted } from 'vue';
import type { PostType } from '@/types/Post';
import { dummyPostResponses } from '@/dummy/DummyPostResponse';

const posts = ref<PostType[]>([]);

onMounted(() => {
    posts.value = dummyPostResponses;
});

</script>

<template>
    <Layout>
        <div class="flex gap-20">
            <div class="flex flex-col gap-14">
                <div class="flex gap-8 items-end">
                    <img src="/newaccount.png" alt="picture" class="h-64 w-64 rounded-2xl">
                    <div class="w-lg text-start pb-4 border-t border-foreground0/60 font-semibold">
                        <h4>Jian Bryce Machacon</h4>
                        <div>
                            <p class="font-semibold text-foreground0/60">BSCS 2 • SAS - DCISM</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-6">
                    <div class="flex gap-6">
                        <button
                            class="px-4 py-1 text-background0 border border-foreground0/60 bg-foreground0 rounded-2xl">Posts</button>
                        <button class="px-4 py-1 border border-foreground0/60 rounded-2xl">About me</button>
                    </div>
                    <div class="flex flex-col gap-8">
                    </div>
                    <Post v-for="post in posts" :key="post.id" :post="post" />
                </div>
            </div>
        </div>
    </Layout>
</template>
