<template>
    <a-typography-title style="font-size: var(--font-size-h4)">
        Personal Information
    </a-typography-title>
    <form @submit.prevent="onSubmit">
        <a-form layout="vertical">
            <Input
                name="position"
                label="Position"
                placeholder="Enter position"
            />
            <div class="flex-between">
                <Input
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                />
                <Input
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                />
            </div>
            <div class="flex-between">
                <Input
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                />
                <Input
                    name="phone"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                />
            </div>
            <TextArea
                name="summary"
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

    const schema = z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        position: z.string().min(1, "Position is required"),
        email: z.string().email("Invalid email"),
        phone: z.string().min(1, "Phone number is required"),
        summary: z
            .string()
            .min(1, "Summary is required")
            .max(450, "Max character is 450")
            .optional(),
    });

    const zodResolver = toFieldValidator(schema);
    type FormSchema = z.infer<typeof schema>;
    const { handleSubmit, values } = useForm<FormSchema>({
        validationSchema: zodResolver,
    });

    const onSubmit = handleSubmit((formValues) => {
        console.log("Form submitted with values:", formValues);
    });
</script>
