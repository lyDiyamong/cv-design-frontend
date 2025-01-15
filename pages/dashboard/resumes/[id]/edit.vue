<template>
    <!-- <a-page-header title="Edit Resume" /> -->

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

    const route = useRoute();

    // When accessing /posts/1, route.params.id will be 1
    console.log(route.params.id);
</script>

<style>
    .edit-resume-container {
        display: flex;
    }
</style>
