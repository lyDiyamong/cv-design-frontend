import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { JsonResponseType } from "~/types/json";
import type { CreateResumeType, ResumeType } from "~/types/resume";

export const useResume = () => {
    const { $api } = useNuxtApp();
    const queryClient = useQueryClient();

    const resumeQueryAll = useQuery({
        queryKey: ["resumes"],
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

            return response.data;
        },
    });

    const deleteResumeMutation = useMutation({
        mutationKey: ["resumes"],
        mutationFn: async (resumeId: string) => {
            const response = await $api.delete<JsonResponseType<undefined>>(
                `resume/${resumeId}`
            );

            return response.data;
        },
        onSuccess: async () => {
            await new Promise((resolve) => setTimeout(resolve, 200)); // Delay by 200ms
            queryClient.invalidateQueries({
                queryKey: ["resumes"],
                exact: true,
            });
        },
        // onSuccess: () => {
        //     queryClient.removeQueries({ queryKey: ["resumes"], exact: true });
        //     queryClient.fetchQuery({ queryKey: ["resumes"] }); // Force refetch
        // },
    });

    return {
        resumeQueryAll,
        createResumeMutation,
        deleteResumeMutation,
    };
};
