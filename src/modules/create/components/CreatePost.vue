<script setup lang="ts">
import { FileText, Plus, X } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/modules/authentication/store/authStore';
import { PostService } from '@/services/PostService';
import { useUserSearch } from '@/composables/getUserSearch';
import { FileService } from '@/services/FileService';
import type { PostRequest } from '@/types/Post';
import type { SubjectResponse } from '@/types/Subject'
import CourseColor from '@/assets/CourseColors.json';

const router = useRouter();
const auth = useAuthStore();
const { getUserIdByEmail } = useUserSearch();

const file = ref<File[]>([]);
const title = ref('');
const content = ref('');
const loading = ref(false);
const error = ref<string | null>(null);

// props
const props = defineProps<{
    selectedCourse: SubjectResponse | null
}>();

const selectedCourseColor = computed(() => {
    if (!props.selectedCourse) return 'bg-background1 text-foreground0';
    return CourseColor[props.selectedCourse.name as keyof typeof CourseColor];
});

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
        return bytes + ' B';
    } else if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(2) + ' KB';
    } else {
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    }
}

function removeFile(f: File) {
    file.value = file.value.filter(x => x !== f);
}

async function createPost() {
    try {
        loading.value = true;
        error.value = null;

        if (!title.value.trim()) {
            error.value = 'Title is required';
            return;
        }

        if (!props.selectedCourse) {
            error.value = 'Please select a course';
            return;
        }

        if (!auth.userEmail) {
            error.value = 'User not authenticated';
            return;
        }

        const userId = await getUserIdByEmail(auth.userEmail);
        if (!userId) {
            error.value = 'Could not find user';
            return;
        }

        const departmentId = props.selectedCourse.departments?.[0]?.id;

        if (!departmentId) {
            error.value = 'No department found for this course';
            return;
        }

        // Create post request
        const postData: PostRequest = {
            title: title.value.trim(),
            content: content.value.trim(),
            user_id: userId,
            department_id: departmentId,
            post_tag: props.selectedCourse.id,
        };

        const createdPost = await PostService.createPost(postData);

        console.log('Created post response:', createdPost);
        console.log('createdPost.id:', createdPost.id);
        console.log('createdPost.post_id:', createdPost.post_id);

        if (file.value.length > 0) {
            const postId = createdPost.post_id || createdPost.id;

            console.log('Post ID for file upload:', postId); // 🔍 DEBUG

            if (!postId) {
                error.value = 'Post created but could not get post ID for file upload';
                return;
            }

            await FileService.uploadFiles(file.value, userId, postId);
        }

        router.push({ name: 'Home' });

    } catch (err: any) {
        console.error('Error creating post:', err);
        error.value = err.response?.data?.message || 'Failed to create post';
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="w-200 flex flex-col gap-8">
        <div class="flex justify-between h-fit">
            <p class="text-2xl font-semibold opacity-60">Create Post</p>
            <div class="flex items-center justify-center">
                <span class="text-sm px-4 py-1 rounded-2xl text-background2" :class="selectedCourseColor">
                    {{ selectedCourse?.name ?? "No course selected" }}
                </span>
            </div>
        </div>

        <div v-if="error" class="text-red-500 text-sm px-4 py-2 bg-red-100 rounded">
            {{ error }}
        </div>

        <div class="text-start flex flex-col gap-10">
            <div class="flex flex-col relative h-fit">
                <label for="" class="absolute text-center left-6">
                    <span class="bg-background0 p-1 text-lg">Title</span>
                </label>
                <input v-model="title" maxlength="30"
                    class="flex border rounded-xl border-background3 p-6 mt-3.5 text-xl" />
            </div>

            <div class="flex flex-col relative h-fit">
                <label for="" class="absolute text-center left-6">
                    <span class="bg-background0 p-1 text-lg">Description
                        <span class="text-xs text-foreground0/40">(optional, unless it's a link!)</span>
                    </span>
                </label>
                <textarea v-model="content" maxlength="500" rows="6"
                    class="flex border rounded-xl border-background3 p-6 mt-3.5 h-fit"></textarea>
            </div>

            <!-- ATTACHMENTS -->
            <div class="flex flex-col relative h-fit">
                <label for="" class="absolute text-center left-6">
                    <span class="bg-background0 p-1 text-lg">Attachments</span>
                </label>
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
                        <input type="file" id="uploadFile" @change="onFileChange" multiple />
                        <label for="uploadFile"
                            class="bg-foreground0 text-background1 px-3 py-1 mt-4 rounded-xl text-sm flex justify-center items-center gap-2">
                            <Plus :size="16" />Add Attachment
                        </label>
                    </div>
                    <div v-if="file.length !== 0" class="flex flex-col gap-3 w-full">
                        <div class="flex w-full text-xs justify-between h-fit">
                            <p>{{ file.length }} file{{ file.length > 1 ? 's' : '' }} added</p>
                            <input type="file" id="uploadMore" @change="onFileChange" multiple />
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
                                        <p class="text-[0.5rem] text-foreground0/60 font-medium">
                                            {{ formatFileSize(f.size) }}
                                        </p>
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

        <button @click="createPost" :disabled="loading"
            class="text-center font-medium py-3 bg-foreground0 text-background1 w-full rounded-xl disabled:opacity-50">
            {{ loading ? 'Creating...' : 'Create Post' }}
        </button>
    </div>
</template>
