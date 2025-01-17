import type { Tokens, User } from "~/types/auth";

interface AuthState {
    user: User | null;
    tokens: Tokens | null;
}

export const useAuthStore = defineStore("auth", {
    state: (): AuthState => ({
        user: null, // Stores user data fetched from the backend
        tokens: null, // Stores authentication tokens
    }),

    actions: {
        setTokens(tokens: Tokens) {
            this.tokens = tokens;
        },

        updateTokens(newTokens: Partial<Tokens>) {
            if (this.tokens) {
                this.tokens = {
                    ...this.tokens,
                    ...newTokens,
                };
            }
        },

        setUser(userData: User) {
            console.log("Setting user in store:", userData); // Log user data
            this.user = userData;
        },

        clearAuth() {
            this.user = null;
            this.tokens = null;
        },
    },

    getters: {
        isAuthenticated(): boolean {
            return !!this.user; // Authentication is tied to the presence of user data
        },
    },
});
