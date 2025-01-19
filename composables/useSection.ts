import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { JsonResponseType } from "~/types/json";
import type { ResumeType } from "~/types/resume";
import type { SectionType } from "~/types/sections";

export const useSection = <InputT, ReturnT>() => {
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

    const updateSectionMutation = useMutation({
        mutationKey: ["section"],
        mutationFn: async ({
            resumeId,
            updateData,
        }: {
            resumeId: string;
            updateData: InputT;
        }) => {
            const response = await $api.patch<JsonResponseType<ReturnT>>(
                `/section/edit/resume/${resumeId}`,
                updateData
            );

            return response.data
        },
    });

    return {
        sectionResumeQuery,
        updateSectionMutation,
    };
};
