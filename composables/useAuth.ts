import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useAuthStore } from "~/store/auth";
import type { JsonResponseType } from "~/types/json";
import type { AuthResponse, LoginType } from "~/types/auth";


export const useAuth = () => {
    const { $api } = useNuxtApp();
    const authStore = useAuthStore();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginType) => {
            const response = await $api.post("/auth/login", credentials);
            return response.data as JsonResponseType<AuthResponse>;
        },
        onSuccess: ({ data }) => {
            authStore.setAuth(data.user, data.tokens);
        },
        onError: (error) => {
            console.error("Login failed", error);
        },
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            await $api.post("/auth/logout");
        },
        onSuccess: () => {
            authStore.clearAuth();
            queryClient.clear(); 
        },
    });

    return {
        loginMutation,
        logoutMutation,
        isAuthenticated: authStore.isAuthenticated,
        user: authStore.user,
    };
};
