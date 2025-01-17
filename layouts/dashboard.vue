<template>
    <a-layout style="min-height: 100vh">
        <!-- Sidebar -->
        <Sidebar />

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

<script setup>
import { useUser } from "~/composables/useUser";
import { useRouter } from "vue-router";

const router = useRouter();

// Fetch user data directly in the layout
const { userQuery } = useUser();

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