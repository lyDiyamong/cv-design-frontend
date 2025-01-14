<template>
    <ConfigProvider :theme="themeConfig">
        <NuxtLayout />
        <!-- Dynamically loads layouts -->
    </ConfigProvider>
</template>

<script setup>
    import { ConfigProvider } from "ant-design-vue";

    const themeConfig = {
        token: {
            colorPrimary: "#1DA57A",
            borderRadius: "6px", // Global border radius
        },
    };
</script>

<style>
    /* Global Box Sizing and Body Styles */
    html {
        box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: var(
            --font-family-primary,
            "Montserrat",
            Arial,
            sans-serif
        );
        font-size: var(--font-size-md, 14px);
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9; /* Neutral background color */
    }

    /* Ant Design Typography Global Styling */
    .ant-typography {
        font-family: var(
            --font-family-primary,
            "Montserrat",
            Arial,
            sans-serif
        );
        font-size: var(--font-size-body1, 16px);
        color: inherit;
    }

    /* Border Box Example Styling */
    .ant-btn,
    .ant-card,
    .ant-input {
        border-radius: var(--border-radius, 6px);
        font-family: inherit;
    }
</style>
