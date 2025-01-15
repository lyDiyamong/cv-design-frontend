<template>
    <a-typography-title style="font-size: var(--font-size-h4)">
        Languages
    </a-typography-title>
    <a-form layout="vertical">
        <div class="flex-between">
            <Input
                name="language"
                label="Language"
                placeholder="Choose your language"
            />
            <SelectInput placeholder="Choose your level" label="Level" :options="options" />
        </div>
    </a-form>
</template>

<script lang="ts" setup>
    const options = [
        { label: "Khmer", value: "beginner" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Advanced", value: "advanced" },
    ];
</script>

<style></style>
