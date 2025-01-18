<template>
    <div v-if="loading" class="loading-container">
        <a-spin :size="size" />
    </div>
</template>

<script lang="ts" setup>
    import { defineProps } from "vue";

    defineProps<{
        loading?: boolean; // Whether the spinner is visible
        size?: "small" | "default" | "large"; 
    }>();
</script>

<style scoped>
    .loading-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.7); 
        z-index: 9999; 
    }
</style>
