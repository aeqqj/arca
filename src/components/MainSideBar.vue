<script setup lang="ts">
const department: string = "DCISM"
</script>

<template>
    <div class="h-full w-[280px] px-6 py-21 border-r border-foreground0/20 gap-4 flex flex-col items-start fixed">
        <h4 class="font-semibold">{{ department }}</h4>
        <ol class="font-medium text-base text-foreground0/60 flex flex-col gap-6 text-start">
            <li><button>Programming </button></li>
            <li><button>Programming 2</button></li>
            <li><button>Data Structures and Algorithms</button></li>
            <li><button>Algorithms and Complexity</button></li>
            <li><button>Object Oriented Programming</button></li>
            <li><button>Networking 1</button></li>
            <li><button>Networking 2</button></li>
        </ol>
    </div>
</template>

<style scoped>
button {
    text-align: start;
}
</style>

