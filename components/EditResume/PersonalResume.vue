<template>
    <a-typography-title style="font-size: var(--font-size-h4)">
        Personal Information
    </a-typography-title>
    <a-form class="form-container" layout="vertical" @submit.prevent="onSubmit">
        <div class="flex-between">
            <Input
                name="content.firstName"
                :initial-value="content.firstName"
                label="First Name"
                placeholder="Enter your first name"
            />
            <Input
                name="content.lastName"
                :initial-value="content.lastName"
                label="Last Name"
                placeholder="Enter your last name"
            />
        </div>
        <Input
            name="content.position"
            :initial-value="content.position || ''"
            label="Position"
            placeholder="Enter your position"
        />
        <TextArea
            name="content.summary"
            :initial-value="content.summary || ''"
            label="Summary"
            placeholder="Enter your summary"
        />
        <div class="button-resume-container">
            <a-button type="primary" html-type="submit">Save</a-button>
        </div>
    </a-form>
</template>

<script lang="ts" setup>
    import { useForm } from "vee-validate";
    import { toFieldValidator } from "@vee-validate/zod";
    import * as z from "zod";
    import type { UpdatePersonalContent } from "../../types/sections";
    import { useAlertStore } from "../../store/alert";

    const props = defineProps<{
        content: UpdatePersonalContent;
    }>();

    const route = useRoute();

    const resumeId = route.params.id as string;

    const alertStore = useAlertStore();

    const formSchema = z.object({
        type: z.string(),
        content: z.object({
            firstName: z.string().min(1, "First name is required"),
            lastName: z.string().min(1, "Last name is required"),
            position: z.string(),
            summary: z.string().max(450, "Max character is 450").optional(),
        }),
    });

    type UpdatePersonalSchemaType = z.infer<typeof formSchema>;

    const { updateSectionMutation } = useSection<
        UpdatePersonalSchemaType,
        UpdatePersonalContent
    >();

    const {reset} = updateSectionMutation

    const zodResolver = toFieldValidator(formSchema);
    const { handleSubmit } = useForm({
        validationSchema: zodResolver,
        initialValues: {
            type: "personal",
        },
    });

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
