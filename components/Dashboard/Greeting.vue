<template>
    <a-card class="greeting-card">
        <div class="greeting-content">
            <div class="greeting-text">
                <a-typography-title level="5" style="color: white">
                    Welcome back, {{ lastName }}
                </a-typography-title>
                <a-typography-text style="color: white">
                    Craft your story, shape your future, and let your CV speak
                    volumes about you!
                </a-typography-text>
            </div>
        </div>
    </a-card>
</template>

<script lang="ts" setup>
    const { lastName = "Guest" } = defineProps<{ lastName: string }>();
</script>

<style scoped>
    .greeting-card {
        border-radius: 16px; /* Smooth rounded corners */
        overflow: hidden; /* Prevent content from spilling out */
        background: linear-gradient(90deg, #ffbd73 0%, #ffec9e 100%);
        padding: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .greeting-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .greeting-text {
        max-width: 80%;
    }

    .greeting-text h1 {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .greeting-text p {
        font-size: 1rem;
        margin: 0;
    }

    .greeting-text .username {
        color: white;
    }
</style>
