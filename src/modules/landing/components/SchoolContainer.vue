<script setup lang="ts">
import type { School } from '@/app/routes/Landing.vue';

interface Props {
    school: School;
}

defineProps<Props>()
</script>

<template>
    <div class="h-32 w-60 bg-background1 p-4 flex flex-col relative rounded-xl shadow-xl">
        <div class="flex flex-col gap-2 text-start">
            <component :is="school.icon"></component>
            <span class="font-poppins font-medium">
                {{ school.name }}
            </span>
        </div>
        <p class="font-poppins font-medium text-5xl opacity-15 absolute bottom-0.5 right-4">
            {{ school.acronym }}
        </p>
    </div>
</template>
