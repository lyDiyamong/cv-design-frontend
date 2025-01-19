<template>
    <div>
        <div>
            <h3>Education</h3>
            <p class="sub-title">
                Provide details about your educational background
            </p>
        </div>

        <a-form @submit.prevent="onSubmit" layout="vertical">
            <div
                v-for="(field, index) in content"
                :key="index"
                class="form-row"
            >
                <section class="flex-between">
                    <div class="full-width">
                        <div class="form-row">
                            <!-- School Name -->
                            <a-form-item class="full-width" label="School Name">
                                <Field
                                    class="full-width"
                                    :name="`content.${index}.schoolName`"
                                    as="a-input"
                                    placeholder="School Name"
                                />
                                <ErrorMessage
                                    :name="`content.${index}.schoolName`"
                                    class="error-message"
                                />
                            </a-form-item>

                            <!-- Degree/Major -->
                            <a-form-item
                                class="full-width"
                                label="Degree/Major"
                            >
                                <Field
                                    class="full-width"
                                    :name="`content.${index}.degreeMajor`"
                                    as="a-input"
                                    placeholder="Degree/Major"
                                />
                                <ErrorMessage
                                    :name="`content.${index}.degreeMajor`"
                                    class="error-message"
                                />
                            </a-form-item>
                        </div>

                        <div class="form-row">
                            <!-- Start Date -->
                            <a-form-item class="full-width" label="Start Date">
                                <input
                                    class="full-width input-date"
                                    type="date"
                                    :name="`content.${index}.startDate`"
                                    :value="
                                        formatDate(
                                            props.content[index]?.startDate
                                        )
                                    "
                                    @input="updateStartDate($event, index)"
                                />
                            </a-form-item>

                            <!-- End Date -->
                            <a-form-item class="full-width" label="End Date">
                                <input
                                    class="full-width input-date"
                                    type="date"
                                    :name="`content.${index}.endDate`"
                                    :value="
                                        formatDate(
                                            props.content[index]?.endDate
                                        )
                                    "
                                    @input="updateEndDate($event, index)"
                                />
                            </a-form-item>
                        </div>
                    </div>
                    <a-button
                        type="link"
                        @click="removeField(index)"
                        v-if="content.length > 0"
                    >
                        <DeleteOutlined :style="{ color: 'red' }" />
                    </a-button>
                </section>
            </div>

            <a-button type="dashed" block @click="addField">
                <span>+ Add Education</span>
            </a-button>

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
    import dayjs from "dayjs";
    import type { UpdateEducationContent } from "../../types/sections";
    import { useAlertStore } from "~/store/alert";

    // Props received from the parent
    const props = defineProps<{
        content: UpdateEducationContent[];
    }>();

    const route = useRoute();

    const resumeId = route.params.id as string;

    const { updateSectionMutation } = useSection();
    const alertStore = useAlertStore();

    // Validation schema for an individual education entry
    const EducationSchema = z.object({
        schoolName: z.string().optional(),
        degreeMajor: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
    });

    const FormSchema = z.object({
        type: z.string(),
        content: z.array(EducationSchema),
    });

    const { handleSubmit, values } = useForm({
        validationSchema: toFieldValidator(FormSchema),
        initialValues: {
            type: "educations",
            content: props.content || [],
        },
    });

    // Add a new field
    const addField = () => {
        push({ schoolName: "", degreeMajor: "", startDate: "", endDate: "" });
    };

    // Remove a field
    const removeField = (index: number) => {
        remove(index);
    };

    // Format date to the required format for the input[type="date"] field (YYYY-MM-DD)
    const formatDate = (date: string) => {
        return dayjs(date).format("YYYY-MM-DD"); // Ensure the date is in the correct format
    };

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

    // Submit form handler
    const onSubmit = handleSubmit(async (formValues) => {
        console.log("Form submitted with values:", formValues);

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
        display: flex;
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

    .input-date {
        width: 100%;
    }
</style>
