<template>
    <div class="flex-between">
        <a-page-header title="Resumes" />
        <a-button type="primary" :icon="h(PlusOutlined)"> New Resume </a-button>
    </div>
    <section class="resumes-page-container">
        <SpinLoading :loading="isLoading" />
        <a-row :gutter="[48, 16]">
            <a-col
                :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="4"
                v-for="resume in resumes?.data"
                :key="resume._id"
            >
                <NuxtLink :to="`resumes/${resume._id}/edit`">
                    <ResumeCard
                        :preview-img="resume.previewImg"
                        :title="resume.title"
                    />
                </NuxtLink>
            </a-col>
        </a-row>

        <div class="pagination-container">
            <a-pagination
                v-model:current="currentPage"
                :total="totalItems"
                :pageSize="pageSize"
                show-quick-jumper
                show-size-changer
                :pageSizeOptions="['8', '16', '24', '32']"
                @change="handlePageChange"
            />
        </div>
    </section>
</template>

<script lang="ts" setup>
    import { ref, computed } from "vue";
    import { PlusOutlined } from "@ant-design/icons-vue";

    const { resumeQueryAll } = useResume();

    const { data: resumes, isLoading } = resumeQueryAll;

    definePageMeta({
        layout: "dashboard",
    });

    const currentPage = ref(1);
    const pageSize = ref(8);
    const totalItems = ref(resumes?.value?.data?.length);

    const currentItems = computed(() => {
        const start = (currentPage.value - 1) * pageSize.value;
        const end = start + pageSize.value;
        return resumes?.value?.data?.slice(start, end);
    });

    const handlePageChange = (page: number) => {
        currentPage.value = page;
    };
</script>

<style scoped>
    .pagination-container {
        margin-top: 24px;
        text-align: center;
    }
    .resumes-page-container {
        padding: 16px 24px;
    }
</style>
