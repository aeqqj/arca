<script setup lang="ts">
import Header from "./Header.vue";
</script>

<template>
    <section class="w-screen h-screen flex flex-col text-center">
        <AuthHeader />
        <div class="h-full flex flex-col gap-4 justify-center items-center">
            <slot></slot>
        </div>
    </section>
</template>
