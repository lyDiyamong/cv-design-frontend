<template>
    <a-typography-title
        style="font-size: var(--font-size-h4); margin-top: 24px"
    >
        Experiences
    </a-typography-title>
    <Input name="jobTitle" label="Job Title" placeholder="Enter Job title" />
    <a-form-item class="full-width" label="Responsibilities">
        <a-textarea
            placeholder="Enter your job responsibilities"
            :auto-size="{ minRows: 2, maxRows: 3 }"
        />
    </a-form-item>
    <div class="flex-between">
        <DateInput name="startDate" label="Start Date" placeholder="MM/YYYY" />
        <DateInput name="endDate" label="End Date" placeholder="MM/YYYY" />
    </div>
</template>

<script lang="ts" setup></script>

<style></style>
