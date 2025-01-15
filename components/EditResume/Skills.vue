<template>
    <a-typography-title style="font-size: var(--font-size-h4)">
        Skills
    </a-typography-title>

    <div class="flex-between">
        <Input name="name" label="Skill name" placeholder="Enter skill name" />
        <SelectInput
            placeholder="Choose your level"
            label="Level"
            :options="options"
        />
    </div>
</template>

<script lang="ts" setup>
    const options = [
        { label: "Beginner", value: "beginner" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Advanced", value: "advanced" },
    ];
</script>

<style></style>
