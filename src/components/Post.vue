<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { FileText, ArrowUp, ArrowDown, ExternalLink } from "lucide-vue-next";
import type { PostResponse } from "@/types/Post";
import { VoteService } from "@/services/VoteService";
import { useAuthStore } from '@/modules/authentication/store/authStore';
import { useUserSearch } from '@/composables/getUserSearch';

const props = defineProps<{
    post: PostResponse;
}>()

const auth = useAuthStore();
const { getUserIdByEmail } = useUserSearch();
const avatar = "/newaccount.png";

const timeDisplay = computed(() => {
    if (!props.post || !props.post.created_at) return "just now";

    let createdAt = new Date(props.post.created_at);

    if (!props.post.created_at.endsWith('Z')) {
        createdAt = new Date(props.post.created_at + 'Z');
    }

    const now = new Date();

    if (isNaN(createdAt.getTime())) {
        console.error('Invalid created_at date:', props.post.created_at);
        return "unknown time";
    }

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

    if (diffDays < 30) {
        return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    }

    if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months !== 1 ? "s" : ""} ago`;
    }

    const years = Math.floor(diffDays / 365);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
});

function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";

    const k = 1024;
    const units = ["B", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = bytes / Math.pow(k, i);

    return `${size.toFixed(size < 10 ? 1 : 0)} ${units[i]}`;
}

const vote = ref<'UPVOTE' | 'DOWNVOTE' | null>(null);
const voteCount = ref(0);
const userId = ref<number | null>(null);

// Fetch user's current vote and initialize vote count
async function fetchUserVote() {
    if (!userId.value) return;

    try {
        const userVote = await VoteService.getMyVote(props.post.post_id);
        if (userVote) {
            vote.value = userVote.vote_type;
        }
    } catch (err: any) {
        // User hasn't voted yet, that's fine
        if (err.response?.status !== 404) {
            console.error('Error fetching user vote:', err);
        }
    }
}

onMounted(async () => {
    // Initialize vote count from post data
    voteCount.value = props.post.upvote_count - props.post.downvote_count;

    // Get user ID from email if logged in
    if (auth.userEmail) {
        userId.value = await getUserIdByEmail(auth.userEmail);
        if (userId.value) {
            await fetchUserVote();
        }
    }
});

async function updoot() {
    if (!auth.userEmail) {
        console.error('User not logged in');
        return;
    }

    if (!userId.value) {
        userId.value = await getUserIdByEmail(auth.userEmail);
        if (!userId.value) {
            console.error('Could not find user ID');
            return;
        }
    }

    // Store previous state for rollback
    const previousVote = vote.value;
    const previousCount = voteCount.value;

    try {
        // Optimistic update - update UI immediately
        if (vote.value === 'UPVOTE') {
            vote.value = null;
            voteCount.value -= 1;
        } else {
            if (vote.value === 'DOWNVOTE') {
                voteCount.value += 2;
            } else {
                voteCount.value += 1;
            }
            vote.value = 'UPVOTE';
        }

        // Then make the API call
        if (previousVote === 'UPVOTE') {
            await VoteService.removeVote(props.post.post_id);
        } else {
            await VoteService.vote({
                post_id: props.post.post_id,
                vote_type: 'UPVOTE'
            });
        }
    } catch (err: any) {
        console.error('Error voting:', err);
        // Rollback on error
        vote.value = previousVote;
        voteCount.value = previousCount;
    }
}

async function downdoot() {
    if (!auth.userEmail) {
        console.error('User not logged in');
        return;
    }

    if (!userId.value) {
        userId.value = await getUserIdByEmail(auth.userEmail);
        if (!userId.value) {
            console.error('Could not find user ID');
            return;
        }
    }

    // Store previous state for rollback
    const previousVote = vote.value;
    const previousCount = voteCount.value;

    try {
        // Optimistic update - update UI immediately
        if (vote.value === 'DOWNVOTE') {
            vote.value = null;
            voteCount.value += 1;
        } else {
            if (vote.value === 'UPVOTE') {
                voteCount.value -= 2;
            } else {
                voteCount.value -= 1;
            }
            vote.value = 'DOWNVOTE';
        }

        // Then make the API call
        if (previousVote === 'DOWNVOTE') {
            await VoteService.removeVote(props.post.post_id);
        } else {
            await VoteService.vote({
                post_id: props.post.post_id,
                vote_type: 'DOWNVOTE'
            });
        }
    } catch (err: any) {
        console.error('Error voting:', err);
        // Rollback on error
        vote.value = previousVote;
        voteCount.value = previousCount;
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
                        <p class="font-medium opacity-80">{{ post.first_name }} {{ post.last_name }}
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
                    <FileText :size="16" class="text-foreground0/80" />
                </div>
                <div class="flex flex-col font-medium">
                    <p class="text-sm">{{ file.file_name }}.pdf</p>
                    <p class="text-[0.5rem] opacity-60">{{ formatFileSize(file.file_size) }}</p>
                </div>
            </div>
        </div>
        <div>
            <div class="flex justify-between items-center">
                <div class="flex gap items-center gap-3">
                    <div class="w-fit flex gap-4 items-center">
                        <button @click="updoot">
                            <ArrowUp
                                class="h-fit w-fit p-3 bg-background2/60 rounded-xl shadow-lg transition-colors hover:text-green-300"
                                :class="vote === 'UPVOTE' ? 'text-green-300' : 'text-foreground0'" />
                        </button>
                        <p class="font-semibold min-w-8 text-center"
                            :class="vote === 'UPVOTE' ? 'text-green-300' : (vote === 'DOWNVOTE' ? 'text-red-300' : 'text-foreground0')">
                            {{ voteCount }}
                        </p>
                        <button @click="downdoot">
                            <ArrowDown
                                class="h-fit w-fit p-3 bg-background2/60 rounded-xl shadow-lg transition-colors hover:text-red-300"
                                :class="vote === 'DOWNVOTE' ? 'text-red-300' : 'text-foreground0'" />
                        </button>
                    </div>
                    <ExternalLink class="h-fit w-fit p-3 bg-background2/60 rounded-xl shadow-lg" />
                </div>
                <p class="px-4 py-1 bg-dsa rounded-2xl text-background1">{{ post.post_tag }}</p>
            </div>
        </div>
    </div>
</template>
