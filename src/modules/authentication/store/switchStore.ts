import { reactive } from 'vue';

export const switchStore = reactive({
    isSignin: true,
});

export function togglePage() {
    switchStore.isSignin = !switchStore.isSignin;
}
