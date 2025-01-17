<template>
    <h2 class="text">Create an account</h2>
    <a-form class="full-width">
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
                label="Gender"
                placeholder="Select your gender"
                :options="genderOptions"
            />

            <!-- Date of Birth -->
            <a-form-item>
                <label for="dob">Date of Birth</label>
                <a-date-picker
                    class="full-width"
                    placeholder="Select date of birth"
                />
            </a-form-item>
        </div>

        <!-- Password -->
        <Input name="password" label="Password" placeholder="pass1234" /> 
        <Input name="confirmPassword" label="Confirm Password" placeholder="pass1234" />
        <a-form-item>
            <a-button class="full-width" type="primary" html-type="submit">
                Log in
            </a-button>
        </a-form-item>
    </a-form>
    <div class="bottom-text">
        <a-typography-text>
            Already have an account?
            <a-typography-link href="/"> Log in </a-typography-link>
        </a-typography-text>
    </div>
</template>

<script lang="ts" setup>
    import type Input from "~/components/Form/Input.vue";

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
        display: flex;
        justify-content: center;
    }
    .signup-link {
        color: var(--color-primary-main);
        cursor: pointer;
    }
</style>
