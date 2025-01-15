<template>
    <a-form-item class="full-width" :label="label">
        <a-select
            class="full-width"
            :placeholder="placeholder"
            :options="options"
        />
    </a-form-item>
</template>

<script lang="ts" setup>

    interface SelectOption {
        value: string;
        label: string;
    }

    interface SelectInputProps {
        label: string;
        placeholder: string;
        options: SelectOption[];
    }

    const props = defineProps<SelectInputProps>();
</script>
