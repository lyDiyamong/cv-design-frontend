import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useAuthStore } from "~/store/auth";
import type { JsonResponseType } from "~/types/json";
import type {
    AuthResponse,
    LoginType,
    SignupType,
    Tokens,
    User,
} from "~/types/auth";

export const useAuth = () => {
    const { $api } = useNuxtApp();
    const authStore = useAuthStore();
    const queryClient = useQueryClient();

    const signupMutation = useMutation({
        mutationFn: async (input: SignupType) => {
            const response = await $api.post<JsonResponseType<Tokens>>(
                "auth/sign-up",
                input
            );

            return response.data;
        },
        onSuccess: async (data) => {
            const { accessToken, refreshToken } = data.data;
            authStore.setTokens({ accessToken, refreshToken });
        },
        onError: (error) => {
            console.error("Login failed", error);
        },
    });

    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginType) => {
            const response = await $api.post<JsonResponseType<Tokens>>(
                "/auth/login",
                credentials
            );
            return response.data;
        },
        onSuccess: async (data) => {
            const { accessToken, refreshToken } = data.data;
            authStore.setTokens({ accessToken, refreshToken });
        },
        onError: (error) => {
            console.error("Login failed", error);
        },
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const response = await $api.get<JsonResponseType<undefined>>(
                "/auth/logout"
            );
            return response.data;
        },
        onSuccess: () => {
            authStore.clearAuth();
            queryClient.clear();
        },
    });

    return {
        signupMutation,
        loginMutation,
        logoutMutation,
        isAuthenticated: authStore.isAuthenticated,
        user: authStore.user,
    };
};
