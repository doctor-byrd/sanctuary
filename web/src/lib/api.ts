import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import type {
// DTOs
CreateUserDto,
LoginUserDto,
UpdateUserDto,
ForgotPasswordDto,
ChangeUserRoleDto,
ResetUserPasswordDto,
// Entity Interfaces
IUser,
// Types & Enums
UserRoles,
} from '@project/shared-types';

// API base configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Create an Axios instance
function createApiClient(): AxiosInstance {
    const apiClient = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
    // Request interceptor to pass auth token
    apiClient.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('accessToken');
            if(token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
    // Response interceptor for error handling
    apiClient.interceptors.response.use(
        (response) => response,
        (error) => {
            if(error.response?.status === 401) {
                //Handle unauthorized
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
            }
            return Promise.reject(error)
        }
    );
    return apiClient;
}

export const api = createApiClient();

async function request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await api.request<T>(config);
    return response.data;
}

// Auth API
export const authApi = {
    /* 
     * POST /auth/signup
     * Register as a new user
    */
   signup: (userData: CreateUserDto): Promise<IUser> =>
    request({url: '/auth/signup', method: 'POST', data: userData }),

    /* 
     * POST /auth/login
     * Authenticate user and receive access token
    */
   login: (userData: LoginUserDto): Promise<{ accessToken: string }> =>
    request({url: '/auth/login', method: 'POST', data: userData }),

    /* 
     * GET /auth/me
     * Get authenticated user profile
    */
   getProfile: (): Promise<IUser> =>
    request({url: '/auth/me', method: 'GET' }),
}