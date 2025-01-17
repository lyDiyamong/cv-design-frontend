import { useAuthStore } from "~/store/auth";
import { useUser } from "~/composables/useUser";

export default defineNuxtPlugin(async () => {
    const authStore = useAuthStore();

    // Skip fetching if user is already loaded or no tokens are present
    if (!authStore.user && authStore.tokens) {
        try {
            const { userQuery } = useUser();
            const { data } = await userQuery.refetch();

            if (data) {
                authStore.setUser(data); // Populate the user state
            }
        } catch (error) {
            console.error("Error pre-fetching user data:", error);
            authStore.clearAuth(); // Clear tokens and user data on error
        }
    }
});
