<template>
    <a-page-header title="Dashboard" />
    <!-- Alert Message -->
    <AlertMessage
        v-if="alertVisible"
        :message="alertMessage"
        :type="alertType"
        :duration="5000"
    />
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

    const authStore = useAuthStore();

    // Alert visibility and state
    const alertVisible = ref(false);
    const alertMessage = ref("");
    const alertType = ref<"info" | "success" | "error">("info");

    // Watch authStore.message for changes
    watch(
        () => authStore.message,
        (newMessage) => {
            if (newMessage) {
                console.log("message trigger", newMessage);
                alertMessage.value = newMessage;
                alertType.value = "success"; // Customize type as needed
                alertVisible.value = true;
            }
        }
    );

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
