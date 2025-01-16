import type { Tokens, User } from "~/types/auth";

interface AuthState {
    user: User | null;
    tokens: Tokens | null;
}

export const useAuthStore = defineStore("auth", {
    state: (): AuthState => ({
        user: null,
        tokens: null,
    }),

    actions: {
        setAuth(userData: User, tokens: Tokens) {
            this.user = userData;
            this.tokens = tokens;
        },

        updateTokens(tokens: Tokens) {
            this.tokens = tokens;
        },

        clearAuth() {
            this.user = null;
            this.tokens = null;
        },
    },

    getters: {
        isAuthenticated(): boolean {
            return !!this.tokens?.accessToken;
        },
    },
});
