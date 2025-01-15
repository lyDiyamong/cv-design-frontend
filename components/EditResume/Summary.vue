<template>
    <a-typography-title style="font-size: var(--font-size-h4)">
        Personal Summary
    </a-typography-title>
    <a-form-item class="full-width" label="Summary">
        <a-textarea
            placeholder="Autosize height with minimum and maximum number of lines"
            :auto-size="{ minRows: 3, maxRows: 5 }"
        />
    </a-form-item>
</template>

<script lang="ts" setup></script>

<style></style>
