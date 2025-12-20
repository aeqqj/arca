<script setup lang="ts">
import MainLayout from '@/components/MainLayout.vue';
import Post from '@/components/Post.vue';
import { ChevronDown } from 'lucide-vue-next';
import { usePostApi } from '@/composables/UsePostApi';
import { useAuthStore } from '@/modules/authentication/store/authStore';
import { ref, onMounted, computed } from 'vue';
import type { PostResponse } from '@/types/Post';

const posts = ref<PostResponse[]>([]);
const sortBy = ref<'best' | 'recent'>('best');
const selectedSubject = ref<string | null>(null);
const showSortMenu = ref(false);
const loading = ref(true);
const error = ref('');

const auth = useAuthStore();
const postApi = usePostApi();

const onSubjectSelected = (subjectId: number, subjectName: string) => {
    if (selectedSubject.value === subjectName) {
        selectedSubject.value = null;
    } else {
        selectedSubject.value = subjectName;
    }
}

const handleClearFilter = () => {
    selectedSubject.value = null; // Clear the filter to show all posts
}

const filteredPosts = computed(() => {
    if (!selectedSubject.value) {
        return posts.value;
    }
    return posts.value.filter(
        post => post.post_tag?.includes(selectedSubject.value!)
    );
});

const sortedPosts = computed(() => {
    const copy = [...filteredPosts.value];
    if (sortBy.value === 'recent') {
        return copy.sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        );
    }
    // best
    return copy.sort((a, b) => b.upvote_count - a.upvote_count);
});

const setSort = (value: 'best' | 'recent') => {
    sortBy.value = value;
    showSortMenu.value = false;
};

onMounted(async () => {
    loading.value = true;
    try {
        // Replace with your logic for departmentId if needed
        const departmentId = 1; // example
        posts.value = await postApi.getAllDepartmentPosts(departmentId);
    } catch (err: any) {
        console.error('Failed to fetch posts:', err);
        error.value = 'Failed to load posts';
    } finally {
        loading.value = false;
    }
})
</script>

<template>
    <MainLayout @selectSubject="onSubjectSelected" @clearFilter="handleClearFilter">
        <div class="flex flex-col gap-6">
            <div class="relative w-fit">
                <p class="flex items-center gap-1 cursor-pointer select-none" @click="showSortMenu = !showSortMenu">
                    {{ sortBy === 'best' ? 'Best' : 'Recent' }}
                    <ChevronDown :size="20" class="transition-transform" :class="{ 'rotate-180': showSortMenu }" />
                </p>
                <div v-if="showSortMenu" class="absolute z-10 mt-2 w-28 rounded-lg bg-background1 shadow-lg">
                    <button class="w-full px-4 py-2 text-left hover:bg-muted" @click="setSort('best')">
                        Best
                    </button>
                    <button class="w-full px-4 py-2 text-left hover:bg-muted" @click="setSort('recent')">
                        Recent
                    </button>
                </div>
            </div>
            <div class="flex flex-col gap-8">
                <div v-if="loading">Loading posts...</div>
                <div v-else-if="error">{{ error }}</div>
                <Post v-for="post in sortedPosts" :key="post.id" :post="post" />
            </div>
        </div>
    </MainLayout>
</template>
