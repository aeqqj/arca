<script setup lang="ts">
import CourseItem from './CourseItem.vue';
import SearchBar from './SearchBar.vue';
import type { CourseType, Course } from '../types/Course';
import CourseColors from '@/assets/CourseColors.json';
import type { SubjectResponse } from '@/types/Subject';
import { SubjectService } from '@/services/SubjectService';
import { reactive, computed, ref, onMounted } from 'vue';

const searchQuery = ref('');
const loading = ref(true);
const error = ref<string | null>(null);

const emit = defineEmits<{
    (e: 'courseSelected', course: SubjectResponse | null): void
}>();

const state = reactive<{
    courses: CourseType[],
    subjectsMap: Map<string, SubjectResponse>
}>({
    courses: [],
    subjectsMap: new Map()
});

// Fetch subjects from API
onMounted(async () => {
    try {
        loading.value = true;
        const subjects = await SubjectService.getAllSubjects();

        state.courses = subjects
            .filter(subject => subject.name in CourseColors)
            .map((subject) => {
                state.subjectsMap.set(subject.name, subject);
                return {
                    course: subject.name as Course,
                    selected: false,
                };
            });
    } catch (err) {
        console.error('Error loading subjects:', err);
        error.value = 'Failed to load courses';
    } finally {
        loading.value = false;
    }
});

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
        const subjectObject = state.subjectsMap.get(course) ?? null;
        emit('courseSelected', subjectObject); 
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
            <div v-if="loading" class="text-center text-foreground0/60">Loading courses...</div>
            <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
            <CourseItem v-else v-for="c in filteredCourses" :key="c.course" :course="c" :onSelect="selectCourse" />
        </div>
    </div>
</template>
