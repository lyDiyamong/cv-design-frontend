<template>
    <a-page-header title="Dashboard" />
    <section class="dashboard-container">
        <Greeting last-name="Diyamong" />
    </section>
</template>

<script lang="ts" setup>

definePageMeta({
    layout: "dashboard",
})
    import { useAuthStore } from "../../store/auth/index";

    const authStore = useAuthStore();
    console.log(authStore.user);
</script>

<style>
    .dashboard-container {
        padding: 16px 24px;
    }
    .greeting-card {
        border: 1px solid rgb(235, 237, 240);
        background-color: var(--color-primary-light);
    }
</style>
