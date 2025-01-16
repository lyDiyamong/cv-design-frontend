// plugins/vue-query.ts
import { defineNuxtPlugin } from "#app";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";

export default defineNuxtPlugin((nuxtApp) => {
    const queryClient = new QueryClient();
    nuxtApp.provide("VUE_QUERY_CLIENT", queryClient); // Provide Vue Query Client

    // Use VueQueryPlugin
    nuxtApp.vueApp.use(VueQueryPlugin);
});
