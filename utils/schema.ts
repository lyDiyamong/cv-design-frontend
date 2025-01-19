import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email").nonempty("Email is required"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password cannot exceed 20 characters"),
});

export const signUpSchema = z
    .object({
        firstName: z
            .string()
            .nonempty("First name is required")
            .refine((val) => !/\s/.test(val), {
                message: "First name cannot contain spaces",
            }),
        lastName: z
            .string()
            .nonempty("Last name is required")
            .refine((val) => !/\s/.test(val), {
                message: "Last name cannot contain spaces",
            }),
        email: z.string().email("Invalid email").nonempty("Email is required"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(20, "Password cannot exceed 20 characters")
            .refine((val) => !/\s/.test(val), {
                message: "Password cannot contain spaces",
            }),
        gender: z.enum(["Male", "Female"]),
        confirmPassword: z.string(),
        dateOfBirth: z.coerce.date({
            required_error: "Please select a date and time",
            invalid_type_error: "That's not a valid date!",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const createResumeSchema = z.object({
    templateId: z.string().nonempty(),
    title: z.string().nonempty(),
});

export const updateReferenceSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    position: z.string().optional(),
    email: z.string().email("Invalid email format"),
    company: z.string().optional(),
});

export const updateExperienceSchema = z.object({
    jobTitle: z.string().max(100, "Max character is 100").optional(),
    company: z.string().max(100, "Max character is 100").optional(),
    responsibility: z.string().max(250, "Max character is 250").optional(),
    startDate: z.string().min(1, "Start Date is required"),
    endDate: z.string().min(1, "End Date is required"),
});
