<script setup lang="ts">
import Layout from "@/modules/search/components/Layout.vue";
import UserCard from "@/modules/search/components/UserCard.vue";
import Post from "@/components/Post.vue";
import type { PostResponse } from "@/types/Post";
import type { User } from "@/types/User";
import { PostService } from "@/services/PostService";
import { UserService } from "@/services/UserService";
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const posts = ref<PostResponse[]>([]);
const users = ref<User[]>([]);
const viewMode = ref<"posts" | "users">("posts");
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
    try {
        loading.value = true;
        error.value = null;

        const departmentId = 1; // You might want to fetch from all departments
        posts.value = await PostService.getAllDepartmentPost(departmentId);
       
        // Fetch all users
        users.value = await UserService.getAllUsers();
    } catch (err: any) {
        console.error('Error loading search data:', err);
        error.value = 'Failed to load search data';
    } finally {
        loading.value = false;
    }
});

const searchQuery = computed(() => {
    return ((route.query.q as string) || "").toLowerCase();
});

const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value.filter(u => !u.deleted);
    
    const q = searchQuery.value;
    return users.value.filter(user => {
        if (user.deleted) return false;
        
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        const email = user.email?.toLowerCase() || "";
        const course = user.course?.toLowerCase() || "";
        const department = user.department?.toLowerCase() || "";
        const bio = user.bio?.toLowerCase() || "";
        const roles = user.roles?.map(r => r.toLowerCase()).join(" ") || "";
        
        return (
            fullName.includes(q) ||
            email.includes(q) ||
            course.includes(q) ||
            department.includes(q) ||
            bio.includes(q) ||
            roles.includes(q)
        );
    });
});

const filteredPosts = computed(() => {
    if (!searchQuery.value) return posts.value;
    
    const q = searchQuery.value;
    return posts.value.filter(post => {
        const title = post.title?.toLowerCase() || "";
        const content = post.content?.toLowerCase() || "";
        const authorName = `${post.first_name} ${post.last_name}`.toLowerCase();
        const departmentName = post.department_name?.toLowerCase() || "";
        const tag = post.post_tag?.toLowerCase() || "";
        
        return (
            title.includes(q) ||
            content.includes(q) ||
            authorName.includes(q) ||
            departmentName.includes(q) ||
            tag.includes(q)
        );
    });
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
            <!-- Loading/Error states -->
            <div v-if="loading" class="text-center py-8">Loading...</div>
            <div v-else-if="error" class="text-red-500 text-center py-8">{{ error }}</div>
            
            <template v-else>
                <!-- Toggle buttons -->
                <div class="flex gap-3 font-medium">
                    <button @click="viewMode = 'posts'" :class="{
                        'bg-foreground0 text-background0 border': viewMode === 'posts'
                    }" class="px-4 py-1 border border-foreground0/60 rounded-xl">
                        Posts ({{ filteredPosts.length }})
                    </button>
                    <button @click="viewMode = 'users'" :class="{
                        'bg-foreground0 text-background0 border': viewMode === 'users'
                    }" class="px-4 py-1 border border-foreground0/60 rounded-xl">
                        Users ({{ filteredUsers.length }})
                    </button>
                </div>

                <!-- Search query display -->
                <p v-if="searchQuery" class="text-start text-sm opacity-60">
                    Searching for: "{{ route.query.q }}"
                </p>

                <!-- No results message -->
                <div v-if="viewMode === 'posts' && filteredPosts.length === 0" class="text-center py-8 opacity-60">
                    No posts found
                </div>
                <div v-if="viewMode === 'users' && filteredUsers.length === 0" class="text-center py-8 opacity-60">
                    No users found
                </div>

                <!-- Results -->
                <div class="flex flex-col" :class="viewMode === 'users' ? 'gap-4' : 'gap-8'">
                    <UserCard v-if="viewMode === 'users'" v-for="user in filteredUsers" :key="user.id" :user="user" />
                    <Post v-else v-for="post in filteredPosts" :key="post.id" :post="post" />
                </div>
            </template>
        </div>
    </Layout>
</template>
