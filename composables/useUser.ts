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
        refetchOnWindowFocus: false,
        retry: 1, // Retry once on failure
    });

    // Computed properties for easier access
    const userData = computed(() => userQuery.data.value); // User data
    const isUserLoaded = computed(() => !!userData.value); // Boolean if user is loaded

    // Update auth store when user data is fetched successfully
    watch(userData, (data) => {
        if (data) {
            authStore.setUser(data); // Update store
        }
    });

    // Watch the query state and update the store
    watch(
        () => userQuery.isSuccess,
        (isSuccess) => {
            if (isSuccess && userQuery.data.value) {
                console.log("Fetched user data successfully:", userQuery.data);
                authStore.setUser(userQuery.data.value);
            }
        }
    );

    console.log("Error", userQuery.isError, userQuery.error)
    watch(
        () => userQuery.isError,
        (isError) => {
            if (isError) {
                console.error("Error fetching user data:", userQuery.error);
                authStore.clearAuth();
            }
        }
    );

    return {
        userQuery,
    };
};
