<template>
    <a-typography-title style="font-size: var(--font-size-h4)">
        Experiences
    </a-typography-title>
    <a-form layout="vertical">
        <Input
            name="jobTitle"
            label="Job Title"
            placeholder="Enter Job title"
        />
        <a-textarea
            placeholder="Enter your job responsibilities"
            :auto-size="{ minRows: 2, maxRows: 3 }"
        />
        <div class="flex-between">
            <DateInput
                name="startDate"
                label="Start Date"
                placeholder="MM/YYYY"
            />
            <DateInput name="endDate" label="End Date" placeholder="MM/YYYY" />
        </div>
    </a-form>
</template>

<script lang="ts" setup></script>

<style></style>
