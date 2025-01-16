import { useAuthStore } from "~/store/auth";
import type { AuthResponse, LoginCredentials, User } from "~/types/auth";

// composables/useAuth.ts
export const useAuth = () => {
    const { $api } = useNuxtApp();
    const auth = useAuthStore();
    const error = ref<string | null>(null);

    const login = async (credentials: LoginCredentials) => {
        try {
            const { data } = await $api.post<AuthResponse>(
                "/auth/login",
                credentials
            );
            auth.setAuth(data.user, data.tokens);
            const userData = await getCurrentUser();
            if (userData) await navigateTo("/dashboard");
        } catch (err) {
            error.value = "Login failed";
            throw err;
        }
    };

    const logout = async () => {
        try {
            if (auth.tokens?.refreshToken) {
                await $api.post("/auth/logout", {
                    refreshToken: auth.tokens.refreshToken,
                });
            }
        } finally {
            auth.clearAuth();
            await navigateTo("/login");
        }
    };

    const getCurrentUser = async () => {
        if (!auth.tokens?.accessToken) return null;

        try {
            const { data } = await $api.get<User>("/user/profile");
            auth.setAuth(data, auth.tokens);
            return data;
        } catch {
            auth.clearAuth();
            return null;
        }
    };

    return {
        login,
        logout,
        getCurrentUser,
        error,
    };
};
