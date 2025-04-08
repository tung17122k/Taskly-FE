// https://github.com/axios/axios#config-defaults
//https://github.com/axios/axios?tab=readme-ov-file#interceptors

import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import Cookies from 'js-cookie';


const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL as string,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});




instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);


instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Chỉ xử lý lỗi 401 và không phải là request refresh-token
        if (error.response?.status === 401 && !originalRequest.url?.includes('refresh-token')) {

            // Tránh lặp vô hạn
            if (originalRequest._retry) {
                return Promise.reject(error);
            }
            originalRequest._retry = true;

            try {

                const refreshResponse = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/refresh-token`,
                    {}, // Body rỗng
                    { withCredentials: true }
                );


                if (refreshResponse.data?.data?.access_token) {
                    const newAccessToken = refreshResponse.data.data.access_token;

                    // Lưu access token mới vào cookie
                    Cookies.set('access_token', newAccessToken, {
                        expires: 1, // 1 ngày
                        secure: import.meta.env.PROD,
                        sameSite: 'Strict'
                    });

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return instance(originalRequest);
                }
            } catch (refreshError) {
                // Xử lý khi refresh token thất bại
                console.error('Refresh token failed:', refreshError);
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');

                // Chuyển hướng về login 
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
