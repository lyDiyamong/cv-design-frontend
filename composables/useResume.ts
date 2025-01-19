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
        mutationFn: async (data: { title: string; previewImg: string }) => {
            const response = await $api.post<JsonResponseType<ResumeType>>(
                "/resume",
                data
            );

            return response.data
        },
    });

    return {
        resumeQueryAll,
        createResumeMutation,
    };
};
