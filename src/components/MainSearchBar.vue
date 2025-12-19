<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { LucideSearch } from "lucide-vue-next";

const router = useRouter();
const query = ref("");

const submitSearch = () => {
    if (!query.value.trim()) return;

    router.push({
        name: "Search",
        query: { q: query.value }
    });
};
</script>

<template>
    <div class="w-3xl px-6 py-4 flex items-center gap-4 bg-background1 shadow-xl rounded-4xl">
        <LucideSearch :size="20" class="opacity-60" />

        <input v-model="query" @keydown.enter="submitSearch" type="text" placeholder="Search posts, users, departments..."
            class="w-full bg-transparent outline-none text-sm placeholder:opacity-50" />
    </div>
</template>
