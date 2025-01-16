<template>
    <div class="flex-between">
        <Input
            name="language"
            label="Language"
            placeholder="Choose your language"
        />
        <SelectInput
            placeholder="Choose your level"
            label="Level"
            :options="options"
        />
    </div>
</template>

<script lang="ts" setup>
    const options = [
        { label: "Khmer", value: "beginner" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Advanced", value: "advanced" },
    ];
</script>

<style></style>
