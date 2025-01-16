import axios from "axios";
import { useAuthStore } from "~/store/auth";

// plugins/axios.ts
export default defineNuxtPlugin(() => {
    const api = axios.create({
        baseURL: import.meta.env.NUXT_SERVER_BASE_URL,
        withCredentials: true,
    });

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                // Handle unauthorized - clear auth and redirect
                const auth = useAuthStore();
                auth.clearAuth();
                navigateTo("/login");
            }
            return Promise.reject(error);
        }
    );

    return {
        provide: {
            api,
        },
    };
});
