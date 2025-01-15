<template>
    <a-typography-title style="font-size: var(--font-size-h4)">
        References
    </a-typography-title>

    <div class="flex-between">
        <Input
            name="company"
            label="Company"
            placeholder="Enter company name"
        />
        <Input name="position" label="Position" placeholder="Enter position" />
    </div>
    <div class="flex-between">
        <Input
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
        />
        <Input
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
        />
    </div>
    <Input name="email" label="Email" placeholder="Enter your email" />
</template>

<script lang="ts" setup></script>

<style></style>
