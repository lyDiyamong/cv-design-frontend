<template>
    <a-page-header title="Dashboard" />
    <Greeting last-name="Diyamong" />
</template>

<script lang="ts" setup>
    definePageMeta({
        layout: "dashboard",
    });
</script>

<style>
    .greeting-card {
        border: 1px solid rgb(235, 237, 240);
        background-color: var(--color-primary-light);
    }
</style>
