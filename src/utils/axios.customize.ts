// https://github.com/axios/axios#config-defaults
//https://github.com/axios/axios?tab=readme-ov-file#interceptors

import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';


const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL as string
});


instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);


instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        // if (response && response.data) {
        //     return response.data;
        // }
        return response;
    },
    (error: AxiosError): Promise<AxiosError> => {

        return Promise.reject(error);
    }
);

export default instance;
