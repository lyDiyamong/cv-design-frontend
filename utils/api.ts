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
            (error) => this.handleError(error)
        );
    }

    private async handleError(error: any) {
        const { tokens, clearAuth, updateTokens } = this.authStore;

        if (error.response?.status === 401 && tokens?.refreshToken) {
            try {
                const newTokens = await this.refreshTokens();
                updateTokens(newTokens);

                // Retry the original request
                const config = error.config;
                config.headers.Authorization = `Bearer ${newTokens.accessToken}`;
                return this.api.request(config);
            } catch (refreshError) {
                clearAuth();
                navigateTo("/");
            }
        }

        return Promise.reject(error?.failureReason?.response?.data || error);
    }

    private async refreshTokens(): Promise<Tokens> {
        const { data } = await this.api.get<{ tokens: Tokens }>(
            "/auth/refresh"
        );
        return data.tokens;
    }

    get instance(): AxiosInstance {
        return this.api;
    }
}
