<template>
    <a-page-header
        style="border: 2px solid rgb(235, 237, 240)"
        title="Edit Resume"
        :breadcrumb="{ routes }"
    />
    <AlertMessage
        v-if="alertStore.isVisible"
        :message="alertStore.message"
        :type="alertStore.type"
        :duration="5000"
    />
    <!-- <SpinLoading :loading="isLoading" /> -->

    <section class="edit-resume-container">
        <section class="form-container">
            <section>
                <h3>Select Template</h3>
                <div class="template-selection">
                    <div
                        :class="[
                            'template-image',
                            { active: selectedTemplate === template1 },
                        ]"
                        @click="selectTemplate(template1)"
                    >
                        <img :src="template1" alt="Template 1" />
                    </div>
                    <div
                        :class="[
                            'template-image',
                            { active: selectedTemplate === template2 },
                        ]"
                        @click="selectTemplate(template2)"
                    >
                        <img :src="template2" alt="Template 2" />
                    </div>
                </div>
            </section>
            <a-form layout="vertical" class="container-form">
                <div v-for="section in sortedSections" :key="section.type">
                    <!-- Upload image  -->
                    <UploadImage v-if="section.type === 'personal'" />
                    <!-- Personal -->
                    <PersonalResume
                        v-if="section.type === 'personal'"
                        :content="section.content as UpdatePersonalContent"
                    />
                    <Contact
                        v-if="section.type === 'contact'"
                        :content="section.content as UpdateContactContent"
                    />

                    <!-- Experiences -->
                    <Experiences
                        v-if="section.type === 'experiences'"
                        :content="section.content as UpdateExperienceContent[]"
                    />
                    <!-- Educations -->
                    <Educations
                        v-if="section.type === 'educations'"
                        :content="section.content as UpdateEducationContent[]"
                    />
                    <!-- Skills -->

                    <Skills
                        v-if="section.type === 'skills'"
                        :content="section.content as UpdateSkillContent[]"
                    />
                    <!-- Languages -->
                    <Languages
                        v-if="section.type === 'languages'"
                        :content="section.content as UpdateLanguageContent[]"
                    />
                    <!-- References -->
                    <References
                        v-if="section.type === 'references'"
                        :content="section.content as UpdateReferenceContent[]"
                    />
                </div>
            </a-form>
        </section>

        <section class="preview-resume-container">
            <!-- Preview Resume Section -->
            <ResumePreview
                :sections="sections?.data"
                :selectedTemplate="selectedTemplate"
            />
        </section>
    </section>
</template>

<script lang="ts" setup>
    import type {
        UpdateContactContent,
        UpdateExperienceContent,
        UpdatePersonalContent,
        UpdateEducationContent,
        UpdateLanguageContent,
        UpdateReferenceContent,
        UpdateSkillContent,
    } from "~/types/sections";
    import { useAlertStore } from "~/store/alert";

    definePageMeta({
        layout: "dashboard",
    });
    const alertStore = useAlertStore();

    const routes = [
        {
            path: "/dashboard/resumes",
            breadcrumbName: "Resumes",
        },
        {
            path: "/dashboard/resumes/",
            breadcrumbName: "Edit Resume",
        },
    ];

    const route = useRoute();

    const resumeId = route.params.id as string;
    const { sectionResumeQuery } = useSection();

    const { data: sections, isLoading } = sectionResumeQuery(resumeId);

    // Template selection
    const template1 = "/images/templates/Template1.png";
    // "https://cv-design-assets-images.s3.ap-southeast-2.amazonaws.com/template/ResumeYamong.jpg";
    const template2 = "/images/templates/Template2.png";
    // "https://cv-design-assets-images.s3.ap-southeast-2.amazonaws.com/template/ResumeYamong2.jpg";

    const selectedTemplate = ref(template1);

    const selectTemplate = (template: any) => {
        selectedTemplate.value = template;
    };

    // Define the desired order of sections
    const desiredOrder = [
        "personal",
        "contact",
        "experiences",
        "educations",
        "skills",
        "languages",
        "references",
    ];

    // Sort sections.data based on the desired order
    const sortedSections = computed(() => {
        if (!sections.value?.data) return [];
        return [...sections.value?.data].sort(
            (a, b) =>
                desiredOrder.indexOf(a.type) - desiredOrder.indexOf(b.type)
        );
    });
</script>

<style scoped>
    .container-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .edit-resume-container {
        margin-top: 32px;
        display: flex;
        padding: 16px 24px;
        border: 2px solid rgb(235, 237, 240);
        justify-content: space-between;
        gap: 34px;
    }
    .preview-resume-container {
        flex: 2;
    }
    .form-container {
        flex: 1;
    }
    .template-selection {
        display: flex;
        gap: 12px;
        margin-bottom: 20px;
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

    .template-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .template-image.active {
        border: 1px solid #007bff;
    }
</style>
