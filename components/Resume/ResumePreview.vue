<template>
    <div class="right-section">
        <div
            class="resume-template"
            :style="{ backgroundImage: 'url(' + selectedTemplate + ')' }"
        >
            <!-- Profile Image -->
            <img
                class="profile-image"
                :style="{
                    backgroundImage: 'url(' + dummyData.profileImage + ')',
                }"
            />

            <!-- Dummy data overlay on resume -->
            <section class="personal-detail">
                <h2 class="name-section">{{ dummyData.name }}</h2>
                <h3 class="title-section">{{ dummyData.jobTitle }}</h3>
            </section>

            <div class="content-container">
                <!-- The left side of Resume -->
                <section class="left-container">
                    <section class="contact-section">
                        <h3 class="section-title">Contact Me</h3>
                        <p>{{ dummyData.phoneNumber }}</p>
                        <p>{{ dummyData.email }}</p>
                        <p>{{ dummyData.address }}</p>
                        <hr />
                    </section>

                    <section class="skills-section">
                        <h3 class="section-title">Skills</h3>
                        <ul>
                            <li
                                v-for="(skill, index) in dummyData.skills"
                                :key="index"
                            >
                                <span class="skill-name">{{ skill.name }}</span>
                                :
                                <span class="skill-level">{{
                                    skill.level
                                }}</span>
                            </li>
                        </ul>
                        <hr />
                    </section>

                    <section class="languages-section">
                        <h3 class="section-title">Language</h3>
                        <ul>
                            <li
                                v-for="(language, index) in dummyData.languages"
                                :key="index"
                            >
                                <span class="language-name">{{
                                    language.name
                                }}</span>
                                :
                                <span class="language-level">{{
                                    language.level
                                }}</span>
                            </li>
                        </ul>
                        <hr />
                    </section>

                    <section class="reference-section">
                        <h3 class="section-title">Reference</h3>

                        <div
                            v-for="(reference, index) in dummyData.references"
                            :key="index"
                        >
                            <p>
                                {{ reference.firstName }}
                                {{ reference.lastName }}
                            </p>
                            <p>{{ reference.company }}</p>
                            <p>{{ reference.position }}</p>
                            <p>{{ reference.email }}</p>
                            <p>{{ reference.phoneNumber }}</p>
                            <br />
                        </div>
                    </section>
                </section>

                <!-- The right side of Resume -->
                <section class="right-container">
                    <section class="summary-section">
                        <h3 class="section-title">About</h3>
                        <p>{{ dummyData.about }}</p>
                        <hr />
                    </section>

                    <section class="experiences-section">
                        <h3 class="section-title">Experience</h3>

                        <div
                            v-for="(experience, index) in dummyData.experiences"
                            :key="index"
                        >
                            <p>{{ experience.jobTitle }}</p>
                            <p>{{ experience.position }}</p>
                            <p>
                                {{ experience.startDate }} -
                                {{ experience.endDate }}
                            </p>
                            <br />
                        </div>
                        <hr />
                    </section>

                    <section class="educations-section">
                        <h3 class="section-title">Education</h3>

                        <div
                            v-for="(education, index) in dummyData.educations"
                            :key="index"
                        >
                            <p>{{ education.schoolName }}</p>
                            <p>{{ education.degreeMajor }}</p>
                            <p>
                                {{ education.startDate }} -
                                {{ education.endDate }}
                            </p>
                            <br />
                        </div>
                    </section>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, reactive } from "vue";

    // Accept `selectedTemplate` as a prop
    defineProps({
        selectedTemplate: {
            type: String,
            required: true,
        },
    });

    // Dummy data for the resume
    const dummyData = reactive({
        name: "John Doe",
        jobTitle: "Software Engineer",

        phoneNumber: "(123) 456-7890",
        email: "samonrotha@gmail.com",
        address: "Toul Sangkea, Russey Keo, Phnom Penh",

        about: "Experienced software engineer with a passion for developing innovative programs. Skilled in various programming languages, including Vue.js, JavaScript, and Node.js.",

        education:
            "Bachelor's in Computer Science, XYZ University, 2018 - 2022",

        experience:
            "Software Developer at ABC Corp (2022 - Present)\nDeveloped web applications using Vue.js and Node.js. Led a team of 3 engineers in project management.",

        skills: [
            { name: "HTML", level: "Expert" },
            { name: "CSS", level: "Advanced" },
            { name: "JavaScript", level: "Expert" },
            { name: "Vue.js", level: "Advanced" },
            { name: "Node.js", level: "Intermediate" },
            { name: "HTML", level: "Expert" },
            { name: "CSS", level: "Advanced" },
            { name: "JavaScript", level: "Expert" },
            { name: "Vue.js", level: "Advanced" },
            { name: "Node.js", level: "Intermediate" },
        ],

        languages: [
            { name: "Khmer", level: "Native" },
            { name: "English", level: "Advanced" },
            { name: "Japanese", level: "Advanced" },
            { name: "Spanish", level: "Advanced" },
        ],

        references: [
            {
                firstName: "Samon",
                lastName: "Rotha",
                position: "Codinator",
                company: "Co Ltd",
                email: "example@gmail.com",
                phoneNumber: "+855 72 983 293",
            },
            {
                firstName: "Samon",
                lastName: "Rotha",
                position: "Codinator",
                company: "Co Ltd",
                email: "example@gmail.com",
                phoneNumber: "+855 72 983 293",
            },
        ],

        experiences: [
            {
                jobTitle: "IT Game - SEAGAME 32nd",
                position: "IT Game Admin",
                startDate: "23-11-2023",
                endDate: "23-12-2023",
            },
            {
                jobTitle: "IT Game - SEAGAME 32nd",
                position: "IT Game Admin",
                startDate: "23-11-2023",
                endDate: "23-12-2023",
            },
            {
                jobTitle: "IT Game - SEAGAME 32nd",
                position: "IT Game Admin",
                startDate: "23-11-2023",
                endDate: "23-12-2023",
            },
            {
                jobTitle: "IT Game - SEAGAME 32nd",
                position: "IT Game Admin",
                startDate: "23-11-2023",
                endDate: "23-12-2023",
            },
        ],

        educations: [
            {
                schoolName: "Russey Keo High School",
                degreeMajor: "Bachelor Degree",
                startDate: "23-11-2023",
                endDate: "23-12-2023",
            },
            {
                schoolName: "Russey Keo High School",
                degreeMajor: "Bachelor Degree",
                startDate: "23-11-2023",
                endDate: "23-12-2023",
            },
            {
                schoolName: "Russey Keo High School",
                degreeMajor: "Bachelor Degree",
                startDate: "23-11-2023",
                endDate: "23-12-2023",
            },
        ],

        profileImage:
            "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    });
</script>

<style scoped>
    .right-section {
        flex: 2;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        border: 1px solid rgb(206, 206, 206);
        position: sticky;
        top: 20px;
        height: 100vh;
        overflow-y: auto;
    }

    .resume-template {
        position: relative;
        width: 1000px;
        height: 1400px;
        background-size: cover;
        background-position: center;
        color: white;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .profile-image {
        position: absolute;
        top: 20px;
        left: 60px;
        width: 130px;
        height: 130px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        border: 3px solid white;
    }

    .overlay-text {
        text-align: left;
        font-family: Arial, sans-serif;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
        margin-bottom: 8px;
    }

    .name-section {
        font-size: 34px;
    }

    .personal-detail {
        margin-left: 220px;
        margin-top: 20px;
    }

    .content-container {
        display: flex;
        gap: 36px;
        padding: 56px 0;
        color: black;
    }

    .left-container {
        width: 460px;
    }

    /* .right-container {
  } */

    .educations-section p,
    .reference-section p,
    .experiences-section p {
        margin: 4px 0;
    }

    .education,
    .experience,
    .skills {
        font-size: 14px;
        margin-top: 20px;
    }
</style>
