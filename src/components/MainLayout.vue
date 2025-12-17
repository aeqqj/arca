<script setup lang="ts">
import MainHeader from "./MainHeader.vue"
import MainSideBar from "./MainSideBar.vue"

let department: string = "DCISM"
</script>

<template>
    <section class="w-screen h-screen flex flex-col text-center">
        <MainHeader />
        <div class="h-full flex items-start absolute">
            <MainSideBar />
            <div class="pl-90 pt-36 flex gap-24">
                <slot></slot>
            </div>
        </div>
        <h1 class="z-50 -bottom-12 right-0 font-semibold text-foreground0/15 fixed">{{ department }}</h1>
    </section>
</template>
