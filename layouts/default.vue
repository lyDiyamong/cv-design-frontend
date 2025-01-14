<template>
    <main class="auth-layout">
        <section class="center-container">
            <NuxtImg src="/images/logo.png" width="45" alt="Logo img" />
            <NuxtPage />
        </section>
    </main>
</template>

<script setup></script>

<style scoped>
    .auth-layout {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
    }

    .center-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        padding: 42px;
        border-radius: var(--border-radius-section);
        background-color: white;
    }
</style>
