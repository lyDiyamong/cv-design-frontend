<template>
    <!-- <AlertMessage
        v-if="alertVisible"
        :message="authStore.message"
        :type="alertType"
        :duration="5000"
    /> -->
    <a-layout-sider
        breakpoint="lg"
        class="bg-custom-color sidebar-container"
        :collapsed="isCollapsed"
        :width="200"
        :collapsedWidth="80"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
        <div class="logo">QuickCV</div>
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
    import {
        AppstoreOutlined,
        UserOutlined,
        FolderOutlined,
        LogoutOutlined,
    } from "@ant-design/icons-vue";
    import { useAuthStore } from "../../store/auth/index";
    import { useAlertStore } from "../../store/alert";

    const isCollapsed = ref(true);
    const isLogoutModalVisible = ref(false);

    // Sidebar hover events
    const handleMouseEnter = () => {
        isCollapsed.value = false;
    };

    const handleMouseLeave = () => {
        isCollapsed.value = true;
    };

    const authStore = useAuthStore();
    const alertStore = useAlertStore();
    const { logoutMutation } = useAuth();

    // Menu items array
    const menuItems = [
        {
            key: "1",
            name: "Dashboard",
            icon: AppstoreOutlined,
            path: "/dashboard",
        },
        {
            key: "2",
            name: "Resume",
            icon: FolderOutlined,
            path: "/dashboard/resumes",
        },
        {
            key: "3",
            name: "Profile",
            icon: UserOutlined,
            path: "/dashboard/profile",
        },
        { key: "logout", name: "Logout", icon: LogoutOutlined },
    ];

    const handleLogout = async () => {
        try {
            const data = await logoutMutation.mutateAsync();

            if (data) {
                alertStore.showAlert({
                    message: data.message,
                    type: "success",
                    duration: 5000,
                });
                navigateTo("/");
            }
        } catch (error: any) {
            authStore.setMessage(error.data.message);
            console.error("Error logging in", error);
        }
    };
    const showLogoutModal = () => {
        isLogoutModalVisible.value = true;
    };

    const handleCancel = () => {
        isLogoutModalVisible.value = false;
    };

    // Navigation functions
    const navigateToDashboard = () => {
        navigateTo("/dashboard"); // Change the path as needed
    };

    const navigateToResumes = () => {
        navigateTo("/dashboard/resumes"); // Change the path as needed
    };

    const navigateToProfile = () => {
        navigateTo("/dashboard/profile"); // Change the path as needed
    };
</script>

<style scoped>
    .sidebar-container {
        background-color: #ffffff;
        position: sticky;
        top: 0;
        height: 100vh;
        z-index: 10;
        border-right: 1px solid #ddd;
    }
    .bg-custom-color {
        background-color: #ffffff;
        transition: all 0.3s ease;
        position: sticky;
    }

    .logo {
        text-align: center;
        color: var(--color-primary-main);
        font-size: 1.125rem;
        font-weight: 600;
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    /* Collapsed Sidebar */
    .collapsed {
        width: 80px !important;
    }

    /* Expanded Sidebar */
    .bg-custom-color:not(.collapsed) {
        width: 250px !important;
    }

    /* Active menu item background and text color */
    .ant-menu-item-selected {
        background-color: var(--color-primary-light) !important;
        color: white !important;
    }

    /* Hover effect to match active item style */
    .ant-menu-item:hover {
        background-color: var(--color-primary-semi-light) !important;
    }
</style>
