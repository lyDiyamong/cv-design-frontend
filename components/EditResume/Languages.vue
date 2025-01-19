<template>
    <div>
        <div>
            <h3>Languages</h3>
            <p class="sub-title">Write down the specific languages</p>
        </div>

        <a-form @submit.prevent="onSubmit" layout="vertical">
            <div
                v-for="(field, index) in content"
                :key="index"
                class="form-row"
            >
                <!-- Language Field -->
                <a-form-item class="full-width" label="Language">
                    <Field
                        :name="`content.${index}.language`"
                        as="a-input"
                        placeholder="Language"
                    />
                    <ErrorMessage
                        :name="`content.${index}.language`"
                        class="error-message"
                    />
                </a-form-item>

                <!-- Level Select Field -->
                <a-form-item class="full-width" label="Level">
                    <Field
                        :name="`content.${index}.level`"
                        as="a-select"
                        placeholder="Select Level"
                    >
                        <a-select-option value="Beginner"
                            >Beginner</a-select-option
                        >
                        <a-select-option value="Intermediate"
                            >Intermediate</a-select-option
                        >
                        <a-select-option value="Advance"
                            >Advanced</a-select-option
                        >
                        <a-select-option value="Fluent">Fluent</a-select-option>
                    </Field>
                    <ErrorMessage
                        :name="`content.${index}.level`"
                        class="error-message"
                    />
                </a-form-item>

                <!-- Remove Field Button -->
                <a-button
                    type="link"
                    @click="removeField(index)"
                    v-if="content.length > 1"
                >
                    <DeleteOutlined :style="{ color: 'red' }" />
                </a-button>
            </div>

            <!-- Add Language Button -->
            <a-button type="dashed" block @click="addField">
                <span>+ Add Language</span>
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
    import type { UpdateLanguageContent } from "~/types/sections";

    // Define the validation schema
    const LanguageSchema = z.object({
        language: z.string().optional(),
        level: z.string().optional(), // Validate that level is selected
    });

    const FormSchema = z.object({
        type: z.string(),
        content: z.array(LanguageSchema),
    });


    // Initialize form with validation
    const { handleSubmit, values } = useForm({
        validationSchema: toFieldValidator(FormSchema),
        initialValues: {
            type: "languages",
        },
    });

    // Dynamically set initial values with languages data from parent (cvData)
    const { fields: content, push, remove } = useFieldArray("content");

    const addField = () => {
        push({ language: "", level: "" });
    };

    const removeField = (index: number) => {
        remove(index);
    };

    const onSubmit = handleSubmit((data) => {
        console.log("Submitted data:", data);
    });

    

    // Props for languages passed from parent
    const props = defineProps<{ content: UpdateLanguageContent[] }>();

    console.log("content language",props.content)
    // Initialize form fields with languages data
    if (props.content && props.content.length > 0) {
        props.content.forEach((language) => {
            push({ language: language.language, level: language.level });
        });
    }
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
</style>
