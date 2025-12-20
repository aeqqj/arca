<script setup lang="ts">
import { FileText, CircleCheck, CircleX } from "lucide-vue-next";
import type { PostResponse } from "@/types/Post";
import { UserService } from "@/services/UserService";
import { computed, ref, onMounted } from "vue";

const props = defineProps<{
    post: PostResponse;
}>()

const emit = defineEmits<{
    (e: 'selectUser', userId: number): void
    (e: 'approvePost', postId: number): void
    (e: 'denyPost', postId: number): void
}>()

const postAuthorProfilePicture = ref<string | null>(null);

const avatar = computed(() => {
    if (!postAuthorProfilePicture.value) return '/newaccount.png';
    return postAuthorProfilePicture.value;
});

function approvePost() {
    emit('approvePost', props.post.post_id);
}

function denyPost() {
    emit('denyPost', props.post.post_id);
}

function selectUser() {
    emit('selectUser', props.post.user_id);
}

const timeDisplay = computed(() => {
    if (!props.post) return "just now";

    const createdAt = new Date(props.post.created_at);
    const now = new Date();

    const diffMs = now.getTime() - createdAt.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) {
        return "just now";
    }

    if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    }

    if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    }

    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
});

function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";

    const k = 1024;
    const units = ["B", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = bytes / Math.pow(k, i);

    return `${size.toFixed(size < 10 ? 1 : 0)} ${units[i]}`;
}

// Fetch post author's profile picture
async function fetchPostAuthorProfile() {
    try {
        if (props.post.user_id) {
            const userDetails = await UserService.getUserDetails(props.post.user_id);
            postAuthorProfilePicture.value = userDetails.profile_picture || null;
        }
    } catch (err: any) {
        console.error('Error fetching post author profile:', err);
        postAuthorProfilePicture.value = null;
    }
}

onMounted(async () => {
    await fetchPostAuthorProfile();
});

</script>

<template>
    <div class="h-fit w-200 p-6 bg-background1 flex flex-col text-left gap-8 rounded-xl">
        <div class="flex flex-col gap-8">
            <div class="flex justify-between items-start">
                <div class="flex gap-5">
                    <img :src="avatar" alt="avatar" class="h-16 w-16 rounded-2xl">
                    <div>
                        <p class="text-[1.25em]">{{ post.title }}</p>
                        <p class="opacity-80">{{ post.first_name }} {{ post.last_name }}
                            <span class="opacity-60 text-[0.725rem]">• {{ timeDisplay }}
                            </span>
                        </p>
                    </div>
                </div>
                <button class="border rounded-xl px-4 py-1 text-sm opacity-80" @click="selectUser">View User</button>
            </div>
            <p>{{ post.content }}</p>
        </div>
        <div class="flex gap-4" v-if="post.files && post.files.length">
            <div v-for="file in post.files" :key="file.id"
                class="flex items-center h-fit w-fit px-3 py-2 bg-background2 gap-2 rounded-xl shadow-lg">
                <div class="bg-background0/40 h-fit w-fit p-3 rounded-xl">
                    <FileText :size="16" class="text-foreground0/80" />
                </div>
                <div class="flex flex-col font-medium">
                    <p class="text-sm ">{{ file.file_name }}.pdf</p>
                    <p class="text-[0.5rem] opacity-60 ">{{ formatFileSize(file.file_size) }}</p>
                </div>
            </div>
        </div>
        <div>
            <div class="flex justify-between items-center">
                <div class="flex gap items-center gap-3">
                    <div class="w-fit flex gap-4 items-center">
                        <button @click="approvePost"
                            class="flex justify-center items-center px-4 py-3 gap-2 bg-background2/60 rounded-xl shadow-lg">
                            <CircleCheck class="text-green-300" />
                            Approve
                        </button>
                        <button @click="denyPost"
                            class="flex justify-center items-center px-4 py-3 gap-2 bg-background2/60 rounded-xl shadow-lg">
                            <CircleX class="text-red-300" />
                            Deny
                        </button>
                    </div>
                </div>
                <p class="px-4 py-1 bg-dsa rounded-2xl text-background1">{{ post.post_tag }}</p>
            </div>
        </div>
    </div>
</template>
