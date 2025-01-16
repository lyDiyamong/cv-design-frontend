import type { AxiosInstance } from "axios";
import axios from "axios";
import { useAuthStore } from "~/store/auth";
import type { Tokens } from "~/types/auth";

// utils/api.ts
export class ApiService {
    private api: AxiosInstance;

    constructor(baseURL: string) {
        this.api = axios.create({
            baseURL,
            withCredentials: true,
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.api.interceptors.request.use((config) => {
            const auth = useAuthStore();
            if (auth.tokens?.accessToken) {
                config.headers.Authorization = `Bearer ${auth.tokens.accessToken}`;
            }
            return config;
        });

        this.api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const auth = useAuthStore();

                if (
                    error.response?.status === 401 &&
                    auth.tokens?.refreshToken
                ) {
                    try {
                        const { data } = await this.api.post<{
                            tokens: Tokens;
                        }>("/auth/refresh", {
                            refreshToken: auth.tokens.refreshToken,
                        });

                        auth.updateTokens(data.tokens);

                        // Retry original request with new token
                        const config = error.config;
                        config.headers.Authorization = `Bearer ${data.tokens.accessToken}`;
                        return this.api.request(config);
                    } catch {
                        auth.clearAuth();
                        navigateTo("/login");
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    get instance(): AxiosInstance {
        return this.api;
    }
}
