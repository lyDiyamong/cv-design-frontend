<template>
    <DashboardPageHeader
        title="Profile"
        subTitle="Create your Profile to find a job"
        :breadcrumbRoutes="routes"
    />
    <div class="profile-container">
        <a-row justify="center" class="profile-content-wrapper">
            <!-- Profile Card -->
            <div class="profile-card">
                <div class="profile-avatar-wrapper">
                    <a-avatar
                        class="profile-avatar"
                        :size="100"
                        :src="profileImage || defaultImage"
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
                <div>
                    <h3>Mong</h3>
                    <p class="sub-title">samonrotha@gmail.com</p>
                    <div class="action-buttons">
                        <a-button danger class="delete-button"
                            >Delete Profile</a-button
                        >
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
                    <section class="flex-form-group">
                        <!-- First Name -->
                        <Input
                            name="firstName"
                            placeholder="First Name"
                            label="First Name"
                        />
                        <!-- Last Name -->
                        <Input
                            name="lastName"
                            placeholder="Last Name"
                            label="Last Name"
                        />
                    </section>

                    <div class="flex-form-group">
                        <!-- Gender -->
                        <a-form-item
                            class="w-full"
                            label="Gender"
                            :validate-status="errors.gender ? 'error' : ''"
                            :help="errors.gender"
                        >
                            <a-select
                                v-model:value="gender"
                                placeholder="Select Gender"
                            >
                                <a-select-option value="male"
                                    >Male</a-select-option
                                >
                                <a-select-option value="female"
                                    >Female</a-select-option
                                >
                                <a-select-option value="other"
                                    >Other</a-select-option
                                >
                            </a-select>
                        </a-form-item>

                        <!-- Date of Birth -->
                        <DateInput
                            name="dateOfBirth"
                            label="Date of Birth"
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
    import { useForm, useField } from "vee-validate";
    import { toFieldValidator } from "@vee-validate/zod";
    import * as z from "zod";
    import { CameraFilled } from "@ant-design/icons-vue";

    // Breadcrumb routes
    const routes = [{ path: "index", breadcrumbName: "Profile" }];

    // Profile image and gender
    // const profileImage = ref(null);
    const defaultImage =
        "https://m.media-amazon.com/images/M/MV5BNWI4ZTJiZmUtZGI5MC00NTk4LTk2OTYtNDU3NTJiM2QxNzM0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg";

    // Profile image state
    const profileImage = ref<string | null>(null);

    // Define schema with Zod
    const schema = z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        gender: z.enum(["male", "female", "other"], {
            message: "Gender is required",
        }),
        dateOfBirth: z.string().min(1, "Date of Birth is required"),
    });

    // Initialize the form
    const { handleSubmit, errors } = useForm({
        validationSchema: toFieldValidator(schema),
    });

    const { value: gender } = useField("gender");

    const { userQuery } = useUser();

    const router = useRouter();

    // Redirect logic
    watchEffect(() => {
        if (userQuery.isLoading.value) return; // Wait for the query to finish loading

        if (userQuery.error.value || !userQuery.data.value) {
            console.error("User not authenticated or an error occurred.");
            router.push("/login");
        }
    });

    // File upload handling
    const handleFileChange = (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                profileImage.value = reader.result as string; // Ensure profileImage can accept a string
            };
            reader.readAsDataURL(file);
        }
    };

    // Trigger file upload
    const triggerFileUpload = () => {
        const fileInput = document.querySelector(
            "input[type='file']"
        ) as HTMLInputElement | null;
        if (fileInput) {
            fileInput.click(); // Safely call the click method
        }
    };

    // Handle form submission
    const onSubmit = handleSubmit((formValues) => {
        console.log("Form submitted successfully:", formValues);
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
