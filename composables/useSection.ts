import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { JsonResponseType } from "~/types/json";
import type {  ResumeType } from "~/types/resume";
import type { SectionType } from "~/types/sections";

export const useSection = () => {
    const { $api } = useNuxtApp();
    const sectionResumeQuery = (resumeId: string) =>
        useQuery({
            queryKey: ["section"],
            queryFn: async () => {
                const response = await $api.get<
                    JsonResponseType<SectionType[]>
                >(`/section/resume/${resumeId}`);
                return response.data;
            },
            retry: 1,
        });

    const createResumeMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await $api.post<JsonResponseType<ResumeType>>(
                "/resume",
                formData,
                {
                    headers: {
                        // Ensure this header for file uploads
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        },
    });

    return {
        sectionResumeQuery,
        createResumeMutation,
    };
};
