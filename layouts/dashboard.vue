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

<script lang="ts" setup>
    // No additional script needed as Sidebar is imported directly
</script>

<style scoped>
    /* Add custom styling for layout, if necessary */
    .ant-layout-header {
        display: flex;
        align-items: center;
        justify-content: end;
    }
</style>
