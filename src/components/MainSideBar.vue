<script setup lang="ts">
import { computed } from "vue";
import type { Subject } from "@/types/Subject";
import { dummySubjects } from "@/dummy/DummySubjects";
import { dummyDepartmentSubjects } from "@/dummy/DummyDepartmentSubjects";
import { useRouter } from "vue-router";  // <--- import useRouter

const department = {
    id: 1,
    code: "DCISM",
    name: "Department of Computer, Information Sciences and Mathematics"
};

const emit = defineEmits<{
    (e: "selectSubject", subjectName: string): void;
}>();

const router = useRouter(); 

function handleSelectSubject(subjectName: string) {
    emit('selectSubject', subjectName);
    router.push('/home');
}

const departmentSubjects = computed<Subject[]>(() => {
    const subjectIds = dummyDepartmentSubjects
        .filter(ds => ds.department_id === department.id)
        .map(ds => ds.subject_id);

    return dummySubjects.filter(subject =>
        subjectIds.includes(subject.id)
    );
});
</script>

<template>
    <div class="h-full w-[280px] px-6 py-21 border-r border-foreground0/20
           gap-4 flex flex-col items-start fixed overflow-y-auto">
        <h4 class="font-semibold">{{ department.code }}</h4>

        <ol class="font-medium text-base text-foreground0/60
             flex flex-col gap-5 text-start">
            <li v-for="subject in departmentSubjects" :key="subject.id">
                <button @click="handleSelectSubject(subject.name)">
                    {{ subject.name }}
                </button>
            </li>
        </ol>
    </div>
</template>

<style scoped>
button {
    text-align: start;
}
</style>
