<template>
    <a-page-header
        style="border: 2px solid rgb(235, 237, 240)"
        title="Edit Resume"
        :breadcrumb="{ routes }"
    />

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
                <DataSection>
                    <template #form>
                        <Experiences />
                    </template>
                </DataSection>
                <!-- Educations -->
                <a-typography-title
                    style="font-size: var(--font-size-h4); margin-top: 24px"
                >
                    Educations
                </a-typography-title>
                <DataSection>
                    <template #form>
                        <Educations />
                    </template>
                </DataSection>
                <!-- Skills -->
                <a-typography-title
                    style="font-size: var(--font-size-h4); margin-top: 24px"
                >
                    Skills
                </a-typography-title>
                <DataSection>
                    <template #form>
                        <Skills />
                    </template>
                </DataSection>
                <!-- Languages -->
                <a-typography-title
                    style="font-size: var(--font-size-h4); margin-top: 24px"
                >
                    Languages
                </a-typography-title>
                <DataSection>
                    <template #form>
                        <Languages />
                    </template>
                </DataSection>
                <!-- References -->
                <References />
            </a-form>
        </section>
        <section class="preview-resume-container"></section>
    </section>
</template>

<script lang="ts" setup>
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
</script>

<style>
    .edit-resume-container {
        margin-top: 32px;
        display: flex;
        padding: 16px 24px;
        border: 2px solid rgb(235, 237, 240);
    }
</style>
