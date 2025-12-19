<script setup lang="ts">
import Layout from "@/modules/search/components/Layout.vue";
import UserCard from "@/modules/search/components/UserCard.vue";
import Post from "@/components/Post.vue";
import type { PostResponse } from "@/types/Post";
import type { User } from "@/types/User";
import { dummyUsers } from "@/dummy/DummyUsers";
import { dummyPostResponses } from "@/dummy/DummyPostResponse";
import { ref, onMounted } from "vue";

const posts = ref<PostResponse[]>([]);
const users = ref<User[]>([]);
const viewMode = ref<"posts" | "users">("posts");

onMounted(() => {
    posts.value = dummyPostResponses;
    users.value = dummyUsers;
});
</script>

<template>
    <Layout>
        <div class="flex flex-col gap-6">
            <!-- Toggle buttons -->
            <div class="flex gap-3 font-medium">
                <button @click="viewMode = 'posts'" :class="{
                    'bg-foreground0 text-background0 border': viewMode === 'posts'
                }" class="px-4 py-1 border border-foreground0/60 rounded-xl">
                    Posts
                </button>
                <button @click="viewMode = 'users'" :class="{
                    'bg-foreground0 text-background0 border': viewMode === 'users'
                }" class="px-4 py-1 border border-foreground0/60 rounded-xl">
                    Users
                </button>
            </div>

            <!-- Conditional rendering -->
            <div class="flex flex-col" :class="viewMode === 'users' ? 'gap-4' : 'gap-8'">
                <UserCard v-if="viewMode === 'users'" v-for="user in users" :key="user.id" :user="user" />
                <Post v-else v-for="post in posts" :key="post.id" :post="post" />
            </div>
        </div>
    </Layout>
</template>
