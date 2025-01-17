<template>
    <AlertMessage
        v-if="alertVisible"
        :message="alertMessage"
        :type="alertType"
        :duration="5000"
        @close="clearAlert"
    />
    <a-layout-sider
        breakpoint="lg"
        class="bg-custom-color"
        :collapsed="isCollapsed"
        :width="200"
        :collapsedWidth="80"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
        <div class="logo">QuickCV</div>
        <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']">
            <a-menu-item
                v-for="item in menuItems"
                :key="item.key"
                :defaultSelectedKeys="[item.key]"
                @click="item.key === 'logout' ? handleLogout() : null"
            >
                <NuxtLink v-if="item.key !== 'logout'" :to="item.path" />
                <template #icon>
                    <component :is="item.icon" />
                </template>
                <span>{{ item.name }}</span>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>

<script setup lang="ts">
    import {
        AppstoreOutlined,
        UserOutlined,
        FolderOutlined,
        LogoutOutlined,
    } from "@ant-design/icons-vue";

    const isCollapsed = ref(true);

    const alertMessage = ref<string | null>(null);
    const alertType = ref<"success" | "error" | "info" | "warning">("info");
    const alertVisible = ref(false);

    // Sidebar hover events
    const handleMouseEnter = () => {
        isCollapsed.value = false;
    };

    const handleMouseLeave = () => {
        isCollapsed.value = true;
    };

    // Clear the alert
    const clearAlert = () => {
        alertVisible.value = false;
    };

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
    const { logoutMutation } = useAuth();

    const router = useRouter();

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: (data) => {
                // Handle successful response
                console.log("Logout successful:", data.message);
                // Show success message to the user
                alertMessage.value = data.message || "Logout successful!";
                alertType.value = "success";
                alertVisible.value = true;

                // Redirect to the login or home page
                navigateTo("/");
            },
            onError: (error) => {
                // Handle error response
                console.error(
                    "Logout failed:",
                    error.response?.data?.message || error.message
                );
                // Show error message to the user
                alertMessage.value =
                    error.response?.data?.message || "Logout failed!";
                alertType.value = "error";
                alertVisible.value = true;
            },
        });
    };
</script>

<style scoped>
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
