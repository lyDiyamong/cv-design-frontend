<template>
    <div class="header">
        <a-dropdown>
            <template #overlay>
                <a-menu>
                    <a-menu-item key="profile">
                        <NuxtLink to="/profile">Profile</NuxtLink>
                    </a-menu-item>
                    <a-menu-item key="logout">
                        <NuxtLink to="/logout">Logout</NuxtLink>
                    </a-menu-item>
                </a-menu>
            </template>
            <div class="flex-between">
                <a-avatar class="avatar">
                    <template #icon>
                        <UserOutlined v-if="!profileUrl" />
                    </template>
                    <NuxtImg :src="profileUrl" alt="Profile" />
                </a-avatar>
                <a-typography-title :level="5"
                    >{{ firstName }} {{ lastName }}</a-typography-title
                >
            </div>
        </a-dropdown>
    </div>
</template>

<script setup lang="ts">
    import { UserOutlined } from "@ant-design/icons-vue";
    // Define props with explicit types
    const { profileUrl } = defineProps<{
        profileUrl?: string;
        firstName?: string;
        lastName?: string;
    }>();
</script>

<style scoped>
    .header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background-color: var(--color-background-default);
    }

    .avatar {
        cursor: pointer;
    }
</style>
