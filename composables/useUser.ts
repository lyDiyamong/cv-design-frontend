import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useAuthStore } from "~/store/auth";
import type { UpdateUserType, User } from "~/types/auth";
import type { JsonResponseType } from "~/types/json";

export const useUser = () => {
    const { $api } = useNuxtApp();
    const authStore = useAuthStore();
    const queryClient = useQueryClient()

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
            // Update store
            authStore.setUser(data);
        }
    });

    // Watch the query state and update the store
    watch(
        () => userQuery.isSuccess,
        (isSuccess) => {
            if (isSuccess && userQuery.data.value) {
                authStore.setUser(userQuery.data.value);
            }
        }
    );

    watch(
        () => userQuery.isError,
        (isError) => {
            if (isError) {
                console.error("Error fetching user data:", userQuery.error);
                authStore.clearAuth();
            }
        }
    );

    const updateUserMutation = useMutation({
        mutationKey: ["user"],
        mutationFn: async (updateData: UpdateUserType) => {
            const response = await $api.patch<JsonResponseType<User>>(
                "/user/profile",
                updateData
            );

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"] as const,
                exact: true, 
            });
        },
    });

    const updateProfileUser = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await $api.patch<JsonResponseType<User>>('/user/profile-image', formData)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"] as const,
                exact: true, 
            });
        },
    })

   const deleteProfileUser = useMutation({
    mutationFn: async () => {
        const response = await $api.delete<JsonResponseType<User>>('/user/profile-image')
        return response.data
    },
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["user"] as const,
            exact: true, 
        });
    },
   }) 

    return {
        userQuery,
        updateUserMutation,
        updateProfileUser,
        deleteProfileUser
    };
};
