<template>
    <h2 class="text">Welcome to QuickCV</h2>
    <AlertMessage
        v-if="alertStore.isVisible"
        :message="alertStore.message"
        :type="alertStore.type"
        :duration="5000"
    />
    <a-form layout="vertical" @submit.prevent="onSubmit" class="full-width">
        <Input
            name="email"
            placeholder="e.g(janedoe@gmail.com)"
            label="Email"
        />
        <Input name="password" label="Password" placeholder="pass1234" />
        <a-button type="primary" html-type="submit" class="full-width">
            Log in
        </a-button>
    </a-form>
    <div class="flex-center bottom-text">
        <p>
            Don't have an account?
            <span class="signup-link"
                ><NuxtLink href="/signup">Sign up</NuxtLink></span
            >
        </p>
    </div>
</template>

<script lang="ts" setup>
    import { useForm } from "vee-validate";
    import { toFieldValidator } from "@vee-validate/zod";
    import { loginSchema } from "../utils/schema";
    import type { LoginType } from "../types/auth";

    // Mutation
    import { useAuth } from "~/composables/useAuth";
    import { useAuthStore } from "../store/auth/index";
    import { useAlertStore } from "../store/alert";

    const authStore = useAuthStore();
    const alertStore = useAlertStore();

    const { loginMutation } = useAuth();

    const zodResolver = toFieldValidator(loginSchema);
    const { handleSubmit } = useForm<LoginType>({
        validationSchema: zodResolver,
    });

    const onSubmit = handleSubmit(async (formValues) => {
        try {
            const data = await loginMutation.mutateAsync({
                email: formValues.email,
                password: formValues.password,
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
        margin-top: 16px;
        display: flex;
        justify-content: center;
    }
    .signup-link {
        color: var(--color-primary-main);
        cursor: pointer;
    }
</style>
