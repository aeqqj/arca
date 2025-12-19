<script setup lang="ts">
import { ref, computed } from "vue";
import { FileText, ArrowUp, ArrowDown, ExternalLink } from "lucide-vue-next";
import type { PostResponse } from "@/types/Post";

const props = defineProps<{
    post: PostResponse;
}>()

const avatar = "/newaccount.png";

const timeDisplay = computed(() => {
    if (!props.post) return "just now";

    const createdAt = new Date(props.post.createdAt);
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

const vote = ref<'up' | 'down' | null>(null);
const voteCount = ref(0)

function updoot() {
    if (vote.value === 'up') {
        vote.value = null;
        voteCount.value -= 1;
    } else {
        if (vote.value === 'down') {
            voteCount.value += 1;
        }
        vote.value = 'up';
        voteCount.value += 1; // negates the -1 and ADDS another 1
    }
}

function downdoot() {
    if (vote.value === 'down') {
        vote.value = null;
        voteCount.value += 1;
    } else {
        if (vote.value === 'up') {
            voteCount.value -= 1;
        }
        vote.value = 'down';
        voteCount.value -= 1;
    }
}

</script>

<template>
    <div class="h-fit w-200 p-6 bg-background1 flex flex-col text-left gap-8 rounded-xl shadow-xl">
        <div class="flex flex-col gap-8">
            <div class="flex justify-between items-start">
                <div class="flex gap-5">
                    <img :src="avatar" alt="avatar" class="h-16 w-16 rounded-2xl">
                    <div>
                        <p class="font-semibold text-[1.25rem]">{{ post.title }}</p>
                        <p class="font-medium opacity-80">{{ post.firstName }} {{ post.lastName }}
                            <span class="opacity-60 text-[0.725rem]">• {{ timeDisplay }}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <p class="opacity-80">{{ post.content }}</p>
        </div>
        <div class="flex gap-4" v-if="post.files && post.files.length">
            <div v-for="file in post.files" :key="file.id"
                class="flex items-center h-fit w-fit p-3 bg-background2 gap-2 rounded-xl shadow-lg">
                <div class="bg-background0/40 h-fit w-fit p-3 rounded-xl">
                    <FileText :size="16" />
                </div>
                <div class="flex flex-col font-medium">
                    <p class="text-sm">{{ file.fileName }}.pdf</p>
                    <p class="text-[0.5rem] opacity-60">{{ formatFileSize(file.fileSize) }}</p>
                </div>
            </div>
        </div>
        <div>
            <div class="flex justify-between items-center">
                <div class="flex gap items-center gap-3">
                    <div class="w-fit flex gap-4 items-center">
                        <button @click="updoot">
                            <ArrowUp class="h-fit w-fit p-3 bg-background2/60 rounded-xl shadow-lg"
                                :class="vote === 'up' ? 'text-green-300' : 'text-foreground0'" />
                        </button>
                        <p :class="vote === 'up' ? 'text-green-300' : (vote === 'down' ? 'text-red-300' : 'text-foreground0')">
                            {{ voteCount }}
                        </p>
                        <button @click="downdoot">
                            <ArrowDown class="h-fit w-fit p-3 bg-background2/60 rounded-xl shadow-lg"
                                :class="vote === 'down' ? 'text-red-300' : 'text-foreground0'" />
                        </button>
                    </div>
                    <ExternalLink class="h-fit w-fit p-3 bg-background2/60 rounded-xl shadow-lg" />
                </div>
                <p class="px-4 py-1 bg-dsa rounded-2xl text-background1">{{ post.postTags }}</p>
            </div>
        </div>
    </div>
</template>
