<script setup lang="ts">
import SearchBar from "./MainSearchBar.vue"
import { CirclePlus, Shield, Vault, User } from "lucide-vue-next"

const school: string = "SAS";
</script>

<template>
    <div
        class="h-16 px-6 py-2 flex justify-between items-center border-b border-foreground0/20 fixed top-0 left-0 right-0 bg-background0 z-50">
        <button class="font-outfit font-semibold text-2xl">arca • {{ school }}</button>
        <SearchBar />
        <div class="flex justify-between items-center gap-6 text-foreground0/60">
            <button class="flex h-fit w-fit px-3 py-1 gap-2 border rounded-xl">
                <Shield :size="20" />
                <p>Admin</p>
            </button>
            <button class="flex h-fit w-fit px-3 py-1 gap-2 border rounded-xl">
                <CirclePlus :size="20" />
                <p>Create</p>
            </button>
            <button>
                <Vault :size="28" />
            </button>
            <button>
                <User :size="28" />
            </button>
        </div>
    </div>
</template>
