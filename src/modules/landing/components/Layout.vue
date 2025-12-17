<script setup lang="ts">
import Header from './Header.vue';
</script>

<template>
    <section class="w-screen h-screen flex flex-col text-center">
        <Header />
        <div class="h-full flex flex-col gap-18 justify-center items-center">
            <slot />
        </div>
    </section>
</template>
