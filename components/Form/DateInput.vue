<template>
    <a-form-item class="full-width" :label="label">
        <a-date-picker class="full-width" :placeholder="placeholder" />
    </a-form-item>
</template>

<script lang="ts" setup>
    import { defineProps } from "vue";

    interface DateInputProps {
        name: string;
        label: string;
        placeholder: string;
    }

    const props = defineProps<DateInputProps>();
</script>

<style scoped>
    .full-width {
        width: 100%;
    }
</style>
