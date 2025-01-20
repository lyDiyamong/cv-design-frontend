import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { JsonResponseType } from "~/types/json";
import type { ResumeType } from "~/types/resume";
import type { SectionKeys, SectionType } from "~/types/sections";

type EachSectionType<T> = {
    resumeId: string;
    content: T;
    type: SectionKeys;
};

export const useSection = <InputT, ReturnT>() => {
    const { $api } = useNuxtApp();
    const queryClient = useQueryClient();
    const sectionResumeQuery = (resumeId: string) =>
        useQuery({
            queryKey: ["section", resumeId],
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
            const response = await $api.patch<
                JsonResponseType<EachSectionType<ReturnT>>
            >(`/section/edit/resume/${resumeId}`, updateData);

            return response.data;
        },
        // onSuccess: (updatedSection, variables) => {
        //     const { resumeId } = variables;

        //     // Update the cached data manually
        //     queryClient.setQueryData(
        //         ["section", resumeId],
        //         (oldData?: JsonResponseType<SectionType[]>) => {
        //             if (!oldData) {
        //                 console.log("old data", oldData);
        //                 return [];
        //             }

        //             return oldData?.data.map((section) => {
        //                 console.log("section", section);
        //                 console.log("new section", updatedSection);

        //                 const dataResult =
        //                     section.resumeId === updatedSection.data.resumeId &&
        //                     section.type === updatedSection?.data?.type
        //                         ? { ...section, ...updatedSection?.data } // Merge the updated section
        //                         : section;

        //                         console.log("Result", dataResult)

        //                 return section.resumeId ===
        //                     updatedSection.data.resumeId &&
        //                     section.type === updatedSection?.data?.type
        //                     ? { ...section, ...updatedSection?.data } // Merge the updated section
        //                     : section;
        //             });
        //         }
        //     );
        //     // Optionally refetch to ensure data consistency
        //     // queryClient.invalidateQueries(["section", resumeId] as const);
        // },
        onSuccess: (updatedSection, variables) => {
            const { resumeId } = variables;

            // Update the cached data manually
            queryClient.setQueryData(
                ["section", resumeId],
                (oldData?: JsonResponseType<SectionType[]>) => {
                    if (!oldData) {
                        console.log("old data", oldData);
                        return [];
                    }

                    // Only update the matching section
                    const updatedSections = oldData.data.map((section) => {
                        // Check if the current section matches the updated section
                        if (
                            section.resumeId === updatedSection.data.resumeId &&
                            section.type === updatedSection.data.type
                        ) {
                            // Merge the old section with the updated data
                            return { ...section, ...updatedSection.data };
                        }
                        return section;
                    });

                    // console.log("update section", updatedSections)

                    return updatedSections;
                }
            );
            queryClient.invalidateQueries({
                queryKey: ["section", resumeId] as const,
                exact: true, 
            });
        },
    });

    return {
        sectionResumeQuery,
        updateSectionMutation,
    };
};
