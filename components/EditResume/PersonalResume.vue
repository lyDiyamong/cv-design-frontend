<template>
    <a-typography-title style="font-size: var(--font-size-h4)">
        Personal Information
    </a-typography-title>
    <form @submit.prevent="handleSubmit(onSubmit)">
        <a-form layout="vertical">
            <Input
                name="position"
                label="First Name"
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
        </a-form>
        <a-button type="primary" html-type="submit">Submit</a-button>
    </form>
</template>

<script lang="ts" setup>
    import { useForm } from "vee-validate";
    import * as z from "zod";

    const schema = z.object({
        name: z.string().min(3, "Name must be at least 3 characters long"),
        email: z.string().email("Invalid email address"),
    });

    type FormSchema = z.infer<typeof schema>;
    const { handleSubmit } = useForm<FormSchema>({
        validationSchema: schema,
    });

    const onSubmit = (values: FormSchema) => {
        console.log("Form submitted with values:", values);
    };
</script>
