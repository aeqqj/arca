<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { User } from '@/types/User';
import { UserService } from '@/services/UserService';

const router = useRouter();

const props = defineProps<{
    user: User
}>();

const userProfilePicture = ref<string | null>(null);

const getProfilePictureUrl = computed(() => {
    if (!userProfilePicture.value) return '/newaccount.png';
    return userProfilePicture.value;
});

const formatRole = computed(() => {
    const role = props.user.roles[0];
    if (role === 'ROLE_USER') return 'User';
    if (role === 'ROLE_ADMIN') return 'Admin';
    return role;
});

async function fetchUserProfile() {
    try {
        if (props.user.id) {
            const userDetails = await UserService.getUserDetails(props.user.id);
            userProfilePicture.value = userDetails.profile_picture || null;
        }
    } catch (err: any) {
        console.error('Error fetching user profile:', err);
        userProfilePicture.value = null;
    }
}

onMounted(async () => {
    await fetchUserProfile();
});

function goToProfile() {
    router.push({ name: 'Profile', params: { userId: props.user.id } }); 
}
</script>

<template>
    <button @click="goToProfile"
        class="w-220 flex bg-background1 p-6 rounded-xl justify-between shadow-xl text-start hover:bg-background2 transition-colors">
        <div class="flex justify-start gap-5">
            <img :src="getProfilePictureUrl" alt="avatar" class="h-16 w-16 rounded-2xl" />
            <div class="h-full flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                    <div class="flex gap-4">
                        <p class="text-[1.35rem] font-semibold">
                            {{ user.first_name }} {{ user.last_name }}
                        </p>
                        <span
                            class="text-xs font-medium bg-background2 px-3 py-0.5 border-2 rounded-xl border-background3">
                            {{ formatRole }}
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
