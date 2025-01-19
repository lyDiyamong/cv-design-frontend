<template>
    <div>
        <div>
            <h3>Reference</h3>
            <p class="sub-title">Tell about the Reference person</p>
        </div>

        <a-form @submit.prevent="onSubmit" layout="vertical">
            <div
                v-for="(field, index) in content"
                :key="index"
                class="form-row"
            >
                <section>
                    <div class="flex-between">
                        <!-- First Name -->
                        <a-form-item class="full-width" label="First Name">
                            <Field
                                class="full-width"
                                :name="`content.${index}.firstName`"
                                as="a-input"
                                placeholder="First Name"
                            />
                            <ErrorMessage
                                :name="`content.${index}.firstName`"
                                class="error-message"
                            />
                        </a-form-item>

                        <!-- Last Name -->
                        <a-form-item class="full-width" label="Last Name">
                            <Field
                                class="full-width"
                                :name="`content.${index}.lastName`"
                                as="a-input"
                                placeholder="Last Name"
                            />
                            <ErrorMessage
                                :name="`content.${index}.lastName`"
                                class="error-message"
                            />
                        </a-form-item>
                    </div>
                    <div class="flex-between">
                        <!-- Position -->
                        <a-form-item class="full-width" label="Position">
                            <Field
                                class="full-width"
                                :name="`content.${index}.position`"
                                as="a-input"
                                placeholder="Position"
                            />
                            <ErrorMessage
                                :name="`content.${index}.position`"
                                class="error-message"
                            />
                        </a-form-item>
                        <!-- Company -->
                        <a-form-item class="full-width" label="Company">
                            <Field
                                class="full-width"
                                :name="`content.${index}.company`"
                                as="a-input"
                                placeholder="Company Name"
                            />
                            <ErrorMessage
                                :name="`content.${index}.company`"
                                class="error-message"
                            />
                        </a-form-item>
                    </div>

                    <!-- Email -->
                    <a-form-item class="full-width" label="Email">
                        <Field
                            class="full-width"
                            :name="`content.${index}.email`"
                            as="a-input"
                            placeholder="example@gmail.com"
                        />
                        <ErrorMessage
                            :name="`content.${index}.email`"
                            class="error-message"
                        />
                    </a-form-item>
                </section>

                <a-button
                    type="link"
                    @click="removeField(index)"
                    v-if="content.length > 1"
                >
                    <DeleteOutlined :style="{ color: 'red' }" />
                </a-button>
            </div>

            <a-button type="dashed" block @click="addField">
                <span>+ Add Reference</span>
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
    import type { UpdateReferenceContent } from "../../types/sections";

    const props = defineProps<{
        content: UpdateReferenceContent[];
    }>();

    // Form validation schema
    const FormSchema = z.object({
        type: z.string(),
        content: z.array(updateReferenceSchema),
    });

    // Initialize the form
    const { handleSubmit } = useForm({
        validationSchema: toFieldValidator(FormSchema),
        initialValues: {
            type: "references",
        },
    });

    // Field array operations
    const { fields: content, push, remove } = useFieldArray("content");

    // Add a new field
    const addField = () => {
        push({
            firstName: "",
            lastName: "",
            position: "",
            email: "",
            company: "",
        });
    };

    // Remove a field
    const removeField = (index: number) => {
        remove(index);
    };

    // Submit handler
    const onSubmit = handleSubmit((data) => {
        console.log("Reference Form Submitted:", data);
    });

    if (props.content) {
        props.content.forEach((reference) => {
            push({
                firstName: reference.firstName,
                lastName: reference.lastName,
                email: reference.email,
                company: reference.company,
                position: reference.position,
            });
        });
    }
</script>

<style scoped>
    .form-row {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
    }

    .full-width {
        width: 100%;
    }

    .submit-btn {
        margin-top: 1rem;
    }

    .error-message {
        color: red;
        font-size: 0.9rem;
    }
</style>
