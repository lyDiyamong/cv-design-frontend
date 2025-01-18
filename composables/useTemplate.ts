import { useQuery } from "@tanstack/vue-query";
import type { JsonResponseType } from "~/types/json";
import type { TemplateType } from "~/types/template";

export const useTemplate = () => {
    const { $api } = useNuxtApp();
    const getAllTemplates = useQuery({
        queryKey: ["templates"],
        queryFn: async () => {
            const response = await $api.get<JsonResponseType<TemplateType[]>>(
                "/template"
            );
            return response.data;
        },
    });
    const getOneTemplate = (id: string) =>
        useQuery({
            queryKey: ["templates", id],
            queryFn: async () => {
                const response = await $api.get<JsonResponseType<TemplateType>>(
                    `template/${id}`
                );

                return response.data;
            },
        });

    return {
        getAllTemplates,
        getOneTemplate,
    };
};
