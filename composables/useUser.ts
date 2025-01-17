import { useQuery } from "@tanstack/vue-query";
import { useAuthStore } from "~/store/auth";
import type { User } from "~/types/auth";
import type { JsonResponseType } from "~/types/json";

export const useUser = () => {
    const { $api } = useNuxtApp();
    const authStore = useAuthStore();

    const userQuery = useQuery({
        queryKey: ["user"],
        queryFn: async (): Promise<User> => {
            const response = await $api.get<JsonResponseType<User>>(
                "/user/profile"
            );
            const {
                _id,
                firstName,
                lastName,
                email,
                gender,
                dateOfBirth,
                imageUrl,
            } = response.data.data;

            // Transform the response to include only required fields
            return {
                _id,
                firstName,
                lastName,
                email,
                gender,
                dateOfBirth,
                imageUrl,
            };
        },
        enabled: computed(() => authStore.isAuthenticated), // Only fetch if authenticated
        refetchOnWindowFocus: false,
        retry: 1,
    });

    // Watch query data and update the store
    watch(
        () => userQuery.data,
        (userData) => {
            if (userData?.value) {
                authStore.setUser(userData.value); // Update the auth store
            }
        }
    );

    watch(
        () => userQuery.error,
        (error) => {
            if (error) {
                console.error("Error fetching user data:", error);
                authStore.clearAuth(); // Clear auth data on error
            }
        }
    );

    return {
        userQuery,
    };
};
