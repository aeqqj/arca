<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import type { CourseType } from '../types/Course';
import CourseColors from '@/assets/CourseColors.json';

interface Props {
    course: CourseType;
    onSelect: (c: string) => void;
}

defineProps<Props>();
</script>

<template>
    <button class="w-full flex bg-background1 p-6 rounded-xl justify-between shadow-xl text-start"
        @click="onSelect(course.course)">
        <div class="flex justify-start items-center gap-4">
            <div class="h-4 w-4 rounded-sm" :class="CourseColors[course.course]"></div>
            <p>{{ course.course }}</p>
        </div>
        <Check v-if="course.selected" />
    </button>
</template>
