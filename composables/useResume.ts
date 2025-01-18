import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { JsonResponseType } from "~/types/json";
import type { CreateResumeType, ResumeType } from "~/types/resume";

export const useResume = () => {
    const { $api } = useNuxtApp();
    const resumeQueryAll = useQuery({
        queryKey: ["resume"],
        queryFn: async () => {
            const response = await $api.get<JsonResponseType<ResumeType[]>>(
                "/resume"
            );
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
        resumeQueryAll,
        createResumeMutation
    };
};
