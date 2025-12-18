<script setup lang="ts">
import MainHeader from "@/components/MainHeader.vue"
</script>

<template>
    <section class="w-screen h-screen flex flex-col text-center">
        <MainHeader />
        <div class="h-full w-full flex items-start absolute">
            <div class="w-full px-60 pt-36 flex gap-20">
                <slot></slot>
            </div>
        </div>
        <h1 class="z-50 -bottom-12 right-0 font-semibold text-foreground0/15 fixed">Admin</h1>
    </section>
</template>
