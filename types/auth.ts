// types/auth.ts
export interface User {
    _id: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: Date
  }
  
  export interface Tokens {
    accessToken: string;
    refreshToken: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    user: User;
    tokens: Tokens;
  }