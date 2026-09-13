import axiosInstance from '../axios/axios.ts';
import type { User } from './types/user.ts';

interface LoginRequest {
    username: string;
    password: string;
}

interface RegisterRequest {
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: User;
}

interface LoginResponse {
    token: string;
    username: string;
    name: string;
    surname: string;
    email: string;
    role: string;
}

interface RegisterResponse {
    token: string;
    username: string;
    name: string;
    surname: string;
    email: string;
    role: string;
}

const userApi = {
    findAll: async () => {
        return await axiosInstance.get('/users');
    },

    findById: async (id: number) => {
        return await axiosInstance.get<User>(`/users/${id}`);
    },

    login: async (credentials: LoginRequest) => {
        const response = await axiosInstance.post<LoginResponse>('/user/login', credentials);
        // Create axios config with token for next request
        const configWithToken = {
            headers: {
                Authorization: `Bearer ${response.data.token}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            const userResponse = await axiosInstance.get<User>('/user/me', configWithToken);
            return {
                ...response,
                data: {
                    token: response.data.token,
                    user: userResponse.data
                } as AuthResponse
            };
        } catch (error) {
            // If fetching user details fails return the login
            console.warn('Failed to fetch user details after login, using login response data', error);
            const userData: User = {
                id: 0,
                name: response.data.name,
                surname: response.data.surname,
                email: response.data.email,
                username: response.data.username,
                role: response.data.role
            };
            return {
                ...response,
                data: {
                    token: response.data.token,
                    user: userData
                } as AuthResponse
            };
        }
    },

    register: async (credentials: RegisterRequest) => {
        const response = await axiosInstance.post<RegisterResponse>('/user/register', credentials);
        // Create config with token for next request
        const configWithToken = {
            headers: {
                Authorization: `Bearer ${response.data.token}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            const userResponse = await axiosInstance.get<User>('/user/me', configWithToken);
            return {
                ...response,
                data: {
                    token: response.data.token,
                    user: userResponse.data
                } as AuthResponse
            };
        } catch (error) {
            // If fetching user details fails return register
            console.warn('Failed to fetch user details after registration, using register response data', error);
            const userData: User = {
                id: 0,
                name: response.data.name,
                surname: response.data.surname,
                email: response.data.email,
                username: response.data.username,
                role: response.data.role
            };
            return {
                ...response,
                data: {
                    token: response.data.token,
                    user: userData
                } as AuthResponse
            };
        }
    },

    getCurrentUser: async () => {
        return await axiosInstance.get<User>('/user/me');
    }
};

export default userApi;

