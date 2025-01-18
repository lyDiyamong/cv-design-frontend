<template>
    <h2 class="text">Create an account</h2>
    <a-form layout="vertical" class="full-width" @submit.prevent="onSubmit">
        <!-- Name section -->
        <div class="flex-between">
            <Input
                name="firstName"
                label="First Name"
                placeholder="e.g(John)"
            />
            <Input
                name="lastName"
                label="Last Name"
                placeholder="e.g(Doe)"
                am
            />
        </div>
        <!-- Email -->
        <Input
            name="email"
            label="Email"
            placeholder="e.g(johndoe@gmail.com)"
        />
        <div class="flex-between">
            <!-- Gender -->
            <SelectInput
                name="gender"
                label="Gender"
                placeholder="Select your gender"
                :options="genderOptions"
            />

            <!-- Date of Birth -->
            <DateInput
                name="dateOfBirth"
                label="Date of Birth"
                placeholder="Choose your dob"
            />
        </div>

        <!-- Password -->
        <Input name="password" label="Password" placeholder="pass1234" />
        <Input
            name="confirmPassword"
            label="Confirm Password"
            placeholder="pass1234"
        />
        <a-button class="full-width" type="primary" html-type="submit">
            Sign up
        </a-button>
    </a-form>
    <div class="bottom-text">
        <a-typography-text>
            Already have an account?
            <a-typography-link style="color: var(--color-primary-main);" href="/"> Log in </a-typography-link>
        </a-typography-text>
    </div>
</template>

<script lang="ts" setup>
    import { useForm } from "vee-validate";
    import { toFieldValidator } from "@vee-validate/zod";
    import { signUpSchema } from "../utils/schema";
    import type { SignupType } from "../types/auth";
    import { useAuth } from "~/composables/useAuth";
    import { useAlertStore } from "../store/alert";

    const genderOptions = [
        {
            value: "Male",
            label: "Male",
        },
        {
            value: "Female",
            label: "Female",
        },
    ];

    const zodResolver = toFieldValidator(signUpSchema);
    const { handleSubmit } = useForm<SignupType>({
        validationSchema: zodResolver,
    });

    const { signupMutation } = useAuth();
    const alertStore = useAlertStore();

    const onSubmit = handleSubmit(async (formValues) => {
        try {
            const data = await signupMutation.mutateAsync({
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                gender: formValues.gender,
                dateOfBirth: formValues.dateOfBirth,
                email: formValues.email,
                password: formValues.password,
                confirmPassword: formValues.confirmPassword,
            });

            if (data) {
                alertStore.showAlert({
                    message: data.message,
                    type: "success",
                    duration: 5000,
                });
                navigateTo("/dashboard");
            }
        } catch (error: any) {
            alertStore.showAlert({
                message: error.response.data.message,
                type: "error",
                duration: 5000,
            });
        }
    });
</script>

<style scoped>
    .auth-layout {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .logo-container {
        text-align: center;
        margin-bottom: 20px;
    }
    .text {
        margin-top: 20px;
        color: var(--color-primary-main);
    }
    .bottom-text {
        margin-top: 8px;
        display: flex;
        justify-content: center;
    }
    .signup-link {
        color: var(--color-primary-main);
        cursor: pointer;
    }
</style>
