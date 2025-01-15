<template>
    <a-page-header
        style="border: 2px solid rgb(235, 237, 240)"
        title="Edit Resume"
        :breadcrumb="{ routes }"
    />

    <section class="edit-resume-container">
        <section class="form-container">
            <!-- Upload image -->
            <UploadImage />
            <!-- Personal -->
            <PersonalResume />
            <!-- Summary -->
            <Summary />
            <!-- Experiences -->
            <Experiences />
            <!-- Educations -->
            <Educations />
            <!-- Skills -->
            <Skills />
            <!-- Languages -->
            <Languages />
            <!-- References -->
            <References />
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
