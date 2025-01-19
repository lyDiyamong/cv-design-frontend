<template>
    <div>
        <div>
            <h3>Experience</h3>
            <p class="sub-title">Detail your work experiences</p>
        </div>

        <a-form @submit.prevent="onSubmit" layout="vertical">
            <div
                v-for="(field, index) in content"
                :key="index"
                class="form-row"
            >
                <div class="flex-between">
                    <!-- Job Title -->
                    <a-form-item label="Job Title">
                        <Field
                            :name="`content.${index}.jobTitle`"
                            as="a-input"
                            placeholder="Job Title"
                        />
                        <ErrorMessage
                            :name="`content.${index}.jobTitle`"
                            class="error-message"
                        />
                    </a-form-item>

                    <!-- Position -->
                    <a-form-item label="Position">
                        <Field
                            :name="`content.${index}.company`"
                            as="a-input"
                            placeholder="Company"
                        />
                        <ErrorMessage
                            :name="`content.${index}.company`"
                            class="error-message"
                        />
                    </a-form-item>
                </div>
                <a-form-item label="Responsibility">
                    <Field
                        :name="`content.${index}.responsibility`"
                        as="a-input"
                        placeholder="Responsibility"
                    />
                    <ErrorMessage
                        :name="`content.${index}.responsibility`"
                        class="error-message"
                    />
                </a-form-item>

                <div class="flex-between">
                    <!-- Start Date -->

                    <a-form-item class="full-width" label="Start Date">
                        <input
                            class="full-width input-date"
                            type="date"
                            :name="`fields.${index}.startDate`"
                            :value="formatDate(props.content[index]?.startDate)"
                            @input="updateStartDate($event, index)"
                        />
                    </a-form-item>

                    <!-- End Date -->
                    <a-form-item class="full-width" label="End Date">
                        <input
                            class="full-width input-date"
                            type="date"
                            :name="`content.${index}.endDate`"
                            :value="props.content[index]?.endDate"
                            @input="updateEndDate($event, index)"
                        />
                    </a-form-item>
                </div>

                <!-- Description -->
                <TextArea
                    :name="`content.${index}.description`"
                    label="Description"
                    placeholder="Write a brief description of your responsibilities"
                    :rows="4"
                />
                <ErrorMessage
                    :name="`content.${index}.description`"
                    class="error-message"
                />

                <!-- Remove Button -->
                <a-button
                    type="link"
                    @click="removeField(index)"
                    v-if="content.length > 0"
                >
                    <DeleteOutlined :style="{ color: 'red' }" />
                </a-button>
            </div>

            <!-- Add Experience Button -->
            <a-button type="dashed" block @click="addField">
                <span>+ Add Experience</span>
            </a-button>

            <!-- Submit Button -->
            <div class="button-resume-container">
                <a-button type="primary" html-type="submit">Save</a-button>
            </div>
        </a-form>
    </div>
</template>

<script setup lang="ts">
    import { useFieldArray, useForm, Field, ErrorMessage } from "vee-validate";
    import { z } from "zod";
    import { toFieldValidator } from "@vee-validate/zod";
    import { DeleteOutlined } from "@ant-design/icons-vue";
    import { updateExperienceSchema } from "~/utils/schema";
    import type { UpdateExperienceContent } from "~/types/sections";
    import { useAlertStore } from "~/store/alert";

    // Props received from the parent
    const props = defineProps<{
        content: UpdateExperienceContent[];
    }>();

    const route = useRoute();

    const resumeId = route.params.id as string;

    const alertStore = useAlertStore();

    // Schema for the entire form
    const formSchema = z.object({
        type: z.string(),
        content: z.array(updateExperienceSchema),
    });

    type UpdateExperienceSchemaType = z.infer<typeof formSchema>;

    // Initialize the form with validation schema and initial values
    const { handleSubmit } = useForm({
        validationSchema: toFieldValidator(formSchema),
        initialValues: {
            // Use the passed experiences or an empty array
            content: props.content || [],
            type: "experiences",
        },
    });

    const { updateSectionMutation } = useSection<
        UpdateExperienceSchemaType,
        UpdateExperienceContent[]
    >();

    const { fields: content, push, remove } = useFieldArray("content");

    // Update startDate
    const updateStartDate = (event: Event, index: number) => {
        const newStartDate = (event.target as HTMLInputElement).value;
        props.content[index].startDate = newStartDate;
    };

    // Update endDate
    const updateEndDate = (event: Event, index: number) => {
        const newEndDate = (event.target as HTMLInputElement).value;
        props.content[index].endDate = newEndDate;
    };

    // Add a new field
    const addField = () => {
        push({
            jobTitle: "",
            position: "",
            startDate: "",
            endDate: "",
            description: "",
        });
    };

    // Remove a field
    const removeField = (index: number) => {
        remove(index);
    };

    // Submit form handler
    const onSubmit = handleSubmit(async (formValues) => {
        const data = await updateSectionMutation.mutateAsync({
            resumeId,
            updateData: formValues,
        });

        if (data) {
            alertStore.showAlert({
                message: data.message,
                type: "success",
                duration: 5000,
            });
        }
    });
</script>

<style scoped>
    .form-row {
        align-items: flex-start;
        gap: 12px;
    }

    .submit-btn {
        margin-top: 1rem;
    }

    .error-message {
        color: red;
        font-size: 0.9rem;
    }
</style>
