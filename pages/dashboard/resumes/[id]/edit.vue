<template>
    <a-page-header
        style="border: 2px solid rgb(235, 237, 240)"
        title="Edit Resume"
        :breadcrumb="{ routes }"
    />

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

    <section class="edit-resume-container">
        <section class="form-container">
            <a-form layout="vertical">
                <!-- Upload image -->
                <UploadImage />
                <!-- Personal -->
                <PersonalResume />
                <!-- Summary -->
                <Summary />
                <!-- Experiences -->
                <a-typography-title
                    style="font-size: var(--font-size-h4); margin-top: 24px"
                >
                    Experiences
                </a-typography-title>

                <!-- <Experiences
                            v-if="section.type === 'Experiences'"
                            :experiences="section.content || ''"
                        /> -->
                <Experiences />

                <!-- Educations -->
                <a-typography-title
                    style="font-size: var(--font-size-h4); margin-top: 24px"
                >
                    Educations
                </a-typography-title>

                <!-- <Educations
                            v-if="section.type === 'Education'"
                            :education="section.content || ''"
                            :degreeMajor="section.content?.degreeMajor || ''"
                            :schoolName="section.content?.schoolName || ''"
                            :startDate="section.content?.startDate || ''"
                            :endDate="section.content?.endDate || ''"
                        /> -->
                <!-- <Educations /> -->

                <!-- Skills -->
                <a-typography-title
                    style="font-size: var(--font-size-h4); margin-top: 24px"
                >
                    Skills
                </a-typography-title>
                <!-- <Skills
                            v-if="section.type === 'Skills'"
                            :skills="section.content || ''"
                        /> -->
                <!-- <Skills /> -->

                <!-- Languages -->
                <a-typography-title
                    style="font-size: var(--font-size-h4); margin-top: 24px"
                >
                    Languages
                </a-typography-title>

                <!-- <Languages
                            v-if="section.type === 'Languages'"
                            :languages="section.content || ''"
                        /> -->
                <!-- <Languages /> -->

                <!-- References -->
                <!-- <References /> -->
            </a-form>
        </section>

        <section class="preview-resume-container">
            <!-- Right Section -->
            <ResumePreview :selectedTemplate="selectedTemplate" />
        </section>
    </section>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    definePageMeta({
        layout: "dashboard",
    });

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

    // When accessing /posts/1, route.params.id will be 1
    // console.log(route.params.id);

    // Template selection
    const template1 =
        "https://cv-design-assets-images.s3.ap-southeast-2.amazonaws.com/template/ResumeTemplateRT.jpg";
    const template2 =
        "https://cv-design-assets-images.s3.ap-southeast-2.amazonaws.com/template/ResumeTemplateRT2.jpg";

    const selectedTemplate = ref(template1);

    const selectTemplate = (template: any) => {
        selectedTemplate.value = template;
    };
</script>

<style>
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
