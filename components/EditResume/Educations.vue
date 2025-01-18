<template>
    <div>
        <div>
            <h3>Education</h3>
            <p class="sub-title">
                Provide details about your educational background
            </p>
        </div>

        <a-form @submit.prevent="onSubmit" layout="vertical">
            <div v-for="(field, index) in fields" :key="index" class="form-row">
                <section>
                    <div class="form-row">
                        <!-- School Name -->
                        <a-form-item class="w-full" label="School Name">
                            <Field
                                class="w-full"
                                :name="`fields.${index}.schoolName`"
                                as="a-input"
                                placeholder="School Name"
                            />
                            <ErrorMessage
                                :name="`fields.${index}.schoolName`"
                                class="error-message"
                            />
                        </a-form-item>

                        <!-- Degree/Major -->
                        <a-form-item class="w-full" label="Degree/Major">
                            <Field
                                class="w-full"
                                :name="`fields.${index}.degreeMajor`"
                                as="a-input"
                                placeholder="Degree/Major"
                            />
                            <ErrorMessage
                                :name="`fields.${index}.degreeMajor`"
                                class="error-message"
                            />
                        </a-form-item>
                    </div>

                    <div class="form-row">
                        <!-- Start Date -->
                        <a-form-item class="w-full" label="Start Date">
                            <input
                                class="w-full input-date"
                                type="date"
                                :name="`fields.${index}.startDate`"
                                :value="
                                    formatDate(
                                        props.education[index]?.startDate
                                    )
                                "
                                @input="updateStartDate($event, index)"
                            />
                        </a-form-item>

                        <!-- End Date -->
                        <a-form-item class="w-full" label="End Date">
                            <input
                                class="w-full input-date"
                                type="date"
                                :name="`fields.${index}.endDate`"
                                :value="
                                    formatDate(props.education[index]?.endDate)
                                "
                                @input="updateEndDate($event, index)"
                            />
                        </a-form-item>
                    </div>
                </section>

                <a-button
                    type="link"
                    @click="removeField(index)"
                    v-if="fields.length > 1"
                >
                    <DeleteOutlined :style="{ color: 'red' }" />
                </a-button>
            </div>

            <a-button type="dashed" block @click="addField">
                <span>+ Add Education</span>
            </a-button>

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

    // Props received from the parent
    const props = defineProps<{
        education: Array<{
            schoolName: string;
            degreeMajor: string;
            startDate: string;
            endDate: string;
        }>;
    }>();

    // Validation schema for an individual education entry
    const EducationSchema = z.object({
        schoolName: z.string().min(1, "School Name is required"),
        degreeMajor: z.string().min(1, "Degree/Major is required"),
        startDate: z.string().min(1, "Start Date is required"),
        endDate: z.string().min(1, "End Date is required"),
    });

    const FormSchema = z.object({
        fields: z.array(EducationSchema),
    });

    const { handleSubmit, values } = useForm({
        validationSchema: toFieldValidator(FormSchema),
        initialValues: {
            fields: props.education || [],
        },
    });

    // const { fields, push, remove } = useFieldArray<{
    //   schoolName: string;
    //   degreeMajor: string;
    //   startDate: string;
    //   endDate: string;
    // }>("fields");

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

    const { fields, push, remove } = useFieldArray<{
        schoolName: string;
        degreeMajor: string;
        startDate: string;
        endDate: string;
    }>("fields");

    const updateStartDate = (event: Event, index: number) => {
        const newStartDate = (event.target as HTMLInputElement).value;
        const { value } = fields.value[index];
        value.startDate = newStartDate;
    };

    const updateEndDate = (event: Event, index: number) => {
        const newEndDate = (event.target as HTMLInputElement).value;
        const { value } = fields.value[index];
        value.endDate = newEndDate;
    };

    // Submit form handler
    const onSubmit = handleSubmit((data) => {
        console.log("Submitted data:", data);
        // Do not reset the form here
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
