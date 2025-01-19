<template>
    <a-typography-title style="font-size: var(--font-size-h4)">
        Contact
    </a-typography-title>
    <a-form layout="vertical" @submit.prevent="onSubmit">
        <Input
            name="content.email"
            :initial-value="content.email"
            label="Email"
            placeholder="Enter your email"
        />
        <Input
            name="content.phone"
            label="Phone Number"
            :initial-value="content.phone"
            placeholder="Enter your phone number"
        />
        <Input
            name="content.address"
            label="Address"
            :initial-value="content.address"
            placeholder="Enter your address"
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

    import type { UpdateContactContent } from "../../types/sections";
    import { useAlertStore } from "~/store/alert";

    const props = defineProps<{
        content: UpdateContactContent;
    }>();

    const route = useRoute();

    const resumeId = route.params.id as string;

    const { updateSectionMutation } = useSection();
    const alertStore = useAlertStore();

    const schema = z.object({
        type: z.string(),
        content: z
            .object({
                phone: z.string().optional(),
                email: z.string().email("Invalid email address").optional(),
                address: z.string().optional(),
            })
            .optional(),
    });

    const zodResolver = toFieldValidator(schema);
    type FormSchema = z.infer<typeof schema>;
    const { handleSubmit, values } = useForm<FormSchema>({
        validationSchema: zodResolver,
        initialValues: {
            type: "contact",
        },
    });

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
</script>
