import { ApiService } from "~/utils/api";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const baseURL = config.public.myApiUrl;
    const apiService = new ApiService(baseURL);

    return {
        provide: {
            api: apiService.instance,
        },
    };
});
