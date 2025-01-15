<template>
    <a-typography-title style="font-size: var(--font-size-h4)">
        Personal Summary
    </a-typography-title>
    <a-textarea
        placeholder="Autosize height with minimum and maximum number of lines"
        :auto-size="{ minRows: 3, maxRows: 5 }"
    />
</template>

<script lang="ts" setup></script>

<style></style>
