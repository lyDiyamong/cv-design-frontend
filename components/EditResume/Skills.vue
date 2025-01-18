<template>
    <div>
        <div>
            <h3>Skills</h3>
            <p class="sub-title">Write down the specific skills</p>
        </div>

        <a-form @submit.prevent="onSubmit" layout="vertical">
            <div v-for="(field, index) in fields" :key="index" class="form-row">
                <!-- Skill Input -->
                <a-form-item class="w-full" label="Skill">
                    <Field
                        :name="`fields.${index}.skill`"
                        as="a-input"
                        placeholder="Skill"
                    />
                    <ErrorMessage
                        :name="`fields.${index}.skill`"
                        class="error-message"
                    />
                </a-form-item>

                <!-- Level Dropdown -->
                <a-form-item class="w-full" label="Level">
                    <Field
                        :name="`fields.${index}.level`"
                        as="a-select"
                        placeholder="Select level"
                    >
                        <a-select-option value="Beginner"
                            >Beginner</a-select-option
                        >
                        <a-select-option value="Intermediate"
                            >Intermediate</a-select-option
                        >
                        <a-select-option value="Advanced"
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
                    v-if="fields.length > 1"
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
        fields: z.array(SkillSchema),
    });

    const { handleSubmit, values } = useForm({
        validationSchema: toFieldValidator(FormSchema),
        initialValues: {
            fields: [], // This will be populated dynamically from parent data
        },
    });

    // Dynamically set initial values with skills data from parent (cvData)
    const { fields, push, remove } = useFieldArray("fields");

    const addField = () => {
        push({ skill: "", level: "" });
    };

    const removeField = (index: number) => {
        remove(index);
    };

    const onSubmit = handleSubmit((data) => {
        console.log("Submitted data:", data);
    });

    const props = defineProps<{ skills: UpdateSkillContent[] }>();
    if (props.skills) {
        props.skills.forEach((skill) => {
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
