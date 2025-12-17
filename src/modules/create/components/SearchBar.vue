<script setup lang="ts">
import { ref, watch } from 'vue';
import { LucideSearch } from 'lucide-vue-next';

const searchQuery = ref('');

// Define emits correctly
const emit = defineEmits<{
  (e: 'update:search', value: string): void
}>();

// Watch input changes
watch(searchQuery, (val) => {
  emit('update:search', val);
});
</script>

<template>
    <div class="w-full px-7 py-4 flex items-center bg-background1/60 shadow-xl rounded-4xl gap-3">
        <LucideSearch />
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Search courses..."
            class="flex-1 bg-transparent outline-none text-sm"
        />
    </div>
</template>
