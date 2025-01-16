import type { loginSchema } from "~/utils/schema";
import * as z from "zod";

// types/auth.ts
export interface User {
    _id: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: Date;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export type LoginType = z.infer<typeof loginSchema>;

export interface AuthResponse {
    user: User;
    tokens: Tokens;
}
