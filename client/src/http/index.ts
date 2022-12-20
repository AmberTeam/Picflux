import axios, {AxiosRequestConfig} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {store} from "../index";
import {IUser} from "../models/IUser";
import { ILogModal } from '../store/store';

export const API_URL = `/api`

const $api = axios.create({
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = config.headers ?? {}

    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Ne АВТОРИЗОВАН')
        }
    }
    store.callLogModal({
        ...error.response.data.config as ILogModal
    })
    throw error;
})

export default $api;
