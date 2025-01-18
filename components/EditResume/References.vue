<template>
    <section>
        <div>
            <h3>Reference</h3>
            <p class="sub-title">Tell about the Reference person</p>
        </div>

        <a-form @submit.prevent="onSubmit" layout="vertical">
            <div class="flex-form-group">
                <Input
                    :initial-value="formValues.refFirstName"
                    name="firstName"
                    placeholder="First Name"
                    label="First Name"
                />
                <Input
                    :initial-value="formValues.refLastName"
                    name="lastName"
                    placeholder="Last Name"
                    label="Last Name"
                />
            </div>

            <div class="flex-form-group">
                <Input
                    :initial-value="formValues.refPosition"
                    name="position"
                    placeholder="Position"
                    label="Position"
                />
                <Input
                    :initial-value="formValues.refEmail"
                    name="email"
                    placeholder="example@gmail.com"
                    label="Email"
                />
            </div>

            <div class="flex-form-group">
                <Input
                    :initial-value="formValues.refCompany"
                    name="company"
                    placeholder="Company Name"
                    label="Company"
                />
            </div>

            <a-form-item>
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
        </a-form>
        <!-- 
      <div>
        <h3>Reference Information</h3>
        <p>First Name: {{ formValues.refFirstName }}</p>
        <p>Last Name: {{ formValues.refLastName }}</p>
        <p>Position: {{ formValues.refPosition }}</p>
        <p>Email: {{ formValues.refEmail }}</p>
        <p>Phone Number: {{ formValues.refPhoneNumber }}</p>
        <p>Company: {{ formValues.refCompany }}</p>
      </div> -->
    </section>
</template>

<script setup lang="ts">
    import { useForm } from "vee-validate";
    import * as z from "zod";
    import { toFieldValidator } from "@vee-validate/zod";
    import type { UpdateReferenceContent } from "~/types/sections";
    import { updateReferenceSchema } from "~/utils/schema";

    const props = defineProps<{ references: UpdateReferenceContent[] }>();

    const formValues = reactive({
        refFirstName: props?.references[0]?.firstName || "",
        refLastName: props?.references[0]?.lastName || "",
        refPosition: props?.references[0]?.position || "",
        refEmail: props?.references[0]?.email || "",
        refCompany: props?.references[0]?.company || "",
    });

    const zodResolver = toFieldValidator(updateReferenceSchema);

    const { handleSubmit } = useForm({
        validationSchema: zodResolver,
    });

    const onSubmit = handleSubmit((values) => {
        console.log("Reference Form Submitted:", values);
    });
</script>

<style scoped>
    .flex-form-group {
        display: flex;
        gap: 16px;
    }
    .sub-title {
        color: #888;
        font-size: 14px;
    }
</style>
