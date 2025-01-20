<template>
    <div class="header">
        <a-dropdown>
            <template #overlay>
                <a-menu>
                    <a-menu-item key="profile">
                        <NuxtLink to="/profile">Profile</NuxtLink>
                    </a-menu-item>
                    <a-menu-item key="logout">
                        <p style="cursor: pointer" @click="handleLogout" to="/">
                            Logout
                        </p>
                    </a-menu-item>
                </a-menu>
            </template>
            <div class="flex-between">
                <a-avatar
                    class="user-avatar"
                    size="large"
                    :src="profileUrl || defaultImage"
                />
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

    const defaultImage =
        "https://cv-design-assets-images.s3.ap-southeast-2.amazonaws.com/template/default-profile.png";

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
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
    }

    .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
