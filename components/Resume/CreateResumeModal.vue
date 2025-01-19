<template>
    <div>
        <AlertMessage
            v-if="alertStore.isVisible"
            :message="alertStore.message"
            :type="alertStore.type"
            :duration="5000"
        />
        <!-- Create Button -->
        <a-button type="primary" @click="showModal">Create Resume</a-button>

        <!-- Modal Component -->
        <a-modal
            v-model:visible="isModalVisible"
            title="Create Resume"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <!-- Resume Title Form -->
            <a-form :layout="'vertical'">
                <Input name="title" label="Resume Title" />
            </a-form>

            <!-- Image Template Selection -->
            <div class="template-container">
                <h4>Select a Template</h4>
                <div class="templates">
                    <div
                        v-for="(template, index) in templates"
                        :key="index"
                        class="template-card"
                        :class="{ selected: selectedTemplate === index }"
                        @click="selectTemplate(index)"
                    >
                        <NuxtImg
                            class="template-image"
                            :src="template.previewImg"
                            :alt="template.name"
                        />
                        <p>{{ template.name }}</p>
                    </div>
                </div>
            </div>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { useForm } from "vee-validate";
    import { toFieldValidator } from "@vee-validate/zod";
    import * as z from "zod";
    import { useAlertStore } from "../../store/alert";

    // Modal visibility state
    const isModalVisible = ref(false);

    const alertStore = useAlertStore();

    // Templates data
    const templates = [
        {
            name: "Template 1",
            previewImg:
                "https://cv-design-assets-images.s3.ap-southeast-2.amazonaws.com/template/ResumeYamong.jpg",
        },
        {
            name: "Template 2",
            previewImg:
                "https://cv-design-assets-images.s3.ap-southeast-2.amazonaws.com/template/ResumeYamong2.jpg",
        },
    ];

    // Selected template state
    const selectedTemplate = ref<number | null>(null);

    // Schema for validation
    const resumeSchema = z.object({
        title: z.string().min(1, "Resume title is required"),
        previewImg: z.string().optional(),
    });

    // Initialize vee-validate form
    const { handleSubmit, values: form } = useForm({
        validationSchema: toFieldValidator(resumeSchema),
        initialValues: {
            title: "",
        },
    });

    // Show modal
    const showModal = () => {
        isModalVisible.value = true;
    };

    const { createResumeMutation } = useResume();

    const { isPending } = createResumeMutation;

    // Handle OK button click
    const handleOk = handleSubmit(async (formValues) => {
        if (selectedTemplate.value === null) {
            alertStore.showAlert({
                message: "Please Select the template",
                type: "error",
                duration: 5000,
            });

            return;
        }

        formValues.previewImg = templates[selectedTemplate.value].previewImg;
        if (formValues.previewImg) {
            const data = await createResumeMutation.mutateAsync({
                title: formValues.title,
                previewImg: formValues.previewImg,
            });

            if (data.data._id) {
                navigateTo(`resumes/${data.data._id}/edit`);
            }
        }

        isModalVisible.value = false;
    });

    // Handle Cancel button click
    const handleCancel = () => {
        isModalVisible.value = false;
    };

    // Select a template
    const selectTemplate = (index: number) => {
        selectedTemplate.value = index;
    };
</script>

<style scoped>
    .template-container {
        margin-top: 16px;
    }
    .templates {
        display: flex;
        gap: 16px;
        margin-top: 8px;
    }
    .template-card {
        border: 1px solid #d9d9d9;
        padding: 8px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;
        border-radius: 4px;
    }
    .template-image {
        width: 120px;
        height: auto;
        cursor: pointer;
        border: 2px solid transparent;
        border-radius: 8px;
        overflow: hidden;
        transition: border-color 0.3s ease;
        border: 1px solid var(--border-color);
    }
    .template-card.selected {
        border-color: #1890ff;
        box-shadow: 0 0 8px rgba(24, 144, 255, 0.5);
    }
</style>
