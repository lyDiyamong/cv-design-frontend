<template>
    <div>
        <div>
            <h3>Skills</h3>
            <p class="sub-title">Write down the specific skills</p>
        </div>

        <a-form
            class="form-container"
            @submit.prevent="onSubmit"
            layout="vertical"
        >
            <div
                v-for="(field, index) in content"
                :key="index"
                class="form-row"
            >
                <!-- Skill Input -->
                <a-form-item class="full-width" label="Skill">
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
                <a-form-item class="full-width" label="Level">
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
                        :name="`content.${index}.level`"
                        class="error-message"
                    />
                </a-form-item>

                <!-- Delete Button -->
                <a-button
                    type="link"
                    @click="removeField(index)"
                    v-if="content.length > 0"
                >
                    <DeleteOutlined :style="{ color: 'red' }" />
                </a-button>
            </div>

            <!-- Add Skill Button -->
            <a-button type="dashed" block @click="addField">
                <span>+ Add skill</span>
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
    import type { UpdateSkillContent } from "~/types/sections";
    import { useAlertStore } from "~/store/alert";

    const route = useRoute();

    const resumeId = route.params.id as string;

    
    const alertStore = useAlertStore();

    const props = defineProps<{ content: UpdateSkillContent[] }>();

    // Define the validation schema
    const skillSchema = z.object({
        skill: z.string().optional(),
        level: z.string().optional(),
    });

    

    const formSchema = z.object({
        type: z.string(),
        content: z.array(skillSchema),
    });
    type UpdateSkillSchemaType = z.infer<typeof formSchema>;

    const { updateSectionMutation } = useSection<
        UpdateSkillSchemaType,
        UpdateSkillContent[]
    >();

    const { handleSubmit, values } = useForm({
        validationSchema: toFieldValidator(formSchema),
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
