// Define TypeScript types for the schemas

// Type for Personal Content
export interface UpdatePersonalContent {
    firstName?: string;
    lastName?: string;
    position?: string;
    summary?: string;
}

// Type for Contact Content
export interface UpdateContactContent {
    phone?: string;
    email?: string;
    address?: string;
}

// Type for Skill Content
export interface UpdateSkillContent {
    name?: string;
    level?: "Expert" | "Advance" | "Intermediate" | "Beginner";
}

// Type for Experience Content
export interface UpdateExperienceContent {
    jobTitle?: string;
    responsibilities?: string[];
    startDate?: Date;
    endDate?: Date;
}

// Type for Education Content
export interface UpdateEducationContent {
    school?: string;
    degreeMajor?: string;
    startDate?: Date;
    endDate?: Date;
}

// Type for Language Content
export interface UpdateLanguageContent {
    language?: string;
    level?: "Fluent" | "Advance" | "Intermediate" | "Beginner";
}

// Type for Reference Content
export interface UpdateReferenceContent {
    firstName?: string;
    lastName?: string;
    email?: string;
    company?: string;
    position?: string;
}

// Type mapping for section schemas
export interface UpdateSectionSchemasTypes {
    personal: UpdatePersonalContent;
    contact: UpdateContactContent;
    skills: UpdateSkillContent[];
    experiences: UpdateExperienceContent[];
    educations: UpdateEducationContent[];
    languages: UpdateLanguageContent[];
    references: UpdateReferenceContent[];
}

// Type for section keys
export type SectionKeys = keyof UpdateSectionSchemasTypes;

// Type for Update Section
export interface UpdateSection {
    resumeId: string;
    type: SectionKeys;
    content: UpdateSectionSchemasTypes[SectionKeys];
}

// Type for the array of Update Sections
export type UpdateSectionArray = UpdateSection[];
