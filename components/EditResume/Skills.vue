<template>
    <div>
        <div>
            <h3>Skills</h3>
            <p class="sub-title">Write down the specific skills</p>
        </div>

        <a-form @submit.prevent="onSubmit" layout="vertical">
            <div
                v-for="(field, index) in content"
                :key="index"
                class="form-row"
            >
                <!-- Skill Input -->
                <a-form-item class="w-full" label="Skill">
                    <Field
                        :name="`content.${index}.skill`"
                        as="a-input"
                        placeholder="Skill"
                    />
                    <ErrorMessage
                        :name="`content.${index}.skill`"
                        class="error-message"
                    />
                </a-form-item>

                <!-- Level Dropdown -->
                <a-form-item class="w-full" label="Level">
                    <Field
                        :name="`content.${index}.level`"
                        as="a-select"
                        placeholder="Select level"
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
                        <a-select-option value="Expert">Expert</a-select-option>
                    </Field>
                    <ErrorMessage
                        :name="`fields.${index}.level`"
                        class="error-message"
                    />
                </a-form-item>

                <!-- Delete Button -->
                <a-button
                    type="link"
                    @click="removeField(index)"
                    v-if="content.length > 1"
                >
                    <DeleteOutlined :style="{ color: 'red' }" />
                </a-button>
            </div>

            <!-- Add Skill Button -->
            <a-button type="dashed" block @click="addField">
                <span>+ Add skill</span>
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
    import type { UpdateSkillContent } from "~/types/sections";

    // Define the validation schema
    const SkillSchema = z.object({
        skill: z.string().min(1, "Skill is required"),
        level: z.string().min(1, "Level is required"),
    });

    const FormSchema = z.object({
        type: z.string(),
        content: z.array(SkillSchema),
    });

    const { handleSubmit, values } = useForm({
        validationSchema: toFieldValidator(FormSchema),
        initialValues: {
            type: "skills",
        },
    });

    // Dynamically set initial values with skills data from parent (cvData)
    const { fields: content, push, remove } = useFieldArray("content");

    const addField = () => {
        push({ skill: "", level: "" });
    };

    const removeField = (index: number) => {
        remove(index);
    };

    const onSubmit = handleSubmit((data) => {
        console.log("Submitted data:", data);
    });

    const props = defineProps<{ content: UpdateSkillContent[] }>();
    if (props.content) {
        props.content.forEach((skill) => {
            push({ skill: skill.name, level: skill.level });
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
