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
        firstName: z.string().nonempty("First name is required"),
        lastName: z.string().nonempty("Last name is required"),
        email: z.string().email("Invalid email").nonempty("Email is required"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(20, "Password cannot exceed 20 characters"),
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
