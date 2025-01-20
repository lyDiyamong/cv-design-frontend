<template>
    <a-layout-sider breakpoint="lg" collapsible class="bg-custom-color">
        <div class="logo text-center text-black text-lg font-semibold py-4">
            QuickCV
        </div>
        <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']">
            <a-menu-item key="1" @click="navigateToDashboard">
                <template #icon><AppstoreOutlined /></template>
                <span>Dashboard</span>
            </a-menu-item>

            <a-menu-item key="2" @click="navigateToResumes">
                <template #icon><FolderOutlined /></template>
                <span>Resumes</span>
            </a-menu-item>

            <a-menu-item key="3" @click="navigateToProfile">
                <template #icon><UserOutlined /></template>
                <span>Profile</span>
            </a-menu-item>

            <a-menu-item key="4" @click="showLogoutModal">
                <template #icon><LogoutOutlined /></template>
                <span>Logout</span>
            </a-menu-item>
        </a-menu>

        <!-- Logout Confirmation Modal -->
        <a-modal
            v-model:visible="isLogoutModalVisible"
            title="Confirm Logout"
            @ok="handleLogout"
            @cancel="handleCancel"
            ok-text="Logout"
            ok-type="primary"
            :ok-button-props="{ danger: true }"
        >
            <p>Are you sure you want to logout?</p>
        </a-modal>
    </a-layout-sider>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { useAlertStore } from "~/store/alert";
    import { useAuth } from "~/composables/useAuth";
    import { useRouter } from "nuxt/app"; // or 'vue-router' depending on your setup
    import {
        AppstoreOutlined,
        FolderOutlined,
        UserOutlined,
        LogoutOutlined,
    } from "@ant-design/icons-vue";

    const alertStore = useAlertStore();
    const { logoutMutation } = useAuth();
    const router = useRouter(); // access the router

    const isLogoutModalVisible = ref(false);

    const showLogoutModal = () => {
        isLogoutModalVisible.value = true;
    };

    const handleLogout = async () => {
        try {
            await logoutMutation.mutateAsync();
            alertStore.showAlert({
                message: "Successfully logged out",
                type: "success",
                duration: 5000,
            });
        } catch (error) {
            alertStore.showAlert({
                message: "Error logging out",
                type: "error",
                duration: 5000,
            });
        } finally {
            isLogoutModalVisible.value = false;
        }
    };

    const handleCancel = () => {
        isLogoutModalVisible.value = false;
    };

    // Navigation functions
    const navigateToDashboard = () => {
        router.push("/dashboard"); // Change the path as needed
    };

    const navigateToResumes = () => {
        router.push("/dashboard/resumes"); // Change the path as needed
    };

    const navigateToProfile = () => {
        router.push("/dashboard/profile"); // Change the path as needed
    };
</script>

<style scoped>
    .bg-custom-color {
        background-color: #ffffff;
    }

    .logo {
        text-align: center;
        color: black;
        font-size: 1.125rem; /* equivalent to text-lg */
        font-weight: 600; /* equivalent to font-semibold */
        padding-top: 1rem; /* equivalent to py-4 */
        padding-bottom: 1rem; /* equivalent to py-4 */
    }

    .ant-layout-sider-trigger {
        background-color: #ffa62f !important;
        color: white;
    }

    .ant-menu-item-selected {
        background-color: #ffc96f !important; /* Light orange background */
        color: white !important; /* White text on active item */
    }

    .ant-menu-item:hover {
        background-color: #ffeea9 !important; /* Light orange hover background */
    }
</style>
