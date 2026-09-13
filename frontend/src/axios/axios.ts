import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// for including  JWT token in all requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            url: error.config?.url
        });

        if (error.response?.status === 401) {
            // Token is invalid or expired, clear auth state
            localStorage.removeItem('jwt_token');
            // Redirect to login if not already on login page
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        } else if (error.response?.status === 403) {
            // User lacks permission - provide helpful error message
            const errorMessage = error.response?.data?.message || 'You do not have permission to perform this action. Administrator privileges are required.';
            error.customMessage = errorMessage;
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
