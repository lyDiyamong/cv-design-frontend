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
                <div class="flex-form-group">
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
                            :name="`content.${index}.position`"
                            as="a-input"
                            placeholder="Position"
                        />
                        <ErrorMessage
                            :name="`content.${index}.position`"
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

                <div class="flex-form-group">
                    <!-- Start Date -->
                    <a-form-item class="w-full" label="Start Date">
                        <!-- <input
                            class="w-full input-date"
                            type="date"
                            :name="`content.${index}.startDate`"
                            :value="props.content[index]?.startDate"
                            @input="updateStartDate($event, index)"
                        /> -->
                    </a-form-item>

                    <!-- End Date -->
                    <a-form-item class="w-full" label="End Date">
                        <!-- <input
                            class="w-full input-date"
                            type="date"
                            :name="`content.${index}.endDate`"
                            :value="props.content[index]?.endDate"
                            @input="updateEndDate($event, index)"
                        /> -->
                    </a-form-item>
                </div>

                <!-- Description -->
                <TextAreaForm
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
                    v-if="content.length > 1"
                >
                    <DeleteOutlined :style="{ color: 'red' }" />
                </a-button>
            </div>

            <!-- Add Experience Button -->
            <a-button type="dashed" block @click="addField">
                <span>+ Add Experience</span>
            </a-button>

            <!-- Submit Button -->
            <a-button type="primary" html-type="submit" class="submit-btn">
                Submit
            </a-button>
        </a-form>
    </div>
</template>

<script setup lang="ts">
    import { useFieldArray, useForm, Field, ErrorMessage } from "vee-validate";
    import { z } from "zod";
    import { toFieldValidator } from "@vee-validate/zod";
    import { DeleteOutlined } from "@ant-design/icons-vue";
    import dayjs from "dayjs";
    import { updateExperienceSchema } from "~/utils/schema";

    type UpdateExperienceType = z.infer<typeof updateExperienceSchema>;
    // Props received from the parent
    const props = defineProps<{
        content?: Array<UpdateExperienceType>;
    }>();

    // Validation schema for an individual experience

    // Schema for the entire form
    const FormSchema = z.object({
        type: z.string(),
        content: z.array(updateExperienceSchema),
    });

    // Initialize the form with validation schema and initial values
    const { handleSubmit, values } = useForm({
        validationSchema: toFieldValidator(FormSchema),
        initialValues: {
            // Use the passed experiences or an empty array
            content: props.content || [],
            type: "experiences"
        },
    });

    const { fields: content, push, remove } = useFieldArray("content");

    // Format date to the required format for the input[type="date"] field (YYYY-MM-DD)
    // const formatDate = (date: string) => {
    //     return dayjs(date).format("YYYY-MM-DD"); // Ensure the date is in the correct format
    // };

    // Update startDate
    const updateStartDate = (event: Event, index: number) => {
        const newStartDate = new Date((event.target as HTMLInputElement).value);
        if (values.content) values.content[index].startDate = newStartDate; // Handle invalid dates
    };

    const updateEndDate = (event: Event, index: number) => {
        const newEndDate = new Date((event.target as HTMLInputElement).value);
        if (values.content) values.content[index].endDate = newEndDate; // Handle invalid dates
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
    const onSubmit = handleSubmit((data) => {
        console.log("Submitted data:", data);
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
