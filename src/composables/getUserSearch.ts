import { ref } from 'vue';
import { UserService } from '@/services/UserService';

export function useUserSearch() {
    const loading = ref(false);
    const error = ref<string | null>(null);

    const getUserIdByEmail = async (email: string): Promise<number | null> => {
        loading.value = true;
        error.value = null;

        try {
            const users = await UserService.getAllUsers();
            const user = users.find(u => u.email === email);

            if (!user) {
                error.value = 'User not found';
                return null;
            }

            return user.id;
        } catch (err) {
            error.value = 'Failed to search for user';
            console.error('Error searching user by email:', err);
            return null;
        } finally {
            loading.value = false;
        }
    };

    return {
        getUserIdByEmail,
        loading,
        error
    };
}
