<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { SubjectResponse } from "@/types/Subject";
import { SubjectService } from "@/services/SubjectService";
import { useRouter } from "vue-router";

const router = useRouter();
const subjects = ref<SubjectResponse[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const emit = defineEmits<{
    (e: "selectSubject", subjectId: number, subjectName: string): void;
    (e: "clearFilter"): void;
}>();

// Fetch all subjects
onMounted(async () => {
    try {
        loading.value = true;
        const subjectsResponse = await SubjectService.getAllSubjects();
        subjects.value = subjectsResponse;
    } catch (err) {
        console.error('Error loading subjects:', err);
        error.value = 'Failed to load subjects';
    } finally {
        loading.value = false;
    }
});

function handleSelectSubject(subject: SubjectResponse) {
    emit('selectSubject', subject.id, subject.name);
    router.push({ name: 'Home', query: { subject: subject.id } });
}

function handleClearFilter() {
    emit('clearFilter');
    router.push({ name: 'Home' }); // Remove query params
}
</script>

<template>
    <div class="h-full w-[280px] px-6 py-21 border-r border-foreground0/20
           gap-4 flex flex-col items-start fixed overflow-y-auto">
        <div v-if="loading" class="text-foreground0/60">Loading...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <template v-else>
            <button @click="handleClearFilter" class="text-4xl font-semibold hover:text-foreground0/80 transition-colors">
                DCISM
            </button>
            <ol class="font-medium text-base text-foreground0/60
                 flex flex-col gap-5 text-start">
                <li v-for="subject in subjects" :key="subject.id">
                    <button @click="handleSelectSubject(subject)" class="hover:text-foreground0 transition-colors">
                        {{ subject.name }}
                    </button>
                </li>
            </ol>
        </template>
    </div>
</template>

<style scoped>
button {
    text-align: start;
}
</style>
