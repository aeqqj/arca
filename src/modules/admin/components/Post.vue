<script setup lang="ts">
import { FileText, CircleCheck, CircleX, ExternalLink } from "lucide-vue-next";

interface Content {
    title: string;
    user: string;
    time: number;
    description: string;
    tag: string;
    files: {
        id: number;
        name: string;
        size: number;
    }[],
}

// run an equation to get the mb of the size (also fix the time thing, make it more efficient bruhhh)
const childlover: Content = {
    title: "Stacks & Queues Notes v1",
    user: "Jian Bryce Machacon",
    time: 240,
    description: "I made this for my baby aike, I love you baby <33",
    tag: "Data Structures & Algorithms",
    files: [
        { id: 1, name: "stacks", size: 1.2 },
        { id: 2, name: "queues", size: 3.23 },
        { id: 3, name: "li-implementation", size: 1.11 },
    ],
}

const avatar = "/newaccount.png";

let time = childlover.time;
let hourStr = "minutes ago";

if (childlover.time > 60) {
    time = Math.floor(childlover.time / 60);
    hourStr = "hours ago";
}

</script>

<template>
    <div class="h-fit w-[800px] p-6 bg-background1 flex flex-col text-left gap-8 rounded-xl">
        <div class="flex flex-col gap-8">
            <div class="flex gap-5">
                <img :src="avatar" alt="avatar" class="h-16 w-16 rounded-2xl">
                <div>
                    <p class="text-[1.25em] ">{{ childlover.title }}</p>
                    <p class="text-[0.5] opacity-80">{{ childlover.user }} <span class="opacity-60 text-[0.625rem]">• {{
                        time
                            }} {{ hourStr }} </span></p>
                </div>
            </div>
            <p>{{ childlover.description }}</p>
        </div>
        <div class="flex class gap-4">
            <div v-for="file in childlover.files" :key="file.id"
                class="flex items-center h-fit w-fit px-4 py-2 bg-background2 gap-2 rounded-xl shadow-lg">
                <div class="bg-background0/60 h-fit w-fit p-3 rounded-4xl">
                    <FileText :size="16"/>
                </div>
                <div class="flex flex-col">
                    <p class="text-sm">{{ file.name }}.pdf</p>
                    <p class="text-[0.5rem] opacity-60">{{ file.size }} mb</p>
                </div>
            </div>
        </div>
        <div>
            <div class="flex justify-between items-center">
                <div class="flex gap items-center gap-3">
                    <div class="w-fit flex gap-4 items-center">
                        <button
                            class="flex justify-center items-center px-4 py-3 gap-2 bg-background2/60 rounded-xl shadow-lg">
                            <CircleCheck class="text-green-300" />
                            Approve
                        </button>
                        <button
                            class="flex justify-center items-center px-4 py-3 gap-2 bg-background2/60 rounded-xl shadow-lg">
                            <CircleX class="text-red-300" />
                            Deny
                        </button>
                    </div>
                </div>
                <p class="px-4 py-1 bg-dsa rounded-2xl text-background1">{{ childlover.tag }}</p>
            </div>
        </div>
    </div>
</template>
