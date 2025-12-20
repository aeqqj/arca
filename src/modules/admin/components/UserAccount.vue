<script setup lang="ts">
import { Mail, FileText, Gavel } from 'lucide-vue-next';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { PostResponse } from '@/types/Post';
import type { User } from '@/types/User';

const props = defineProps<{
    user: User | null;
    posts: PostResponse[];
}>();

const router = useRouter();

const totalPosts = computed(() => {
    if (!props.user) return 0;
    return props.posts.filter(p => p.user_id === props.user!.id && p.status === 'APPROVED').length;
});

function viewProfile() {
    if (!props.user?.id) return;
    const route = router.resolve({
        name: 'Profile',
        params: { userId: props.user.id }
    });
    window.open(route.href, '_blank');
}
</script>

<template>
    <div class="h-fit flex flex-col gap-4 shadow-xl sticky top-36">
        <p class="font-semibold text-start text-2xl opacity-70">User Account</p>
        <div v-if="user" class="w-120 h-fit bg-background1 flex flex-col items-center gap-8 px-8 py-12 rounded-xl">
            <img :src="user.profile_picture" alt="pfp" class="h-32 w-32 rounded-2xl">
            <div class="flex flex-col gap-2">
                <p class="text-2xl font-medium">{{ user.first_name }} {{ user.last_name }}</p>
                <p>
                    <span
                        class="font-medium opacity-80 bg-background2 px-3 py-0.5 border-2 rounded-xl border-background3">
                        {{ user.email.split('@')[0] }}
                    </span>
                </p>
            </div>
            <div class="w-full flex flex-col gap-8">
                <div class="w-full h-fit flex flex-col gap-4 text-sm">
                    <div class="flex text-start gap-4 items-center">
                        <div class="p-3 bg-background2 w-fit h-fit rounded-xl">
                            <Mail :size="20" class="text-foreground0/80" />
                        </div>
                        <div>
                            <p class="opacity-60">Email</p>
                            <p>{{ user.email }}</p>
                        </div>
                    </div>
                    <div class="flex text-start gap-4 items-center">
                        <div class="p-3 bg-background2 w-fit h-fit rounded-xl">
                            <FileText :size="20" class="text-foreground0/80" />
                        </div>
                        <div>
                            <p class="opacity-60">Total Posts</p>
                            <p>{{ totalPosts }}</p>
                        </div>
                    </div>
                </div>
                <div class="w-full h-fit flex gap-4">
                    <button @click="viewProfile"
                        class="w-full bg-foreground0 text-background1 py-2 rounded-xl hover:opacity-90 transition-opacity">
                        View Profile
                    </button>
                    <button class="p-2 border border-red-400 rounded-xl hover:bg-red-400/10 transition-colors">
                        <Gavel class="text-red-400" :size="24" />
                    </button>
                </div>
            </div>
        </div>
        <div v-else
            class="w-120 h-fit flex flex-col items-center border border-foreground0/20 px-8 py-12 rounded-xl text-lg font-semibold text-foreground0/20">
            No user selected
        </div>
    </div>
</template>
