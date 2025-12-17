<script setup lang="ts">
import MainLayout from '@/components/MainLayout.vue';
import CreatePost from '@/modules/create/components/CreatePost.vue';
import PickCourse from '@/modules/create/components/PickCourse.vue';
import { ref } from 'vue';

const selectedCourse = ref<string | null>(null);

function handleCourseSelected(course: string | null) {
    selectedCourse.value = course;
}

</script>

<template>
    <MainLayout>
        <CreatePost :selectedCourse="selectedCourse" />
        <PickCourse @courseSelected="handleCourseSelected" />
    </MainLayout>
</template>
