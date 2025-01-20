import type { loginSchema, signUpSchema } from "~/utils/schema";
import * as z from "zod";

// types/auth.ts
// User data type (with only required fields)
export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    dateOfBirth: string;
    imageUrl: string;
}

export type UpdateUserType = Pick<
    User,
    "firstName" | "lastName" | "gender" | "dateOfBirth"
>;

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export type LoginType = z.infer<typeof loginSchema>;

export type SignupType = z.infer<typeof signUpSchema>;

export interface AuthResponse {
    data: Tokens;
}
