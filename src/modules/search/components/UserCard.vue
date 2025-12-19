<script setup lang="ts">
import type { User } from '@/types/User';

const avatar = "/newaccount.png"

const props = defineProps<{
    user: User
}>()

</script>

<template>
    <button class="w-220 flex bg-background1 p-6 rounded-xl justify-between shadow-xl text-start">
        <div class="flex justify-start gap-5">
            <img :src="avatar" alt="avatar" class="h-16 w-16 rounded-2xl" />
            <div class="h-full flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                    <div class="flex gap-4">
                        <p class="text-[1.35rem] font-semibold">
                            {{ user.first_name }} {{ user.last_name }}
                        </p>
                        <span
                            class="text-xs font-medium bg-background2 px-3 py-0.5 border-2 rounded-xl border-background3">
                            {{ user.roles[0] }}
                        </span>
                    </div>

                    <p class="text-xs font-semibold opacity-60">
                        {{ user.course }} • {{ user.department }}
                    </p>
                </div>

                <p class="text-sm font-medium">
                    {{ user.bio || 'No bio provided.' }}
                </p>
            </div>
        </div>
    </button>
</template>
