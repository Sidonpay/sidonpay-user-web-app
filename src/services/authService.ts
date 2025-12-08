import api from "./api";

export interface SignupPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  data: {
    message: string;
    userId: string;
  };
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    user: any;
  };
}

export const authService = {
  register: async (data: SignupPayload): Promise<SignupResponse> => {
    const response = await api.post<SignupResponse>("/auth/register", data);
    return response.data;
  },

  verifyOtp: async (data: { userId: string; code: string }): Promise<any> => {
    const response = await api.post("/auth/verify-otp", data);
    if (response.data.success) {
      const { accessToken, refreshToken, user } = response.data.data;
      localStorage.setItem("userAccessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
    }
    return response.data;
  },

  forgotPassword: async (identifier: string): Promise<any> => {
    const response = await api.post("/auth/forgot-password", { identifier });
    return response.data;
  },

  resetPassword: async (data: {
    token: string;
    newPassword: string;
  }): Promise<any> => {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  },

  login: async (data: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", data);
    if (response.data.success) {
      const { accessToken, refreshToken, user } = response.data.data;
      localStorage.setItem("userAccessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
    }
    return response.data;
  },
};
