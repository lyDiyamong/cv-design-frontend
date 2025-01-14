import { NuxtLink } from '../.nuxt/components';
<template>
    <h2 class="text">Welcome to QuickCV</h2>
    <a-form class="login-form">
        <a-form-item>
            <label for="email">Email</label>
            <a-input placeholder="e.g(janedoe@gmail.com)" />
        </a-form-item>
        <a-form-item>
            <label for="password">Password</label>
            <a-input type="password" placeholder="e.g(pass1234)" />
        </a-form-item>
        <a-form-item>
            <a-button
                type="primary"
                html-type="submit"
                class="login-form-button"
            >
                Log in
            </a-button>
        </a-form-item>
    </a-form>
    <div class="flex-center">
        <p>
            Don't have an account?
            <span class="signup-link"><NuxtLink href="/signup">Sign up</NuxtLink></span>
        </p>
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
    .login-form {
        width: 100%;
    }
    .login-form-button {
        width: 100%;
    }
    .bottom-text{
        display: flex;
        justify-content: center;
    }
    .signup-link {
        color: var(--color-primary-main);
        cursor: pointer;
    }
</style>
