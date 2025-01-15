<template>
    <a-page-header title="Resumes" />
    <a-row :gutter="[48, 16]">
        <a-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
            v-for="resume in currentItems"
            :key="resume.id"
        >
            <ResumeCard :preview-img="resume.imgUrl" :title="resume.title" />
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
</template>

<script lang="ts" setup>
    import { ref, computed } from "vue";

    definePageMeta({
        layout: "dashboard",
    });

    // Mock data
    const mockResumes = ref([
        {
            id: 1,
            title: "Software Engineer Resume",
            imgUrl: "https://marketplace.canva.com/EAFszEvkM50/1/0/1131w/canva-simple-professional-cv-resume-J74DKa9D3nk.jpg",
        },
        {
            id: 2,
            title: "Web Developer CV",
            imgUrl: "https://marketplace.canva.com/EAFszEvkM50/1/0/1131w/canva-simple-professional-cv-resume-J74DKa9D3nk.jpg",
        },
        {
            id: 3,
            title: "Frontend Developer",
            imgUrl: "https://marketplace.canva.com/EAFszEvkM50/1/0/1131w/canva-simple-professional-cv-resume-J74DKa9D3nk.jpg",
        },
        {
            id: 4,
            title: "UX Designer Resume",
            imgUrl: "https://marketplace.canva.com/EAFszEvkM50/1/0/1131w/canva-simple-professional-cv-resume-J74DKa9D3nk.jpg",
        },
        {
            id: 5,
            title: "Product Manager CV",
            imgUrl: "https://marketplace.canva.com/EAFszEvkM50/1/0/1131w/canva-simple-professional-cv-resume-J74DKa9D3nk.jpg",
        },
        {
            id: 6,
            title: "Data Scientist",
            imgUrl: "https://marketplace.canva.com/EAFszEvkM50/1/0/1131w/canva-simple-professional-cv-resume-J74DKa9D3nk.jpg",
        },
        {
            id: 7,
            title: "DevOps Engineer",
            imgUrl: "https://marketplace.canva.com/EAFszEvkM50/1/0/1131w/canva-simple-professional-cv-resume-J74DKa9D3nk.jpg",
        },
        {
            id: 8,
            title: "Backend Developer",
            imgUrl: "https://marketplace.canva.com/EAFszEvkM50/1/0/1131w/canva-simple-professional-cv-resume-J74DKa9D3nk.jpg",
        },
        {
            id: 9,
            title: "Full Stack Developer",
            imgUrl: "https://marketplace.canva.com/EAFszEvkM50/1/0/1131w/canva-simple-professional-cv-resume-J74DKa9D3nk.jpg",
        },
        {
            id: 10,
            title: "Mobile Developer",
            imgUrl: "https://marketplace.canva.com/EAFszEvkM50/1/0/1131w/canva-simple-professional-cv-resume-J74DKa9D3nk.jpg",
        },
    ]);

    const currentPage = ref(1);
    const pageSize = ref(8);
    const totalItems = ref(mockResumes.value.length);

    const currentItems = computed(() => {
        const start = (currentPage.value - 1) * pageSize.value;
        const end = start + pageSize.value;
        return mockResumes.value.slice(start, end);
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
</style>
