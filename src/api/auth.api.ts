import api from "./axios";
import type {
    RegisterPayload,
    LoginPayload,
    AuthResponse,
} from "../types/auth";

// REGISTER
export const registerUser = async (
    payload: RegisterPayload
): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/auth/register", payload);
    return res.data;
};

// LOGIN
export const loginUser = async (
    payload: LoginPayload
): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/auth/login", payload);
    return res.data;
};
