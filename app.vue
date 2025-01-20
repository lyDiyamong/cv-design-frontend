<template>
    <ConfigProvider :theme="themeConfig">
        <NuxtLayout />
        <!-- Dynamically loads layouts -->
    </ConfigProvider>
</template>

<script setup>
    import { ConfigProvider } from "ant-design-vue";

    // Override Ant Design Vue theme with a light mode configuration
    const themeConfig = {
        token: {
            colorPrimary: "#ff9d3d", // Your custom primary color
            borderRadius: "6px", // Global border radius
            typographyMarginBottom: 0,
        },
        // Force light mode by default
        theme: "light", // Specify "light" explicitly to disable dark mode
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
    p, h4, h5, h6 {
        margin: 0 0;
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
        background-color: var(
            --color-background-default
        ); /* Neutral background color */
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

    a {
        text-decoration: none;
        color: inherit;
    }

    /* Border Box Example Styling */
    .ant-btn,
    .ant-card,
    .ant-input {
        border-radius: var(--border-radius, 6px);
        font-family: inherit;
    }

    .ant-layout-sider-trigger {
        background: white;
    }

    .flex-between {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 8px;
    }
    .flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .full-width {
        width: 100%;
    }
    .border-style {
        border: 1px solid var(--color-gray-200);
    }

    .input-date {
        border: 1px solid rgb(215, 215, 215);
        border-radius: 6px;
        padding: 4px;
    }
    .button-resume-container {
        width: 100%;
        text-align: right;
        margin-top: 16px;
    }
    .form-container{
        border-radius: var(--border-radius, 6px);
        border: 1px solid var(--border-color);
    }
</style>
