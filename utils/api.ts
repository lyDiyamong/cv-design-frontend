import type { AxiosInstance } from "axios";
import axios from "axios";
import { useAuthStore } from "~/store/auth";
import type { Tokens } from "~/types/auth";

export class ApiService {
    private api: AxiosInstance;
    private authStore: ReturnType<typeof useAuthStore>;

    constructor(baseURL: string) {
        this.authStore = useAuthStore();
        this.api = axios.create({
            baseURL,
            withCredentials: true,
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.api.interceptors.request.use((config) => {
            const { tokens } = this.authStore;
            if (tokens?.accessToken) {
                config.headers.Authorization = `Bearer ${tokens.accessToken}`;
            }
            return config;
        });

        this.api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const { tokens, clearAuth, updateTokens } = this.authStore;

                if (
                    error.response?.status === 401 &&
                    tokens?.refreshToken
                ) {
                    try {
                        const { data } = await this.api.post<{ tokens: Tokens }>(
                            "/auth/refresh",
                            { refreshToken: tokens.refreshToken }
                        );

                        updateTokens(data.tokens);

                        // Retry original request with new token
                        const config = error.config;
                        config.headers.Authorization = `Bearer ${data.tokens.accessToken}`;
                        return this.api.request(config);
                    } catch {
                        clearAuth();
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
