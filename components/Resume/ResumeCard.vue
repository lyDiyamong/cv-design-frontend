<template>
    <SpinLoading :loading="isPending" />
    <a-card hoverable class="resume-card">
        <template #cover>
            <!-- Image Section -->
            <NuxtImg
                :src="previewImg"
                alt="Professional CV Resume"
                layout="responsive"
                width="1000"
                height="1200"
                class="resume-image"
            />
        </template>
        <!-- Icons for view and delete -->
        <div class="icon-container">
            <div class="icon view-icon" @click="viewResume">
                <EyeFilled />
            </div>
            <div class="icon delete-icon" @click="deleteResume">
                <DeleteOutlined />
            </div>
        </div>
    </a-card>
    <!-- Card Footer -->
    <div class="card-footer">
        <a-typography-text class="resume-title">{{ title }}</a-typography-text>
    </div>
</template>

<script lang="ts" setup>
    import { defineProps } from "vue";
    import { DeleteOutlined, EyeFilled } from "@ant-design/icons-vue";
    import { useAlertStore } from "../../store/alert";

    const props = defineProps<{
        title: string;
        resumeId: string;
        previewImg: string;
    }>();

    const { deleteResumeMutation } = useResume();
    const alertStore = useAlertStore();

    const { isPending } = deleteResumeMutation;
    const viewResume = () => {
        navigateTo(`resumes/${props.resumeId}/edit`);
    };

    const deleteResume = async () => {
        try {
            const data = await deleteResumeMutation.mutateAsync(props.resumeId);
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
    };
</script>

<style scoped>
    /* Card Container */
    .resume-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 12px;
        overflow: hidden;
        text-align: center;
        position: relative;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .resume-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    /* Image Styling */
    .resume-image {
        object-fit: cover;
        width: 100%;
        max-height: 300px;
        border-bottom: 1px solid #f0f0f0;
    }

    /* Card Footer */
    .card-footer {
        margin-top: 8px;
        padding: 0 8px;
    }

    .resume-title {
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 500;
    }

    /* Icon Container */
    .icon-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        gap: 16px;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1;
    }

    .resume-card:hover .icon-container {
        opacity: 1;
    }

    /* Icon Styling */
    .icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        padding: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .icon:hover {
        background-color: rgba(0, 0, 0, 0.8);
        transform: scale(1.1);
    }

    .icon span {
        margin-top: 4px;
        font-size: 14px;
        color: #333;
        transition: color 0.3s ease;
    }

    .view-icon:hover span,
    .view-icon:hover a-icon {
        color: #1890ff; /* Ant Design Blue */
    }

    .delete-icon:hover span,
    .delete-icon:hover a-icon {
        color: #ff4d4f; /* Ant Design Red */
    }

    /* Responsive Scaling */
    @media (max-width: 1200px) {
        .resume-card {
            transform: scale(0.95);
        }
    }

    @media (max-width: 768px) {
        .resume-card {
            transform: scale(0.9);
        }

        .card-footer {
            margin: 0;
            margin-left: 8px;
        }
    }

    @media (max-width: 480px) {
        .resume-card {
            transform: scale(0.85);
        }

        .icon {
            padding: 12px;
        }

        .icon span {
            font-size: 12px;
        }
    }
</style>
