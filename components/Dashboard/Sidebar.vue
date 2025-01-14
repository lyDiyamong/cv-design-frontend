<template>
    <a-layout-sider
        breakpoint="lg"
        class="bg-custom-color"
        :collapsed="isCollapsed"
        :width="200"
        :collapsedWidth="80"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
        <div class="logo">CVs</div>
        <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']">
            <a-menu-item
                v-for="(item) in menuItems"
                :key="item.key"
                :defaultSelectedKeys="[item.key]"
            >
                <NuxtLink :to="item.path" />
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
    import { ref } from "vue";

    const isCollapsed = ref(true);

    const handleMouseEnter = () => {
        isCollapsed.value = false;
    };

    const handleMouseLeave = () => {
        isCollapsed.value = true;
    };

    // Menu items array
    const menuItems = [
        {
            key: "1",
            name: "Dashboard",
            icon: AppstoreOutlined,
            path: "/dashboard",
        },
        { key: "2", name: "Resume", icon: FolderOutlined, path: "/resume" },
        { key: "3", name: "Profile", icon: UserOutlined, path: "/profile" },
        { key: "4", name: "Logout", icon: LogoutOutlined, path: "/" },
    ];
</script>

<style scoped>
    .bg-custom-color {
        background-color: #ffffff;
        transition: all 0.3s ease;
    }

    .logo {
        text-align: center;
        color: black;
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
