<script setup lang="ts">
import CourseItem from './CourseItem.vue';
import SearchBar from './SearchBar.vue'
import type { CourseType, Course } from '../types/Course';
import CourseColors from '@/assets/CourseColors.json';
import { reactive, computed, ref } from 'vue';


// initialize courses (change later)
const courses: CourseType[] = Object.keys(CourseColors).map((c) => ({
    course: c as Course,
    selected: false,
}));

const state = reactive({ courses });
const searchQuery = ref('');

// Emit to parent
const emit = defineEmits<{
    (e: 'courseSelected', course: string | null): void
}>();

// Filter courses based on search query
const filteredCourses = computed(() => {
    if (!searchQuery.value.trim()) {
        return state.courses;
    }
    const query = searchQuery.value.toLowerCase();
    return state.courses.filter((c) =>
        c.course.toLowerCase().includes(query)
    );
});

function selectCourse(course: string) {
    const alreadySelected =
        state.courses.find(c => c.course === course)?.selected;

    state.courses.forEach(c => {
        c.selected = false;
    });

    if (!alreadySelected) {
        state.courses.find(c => c.course === course)!.selected = true;
        emit('courseSelected', course);
    } else {
        emit('courseSelected', null);
    }
}

function handleSearchUpdate(value: string) {
    searchQuery.value = value;
}
</script>

<template>
    <div class="w-120 flex flex-col gap-5">
        <SearchBar @update:search="handleSearchUpdate" />
        <div
            class="flex flex-col gap-5 p-4 border border-background3 rounded-xl h-167 overflow-y-auto overscroll-contain">
            <CourseItem v-for="c in filteredCourses" :key="c.course" :course="c" :onSelect="selectCourse" />
        </div>
    </div>
</template>
