<script setup lang="ts">
import { FileText, Plus, X } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import CourseColor from '@/assets/CourseColors.json';

const file = ref<File[]>([]);

// files
function onFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const newFiles = Array.from(target.files ?? []);
    if (newFiles.length > 0) {
        const existingFileNames = new Set(file.value.map(f => f.name));
        const filteredNewFiles = newFiles.filter(f => !existingFileNames.has(f.name));
        file.value = [...file.value, ...filteredNewFiles];
    }
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) {
        return bytes + ' B'; // bytes
    } else if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(2) + ' KB'; // kilobytes
    } else {
        return (bytes / 1024 / 1024).toFixed(2) + ' MB'; // megabytes
    }
}

function removeFile(f: File) {
    file.value = file.value.filter(x => x !== f);
}

// props
const props = defineProps<{
    selectedCourse: string | null
}>();

const selectedCourseColor = computed(() => {
    if (!props.selectedCourse) return 'bg-background1';

    return CourseColor[props.selectedCourse as keyof typeof CourseColor];
});

</script>

<template>
    <div class="w-200 flex flex-col gap-8">
        <div class="flex justify-between h-fit">
            <p class="text-2xl font-semibold">Create Post</p>
            <div class="flex items-center justify-center">
                <span class="text-sm px-4 py-1 rounded-2xl" :class="selectedCourseColor">{{ selectedCourse ?? "No course selected"}}</span>
            </div>
        </div>
        <div class="text-start flex flex-col gap-10">
            <div class="flex flex-col relative h-fit">
                <label for="" class="absolute text-center left-6"><span
                        class="bg-background0 p-1 text-lg">Title</span></label>
                <input class="flex border rounded-xl border-background3 p-6 mt-3.5 text-xl"></input>
            </div>
            <div class="flex flex-col relative h-fit">
                <label for="" class="absolute text-center left-6"><span class="bg-background0 p-1 text-lg">Description
                        <span class="text-xs text-foreground0/40">(optional, unless it's a link!)</span></span></label>
                <textarea maxlength="500" rows="6" name="" id=""
                    class="flex border rounded-xl border-background3 p-6 mt-3.5 h-fit"></textarea>
            </div>

            <!-- NO ATTACHMENT -->
            <div class="flex flex-col relative h-fit">
                <label for="" class="absolute text-center left-6"><span
                        class="bg-background0 p-1 text-lg">Attachments</span></label>
                <div class="flex border rounded-xl border-background3 mt-3.5 justify-center p-6"
                    :class="file.length === 0 ? 'items-center h-76' : 'h-fit'">
                    <div v-if="file.length === 0" class="flex flex-col items-center gap-3">
                        <div class="h-fit w-fit p-4 bg-background1/60 rounded-full">
                            <FileText :strokeWidth="1" />
                        </div>
                        <div class="flex flex-col items-center gap-1">
                            <p class="text-sm font-medium">No attachments yet</p>
                            <p class="text-[0.625rem] text-foreground0/60">Add files to your post</p>
                        </div>
                        <input type="file" id="uploadFile" @change="onFileChange" />
                        <label for="uploadFile"
                            class="bg-foreground0 text-background1 px-3 py-1 mt-4 rounded-xl text-sm flex justify-center items-center gap-2">
                            <Plus :size="16" />Add Attachment
                        </label>
                    </div>
                    <div v-if="file.length !== 0" class="flex flex-col gap-3 w-full">
                        <div class="flex w-full text-xs justify-between h-fit">
                            <p>{{ file.length }} file added</p>
                            <input type="file" id="uploadMore" @change="onFileChange" />
                            <label for="uploadMore" class="flex justify-center items-center gap-2 px-3 py-1">
                                <Plus :size="12" /> Add More
                            </label>
                        </div>
                        <div class="gap-3" :class="file.length === 1 ? 'w-full' : 'grid grid-cols-2'">
                            <div v-for="f in file" :key="f.name"
                                class="flex w-full px-4 py-2 bg-background1/60 rounded-xl justify-between">
                                <div class="flex gap-2 items-center">
                                    <div class="h-fit w-fit p-4 bg-background0/80 rounded-full">
                                        <FileText :strokeWidth="1" />
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium">{{ f.name }}</p>
                                        <p class="text-[0.5rem] text-foreground0/60 font-medium">{{
                                            formatFileSize(f.size) }}</p>
                                    </div>
                                </div>
                                <button @click="removeFile(f)">
                                    <X :size="16" class="text-background2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="text-center font-medium py-3 bg-foreground0 text-background1 w-full rounded-xl">Create
            Post</button>
    </div>
</template>
