<template>
    <a-typography-title style="font-size: var(--font-size-h4)">
        Personal Information
    </a-typography-title>
    <form @submit.prevent="onSubmit">
        <a-form layout="vertical">
            
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
                name="coneent.position"
                :initial-value="content.position"
                label="Position"
                placeholder="Enter your address"
            />
            <TextArea
                name="content.summary"
                :initial-value="content.summary"
                label="Summary"
                placeholder="Enter your summary"
            />
        </a-form>
    </form>
</template>

<script lang="ts" setup>
    import { useForm } from "vee-validate";
    import { toFieldValidator } from "@vee-validate/zod";
    import * as z from "zod";
    import type { UpdatePersonalContent } from "../../types/sections";

    const props = defineProps<{
        content: UpdatePersonalContent;
    }>();

    const schema = z.object({
        type: z.string(),
        content: z.object({
            firstName: z.string().min(1, "First name is required"),
            lastName: z.string().min(1, "Last name is required"),
            position: z.string(),
            summary: z
                .string()
                .max(450, "Max character is 450")
                .optional(),
        }),
    });

    const zodResolver = toFieldValidator(schema);
    type FormSchema = z.infer<typeof schema>;
    const { handleSubmit } = useForm<FormSchema>({
        validationSchema: zodResolver,
        initialValues: {
            type: 'personal'
        }
    });

    const onSubmit = handleSubmit((formValues) => {
        console.log("Form submitted with values:", formValues);
    });
</script>
