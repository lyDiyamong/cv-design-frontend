<template>
    <a-typography-title style="font-size: var(--font-size-h4)">
        Educations
    </a-typography-title>

    <div class="flex-between">
        <Input name="school" label="School" placeholder="Enter school name" />
        <Input
            name="degree"
            label="Degree Type"
            placeholder="Enter degree type"
        />
    </div>
    <div class="flex-between">
        <Input name="major" label="Major" placeholder="Enter major name" />
        <div class="flex-between">
            <DateInput
                name="startDate"
                label="Start Date"
                placeholder="MM/YYYY"
            />
            <DateInput name="endDate" label="End Date" placeholder="MM/YYYY" />
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style></style>
