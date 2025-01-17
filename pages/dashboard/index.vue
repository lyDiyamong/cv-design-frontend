<template>
    <a-page-header title="Dashboard" />
    <section class="dashboard-container">
        <Greeting v-if="user?.lastName" :last-name="user?.lastName" />
    </section>
</template>

<script lang="ts" setup>
    definePageMeta({
        layout: "dashboard",
    });

    import { useAuthStore } from "~/store/auth";
    import { storeToRefs } from "pinia";

    // Use Pinia store
    const userStore = useAuthStore();

    // Convert store properties to reactive refs
    const { user } = storeToRefs(userStore);

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
