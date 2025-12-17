<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next';
import Layout from "@modules/landing/components/Layout.vue";
import SearchBar from "@modules/landing/components/SearchBar.vue"
import SchoolContainer from "@modules/landing/components/SchoolContainer.vue"
import { Wrench, Brush, FlaskConical } from "lucide-vue-next"

export interface School {
    name: string;
    acronym: string;
    icon: LucideIcon;
}

const schools: School[] = [
    { name: "School of Engineering", acronym: "SOE", icon: Wrench },
    { name: "School of Arts and Sciences", acronym: "SAS", icon: FlaskConical },
    { name: "School of Architecture, Fine Arts and Design", acronym: "SAFAD", icon: Brush }
]

</script>

<template>
    <Layout>
        <div class="flex flex-col gap-6">
            <h1 class="font-outfit font-semibold text-shadow-lg">
                arca
            </h1>
            <SearchBar />
        </div>
        <div class="flex gap-10">
            <SchoolContainer v-for="school in schools" :key="school.acronym" :school="school" />
        </div>
    </Layout>
</template>
