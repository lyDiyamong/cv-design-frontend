<template>
    <div>hello</div>
</template>

<script lang="ts" setup>
    definePageMeta({
        layout: "dashboard",
    });

    const route = useRoute();

    // When accessing /posts/1, route.params.id will be 1
    console.log(route.params.id);
</script>

<style></style>
