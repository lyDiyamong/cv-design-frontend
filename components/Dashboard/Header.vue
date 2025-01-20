<template>
    <div class="header">
        <a-dropdown>
            <template #overlay>
                <a-menu>
                    <a-menu-item key="profile">
                        <NuxtLink to="/profile">Profile</NuxtLink>
                    </a-menu-item>
                    <a-menu-item key="logout">
                        <p style="cursor: pointer;" @click="handleLogout" to="/">Logout</p>
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
    import { useAlertStore } from "~/store/alert";

    const alertStore = useAlertStore();
    const { logoutMutation } = useAuth();
    // Define props with explicit types
    const { profileUrl } = defineProps<{
        profileUrl?: string;
        firstName?: string;
        lastName?: string;
    }>();

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
            alertStore.showAlert({
                message: error.response.data.message,
                type: "error",
                duration: 5000,
            });
        }
    };
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
