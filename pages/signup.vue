<template>
    <h2 class="text">Create an account</h2>
    <a-form class="full-width">
        <!-- Name section -->
        <div class="flex-between">
            <a-form-item>
                <label for="firstName">First Name</label>
                <a-input placeholder="Jane" />
            </a-form-item>
            <a-form-item>
                <label for="lastName">Last Name</label>
                <a-input placeholder="Doe" />
            </a-form-item>
        </div>
        <!-- Email -->
        <a-form-item>
            <label for="email">Email</label>
            <a-input placeholder="e.g(janedoe@gmail.com)" />
        </a-form-item>
        <div class="flex-between">
            <!-- Gender -->
            <a-form-item>
                <label for="gender">Gender</label>
                <a-select placeholder="Select your gender">
                    <a-select-option value="Male">Male</a-select-option>
                    <a-select-option value="Female">Female</a-select-option>
                </a-select>
            </a-form-item>

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
        <a-form-item>
            <label for="password">Password</label>
            <a-input type="password" placeholder="e.g(pass1234)" />
        </a-form-item>
        <a-form-item>
            <label for="confirmPassword">Confirm Password</label>
            <a-input type="password" placeholder="e.g(pass1234)" />
        </a-form-item>
        <a-form-item>
            <a-button class="full-width" type="primary" html-type="submit">
                Log in
            </a-button>
        </a-form-item>
    </a-form>
    <div class="bottom-text">
        <a-typography-text>
            Already have an account?
            <a-typography-link href="/" >
                Log in
            </a-typography-link>
        </a-typography-text>
    </div>
</template>

<script lang="ts" setup></script>

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
