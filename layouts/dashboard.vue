<template>
    <a-layout style="min-height: 100vh">
        <!-- Sidebar -->
        <Sidebar />
        <AlertMessage
            v-if="alertStore.isVisible"
            :message="alertStore.message"
            :type="alertStore.type"
            :duration="5000"
        />

        <SpinLoading :loading="isLoading" />

        <!-- Main content area -->
        <a-layout>
            <!-- Optionally add a header -->
            <a-layout-header style="background: white">
                <Header />
            </a-layout-header>

            <!-- Content area -->
            <a-layout-content style="padding: 24px">
                <NuxtPage />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
    import { useAuthStore } from "../store/auth/index";
    import { useUser } from "~/composables/useUser";
    import { useAlertStore } from "../store/alert";

    const router = useRouter();
    const authStore = useAuthStore();
    const { userQuery } = useUser();

    const { isLoading } = userQuery;

    const alertStore = useAlertStore();

    // Redirect logic
    watchEffect(() => {
        if (userQuery.isLoading.value) return; // Wait for the query to finish loading

        if (userQuery.error.value || !userQuery.data.value) {
            console.error("User not authenticated or an error occurred.");
            router.push("/"); // Redirect to login page
        }
    });
</script>

<style scoped>
    /* Add custom styling for layout, if necessary */
    .ant-layout-header {
        display: flex;
        align-items: center;
        justify-content: end;
    }
</style>
