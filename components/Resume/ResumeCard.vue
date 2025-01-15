<template>
    <a-card hoverable class="resume-card">
        <template #cover>
            <!-- Image Section -->
            <NuxtImg
                :src="previewImg"
                alt="Professional CV Resume"
                layout="responsive"
                width="1000"
                height="1200"
                class="resume-image"
            />
        </template>
    </a-card>
    <!-- Card Footer -->
    <div class="card-footer">
        <a-typogragphy-text class="resume-title">{{
            title
        }}</a-typogragphy-text>
    </div>
</template>

<script lang="ts" setup>
    defineProps<{
        title: string;
        previewImg: string;
    }>();
</script>

<style scoped>
    .resume-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 8px;
        overflow: hidden;
        text-align: center;
        transition: transform 0.3s ease;
    }

    .resume-image {
        object-fit: cover;
        width: 100%;
        max-height: 300px;
    }

    .card-footer {
        margin-top: 8px;
        padding: 0 8px;
    }
    .resume-title {
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; /* Truncate text if it's too long */
    }

    /* Responsive Scaling */
    @media (max-width: 1200px) {
        .resume-card {
            transform: scale(0.9); /* Scale down the card on medium screens */
        }
    }

    @media (max-width: 768px) {
        .resume-card {
            transform: scale(0.85); /* Scale more down on smaller screens */
        }
        .card-footer {
            margin: 0;
            margin-left: 16px;
        }
    }

    @media (max-width: 480px) {
        .resume-card {
            transform: scale(
                0.8
            ); /* Further scaling down for very small screens */
        }
    }
</style>
