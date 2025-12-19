<script setup lang="ts">
import MainLayout from '@/components/MainLayout.vue';
import Post from '@/components/Post.vue';
import { ChevronDown } from 'lucide-vue-next';
import { dummyPostResponses } from '@/dummy/DummyPostResponse';
import { ref, onMounted, computed } from 'vue';
import type { PostResponse } from '@/types/Post';

const posts = ref<PostResponse[]>([]);
const sortBy = ref<'best' | 'recent'>('best');
const showSortMenu = ref(false);

onMounted(() => {
    posts.value = dummyPostResponses;
})

const sortedPosts = computed(() => {
    const copy = [...posts.value];

    if (sortBy.value === 'recent') {
        return copy.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );
    }

    // best
    return copy.sort((a, b) => b.upvoteCount - a.upvoteCount);
});

const setSort = (value: 'best' | 'recent') => {
    sortBy.value = value;
    showSortMenu.value = false;
};

</script>

<template>
    <MainLayout>
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
                <Post v-for="post in sortedPosts" :key="post.id" :post="post" />
            </div>
        </div>
    </MainLayout>
</template>
