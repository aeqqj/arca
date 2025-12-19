<script setup lang="ts">
import Layout from "@/modules/search/components/Layout.vue";
import UserCard from "@/modules/search/components/UserCard.vue";
import Post from "@/components/Post.vue";
import type { PostType } from "@/types/Post";
import type { UserType } from "@/types/User";
import { dummyUsers } from "@/dummy/DummyUsers";
import { dummyPostResponses } from "@/dummy/DummyPostResponse";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { watch } from "vue";

const route = useRoute();

const posts = ref<PostType[]>([]);
const users = ref<UserType[]>([]);
const viewMode = ref<"posts" | "users">("posts");

onMounted(() => {
    posts.value = dummyPostResponses;
    users.value = dummyUsers;
});

const searchQuery = computed(() => {
    return ((route.query.q as string) || "").toLowerCase();
});

const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value.filter(u => !u.deleted);

    const q = searchQuery.value.toLowerCase();

    return users.value.filter(user => {
        if (user.deleted) return false;

        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();

        return (
            fullName.includes(q) ||
            user.email.toLowerCase().includes(q) ||
            user.course.toLowerCase().includes(q) ||
            user.department.toLowerCase().includes(q) ||
            user.roles.some(role => role.toLowerCase().includes(q)) ||
            (user.bio?.toLowerCase().includes(q) ?? false)
        );
    });
});

const filteredPosts = computed(() => {
    if (!searchQuery.value) return posts.value;

    return posts.value.filter(post =>
        post.title.toLowerCase().includes(searchQuery.value) ||
        post.content.toLowerCase().includes(searchQuery.value)
    );
});

watch(searchQuery, () => {
  const hasPosts = filteredPosts.value.length > 0;
  const hasUsers = filteredUsers.value.length > 0;

  // If current tab has no results but the other does → switch
  if (viewMode.value === "posts" && !hasPosts && hasUsers) {
    viewMode.value = "users";
  }

  if (viewMode.value === "users" && !hasUsers && hasPosts) {
    viewMode.value = "posts";
  }
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
                <UserCard v-if="viewMode === 'users'" v-for="user in filteredUsers" :key="user.id" :user="user" />

                <Post v-else v-for="post in filteredPosts" :key="post.id" :post="post" />
            </div>
        </div>
    </Layout>
</template>
