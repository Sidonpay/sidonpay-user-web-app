// Register
export interface RegisterPayload {
    fullName: string;
    email: string;
    phone: string;
    password: string;
}

// Login
export interface LoginPayload {
    identifier: string; // email or phone
    password: string;
}

// API response shape (simplified)
export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        accessToken: string;
        userId?: string;
    };
}
