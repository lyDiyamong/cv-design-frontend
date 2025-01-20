<template>
    <div class="right-section">
        <a-button @click="saveAsPdf" type="primary">Export as PDF</a-button>
        <section
            ref="resumeExport"
            class="resume-template"
            :style="{ backgroundImage: 'url(' + selectedTemplate + ')' }"
        >
            <!-- Profile Image -->
            <a-avatar class="profile-image">
                <template #icon>
                    <UserOutlined
                        :style="{ fontSize: '80px', color: '#ccc' }"
                        v-if="!personalSection.imgUrl"
                    />
                </template>
                <NuxtImg :src="personalSection.imgUrl" alt="Profile" />
            </a-avatar>

            <!-- Dummy data overlay on resume -->

            <section class="personal-detail">
                <h2 class="name-section">
                    {{
                        `${personalSection.firstName} ${personalSection.lastName}`
                    }}
                </h2>
                <h3 class="title-section">
                    {{ personalSection.position }}
                </h3>
            </section>

            <!-- <section class="personal-detail">
                <h2 class="name-section">{{ dummyData.name }}</h2>
                <h3 class="title-section">{{ dummyData.jobTitle }}</h3>
            </section> -->

            <div class="content-container">
                <!-- The left side of Resume -->
                <section class="left-container">
                    <section class="contact-section">
                        <h3 class="section-title">Contact Me</h3>
                        <div class="icon-text" v-if="contactSection.phone">
                            <PhoneOutlined />
                            <p>{{ contactSection.phone }}</p>
                        </div>
                        <div class="icon-text" v-if="contactSection.email">
                            <GoogleOutlined />
                            <p>{{ contactSection.email }}</p>
                        </div>
                        <div class="icon-text" v-if="contactSection.address">
                            <HomeOutlined />
                            <p>{{ contactSection.address }}</p>
                        </div>
                        <hr />
                    </section>

                    <section class="skills-section">
                        <h3 class="section-title">Skills</h3>
                        <ul>
                            <li
                                v-if="skillsSection"
                                v-for="(skill, index) in skillsSection"
                                :key="index"
                            >
                                <span class="skill-name">{{
                                    skill.skill
                                }}</span>
                                <span v-if="skill.skill && skill.level">:</span>
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
                                v-for="(language, index) in languagesSection"
                                :key="index"
                            >
                                <span class="language-name">{{
                                    language.language
                                }}</span>
                                <span v-if="language.language && language.level"
                                    >:</span
                                >
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
                            v-for="(reference, index) in referencesSection"
                            :key="index"
                        >
                            <h5 class="section-subtitle">
                                {{ reference.firstName }}
                                {{ reference.lastName }}
                            </h5>
                            <div class="icon-text" v-if="reference.email">
                                <GoogleOutlined />
                                <p>{{ reference.email }}</p>
                            </div>
                            <div
                                class="icon-text"
                                v-if="reference.position && reference.company"
                            >
                                <CarryOutOutlined />
                                <p>
                                    {{ reference.position }} At
                                    {{ reference.company }}
                                </p>
                            </div>

                            <br />
                        </div>
                    </section>
                </section>

                <!-- The right side of Resume -->
                <section class="right-container">
                    <section class="summary-section">
                        <h3 class="section-title">About</h3>
                        <p>{{ personalSection.summary }}</p>
                        <hr />
                    </section>

                    <section class="experiences-section">
                        <h3 class="section-title">Experience</h3>

                        <div
                            v-for="(experience, index) in experiencesSection"
                            :key="index"
                        >
                            <div class="section-subtitle">
                                <ForwardOutlined />
                                <h4>
                                    {{ experience.jobTitle }}
                                    <span
                                        v-if="
                                            experience.jobTitle &&
                                            experience.company
                                        "
                                        >at</span
                                    >
                                    {{ experience.company }}
                                    <span
                                        v-if="
                                            experience.startDate &&
                                            experience.endDate
                                        "
                                        >{{ experience.startDate }} -
                                        {{ experience.endDate }}</span
                                    >
                                </h4>
                            </div>

                            <p
                                v-if="experience.responsibility"
                                class="education"
                            >
                                - {{ experience.responsibility }}
                            </p>
                            <br />
                        </div>
                        <hr />
                    </section>

                    <section class="educations-section">
                        <h3 class="section-title">Education</h3>

                        <div
                            v-for="(education, index) in educationsSection"
                            :key="index"
                        >
                            <div class="section-subtitle">
                                <ForwardOutlined
                                    :style="{ fontSize: '20px', color: '#000' }"
                                />
                                <h4>
                                    {{ education.degreeMajor }}
                                    <span
                                        v-if="
                                            education.school &&
                                            education.degreeMajor
                                        "
                                        >at</span
                                    >
                                    {{ education.school }}
                                    <span
                                        v-if="
                                            education.startDate &&
                                            education.endDate
                                        "
                                        >( {{ education.startDate }} -
                                        {{ education.endDate }} )</span
                                    >
                                </h4>
                            </div>
                            <br />
                        </div>
                    </section>
                </section>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
    import html2canvas from "html2canvas";
    import jsPDF from "jspdf";
    import type { SectionType } from "../../types/sections";
    import {
        UserOutlined,
        GoogleOutlined,
        PhoneOutlined,
        HomeOutlined,
        CarryOutOutlined,
        ForwardOutlined,
    } from "@ant-design/icons-vue";

    import type {
        UpdatePersonalContent,
        UpdateContactContent,
        UpdateSectionType,
        SectionKeys,
        UpdateSectionSchemasTypes,
    } from "~/types/sections";

    // Reference to the content you want to capture
    const resumeExport = ref<HTMLDivElement | null>(null);

    // Type guard for narrowing
    function isSectionType<T extends SectionKeys>(
        section: SectionType,
        type: T
    ): section is UpdateSectionType & {
        type: T;
        content: UpdateSectionSchemasTypes[T];
    } {
        return section.type === type;
    }

    // Accept `selectedTemplate` as a prop
    const { sections } = defineProps<{
        selectedTemplate: string;
        sections: SectionType[] | undefined;
    }>();
    // Find the section type dynamic
    // Generic function to get content of any section
    const getSectionContent = <T extends SectionKeys>(type: T) => {
        return computed(() => {
            // Return an empty array if sections are undefined
            if (!sections) return [];

            // Find the section of the given type and apply type guard
            const section = sections.find((section) =>
                isSectionType(section, type)
            );
            // Return content if found, otherwise an empty array
            return section ? section.content : [];
        });
    };

    const personalSection = getSectionContent(
        "personal"
    ) as UpdatePersonalContent;
    const contactSection = getSectionContent("contact") as UpdateContactContent;
    const skillsSection = getSectionContent("skills");
    const languagesSection = getSectionContent("languages");
    const experiencesSection = getSectionContent("experiences");
    const educationsSection = getSectionContent("educations");
    const referencesSection = getSectionContent("references");

    defineExpose({ resumeExport });
    const saveAsPdf = async () => {
        if (!resumeExport.value) return;

        // Capture the DOM element as a canvas
        const canvas = await html2canvas(resumeExport.value, {
            useCORS: true, // Allow cross-origin images
            backgroundColor: "#fff", // Ensure a white background
            scale: 2, // High-quality scaling
        });

        const imgData = canvas.toDataURL("image/png");

        // Create PDF instance
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4", // A4 paper size
        });

        // A4 dimensions in pixels at 72 DPI
        const pageWidth = 210; // mm
        const pageHeight = 297; // mm

        // Calculate image height to maintain aspect ratio
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add the image to the PDF
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        // Save the PDF
        pdf.save("cv.pdf");
    };
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
    .icon-text {
        display: flex;
        align-items: center;
        font-size: var(--font-size-body1);
        gap: 8px;
    }

    .profile-image {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
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
        font-size: 32px;
    }

    .personal-detail {
        position: absolute;
        top: 20px;
        left: 110px;
        margin-left: 220px;
        margin-top: 20px;
    }

    .content-container {
        margin-top: 130px;
        display: flex;
        gap: 36px;
        padding: 56px 0;
        color: black;
    }

    .left-container {
        width: 30%;
    }

    .right-container {
        width: 70%;
    }

    .educations-section p,
    .reference-section p,
    .experiences-section p {
        margin: 4px 0;
    }

    .education,
    .experience,
    .skills {
        font-size: var(--font-size-body1);
        margin-top: 20px;
    }
    .section-title {
        font-size: var(--font-size-h3);
    }
    .section-subtitle {
        display: flex;
        gap: 16px;
        align-items: center;
        font-size: var(--font-size-h4);
        font-weight: var(--font-weight-bold);
    }
</style>
