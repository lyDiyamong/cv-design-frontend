<template>
    <a-page-header title="Profile" />
    <AlertMessage
        v-if="alertStore.isVisible"
        :message="alertStore.message"
        :type="alertStore.type"
        :duration="5000"
    />
    <SpinLoading
        :loading="
            isLoading || isRefetching || imageUploadLoading || updateUserLoading
        "
    />
    <div class="profile-container">
        <a-row justify="center" class="profile-content-wrapper">
            <!-- Profile Card -->
            <div class="profile-card">
                <a-spin :spinning="imageUploadLoading">
                    <div class="profile-avatar-wrapper">
                        <a-avatar
                            class="profile-avatar primary-border-color"
                            :size="100"
                            :src="
                                profileImage ||
                                userData?.imageUrl ||
                                defaultImage
                            "
                        />
                        <div class="upload-icon" @click="triggerFileUpload">
                            <CameraFilled />
                        </div>
                        <input
                            type="file"
                            ref="fileInput"
                            accept="image/*"
                            style="display: none"
                            @change="handleFileChange"
                        />
                    </div>
                </a-spin>
                <div>
                    <h3>{{ userData?.firstName }} {{ userData?.lastName }}</h3>
                    <p class="sub-title">{{ userData?.email }}</p>
                    <div class="action-buttons">
                        <a-button type="primary" danger class="delete-button">
                            Delete Profile
                        </a-button>
                    </div>
                </div>
            </div>

            <!-- Profile Details -->
            <a-col class="profile-details">
                <h3>Profile Details</h3>
                <a-form
                    layout="vertical"
                    class="details-form"
                    @submit.prevent="onSubmit"
                >
                    <section class="flex-between">
                        <!-- First Name -->
                        <Input
                            name="firstName"
                            :initial-value="userData?.firstName"
                            placeholder="First Name"
                            label="First Name"
                        />
                        <!-- Last Name -->
                        <Input
                            name="lastName"
                            :initial-value="userData?.lastName"
                            placeholder="Last Name"
                            label="Last Name"
                        />
                    </section>

                    <div class="flex-form-group">
                        <!-- Gender -->
                        <SelectInput
                            name="gender"
                            :options="genderOptions"
                            label="Gender"
                            placeholder="Choose your gender"
                            :initial-value="userData?.gender"
                        />

                        <!-- Date of Birth -->
                        <DateInput
                            name="dateOfBirth"
                            label="Date of Birth"
                            :initial-value="userData?.dateOfBirth"
                            placeholder="Select your date of birth"
                        />
                    </div>

                    <!-- Email -->
                    <a-form-item label="Email">
                        <a-input
                            name="email"
                            placeholder="johndoe@example.com"
                            disabled
                        />
                    </a-form-item>

                    <Input
                        name="email"
                        :initial-value="userData?.email"
                        label="Email"
                        disabled
                    />

                    <!-- Submit Button -->
                    <a-button
                        type="primary"
                        class="update-button"
                        htmlType="submit"
                    >
                        Update Profile
                    </a-button>
                </a-form>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { useForm } from "vee-validate";
    import { toFieldValidator } from "@vee-validate/zod";
    import * as z from "zod";
    import { CameraFilled } from "@ant-design/icons-vue";

    import { useAlertStore } from "../../store/alert";

    const { userQuery, updateUserMutation, updateProfileUser } = useUser();
    const alertStore = useAlertStore();

    const { isPending: imageUploadLoading } = updateProfileUser;
    const { isPending: updateUserLoading } = updateUserMutation;

    const { data: userData, isLoading, isRefetching } = userQuery;

    const genderOptions = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
    ];

    const defaultImage =
        "https://m.media-amazon.com/images/M/MV5BNWI4ZTJiZmUtZGI5MC00NTk4LTk2OTYtNDU3NTJiM2QxNzM0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg";

    const profileImage = ref<string | null>(null);

    // File upload handling
    const handleFileChange = async (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                profileImage.value = reader.result as string;
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append("file", file);

            try {
                const data = await updateProfileUser.mutateAsync(formData);
                if (data.message) {
                    alertStore.showAlert({
                        message: data.message,
                        type: "success",
                        duration: 5000,
                    });
                }
            } catch (error: any) {
                alertStore.showAlert({
                    message: error.response.data.message,
                    type: "error",
                    duration: 5000,
                });
            }
        }
    };

    const triggerFileUpload = () => {
        const fileInput = document.querySelector(
            "input[type='file']"
        ) as HTMLInputElement | null;
        if (fileInput) {
            fileInput.click();
        }
    };

    const schema = z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        gender: z.enum(["Male", "Female"], { message: "Gender is required" }),
        dateOfBirth: z.string().min(1, "Date of Birth is required"),
    });

    const { handleSubmit } = useForm({
        validationSchema: toFieldValidator(schema),
    });

    const onSubmit = handleSubmit(async (formValues) => {
        try {
            const data = await updateUserMutation.mutateAsync(formValues);

            if (data.message) {
                alertStore.showAlert({
                    message: data.message,
                    type: "success",
                    duration: 5000,
                });
            }
        } catch (error: any) {
            alertStore.showAlert({
                message: error.response.data.message,
                type: "error",
                duration: 5000,
            });
        }
    });

    definePageMeta({
        layout: "dashboard",
    });
</script>

<style scoped>
    .profile-container {
        width: 100%;
        padding: 20px 0px;
    }

    .profile-content-wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 30px;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
    }

    .profile-card {
        display: flex;
        gap: 24px;
        align-items: center;
        background: white;
        padding: 20px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        width: 100%;
    }

    .profile-avatar-wrapper {
        position: relative;
        display: inline-block;
    }

    .upload-icon {
        position: absolute;
        bottom: 10px;
        right: 0px;
        background: rgba(0, 0, 0, 0.6);
        color: white;
        border-radius: 50%;
        padding: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .action-buttons {
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .profile-details {
        background: white;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 20px;
        width: 100%;
    }

    .update-button {
        margin-top: 20px;
        width: 100%;
    }
</style>
