import axios, {AxiosRequestConfig} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {store} from "../index";
import {IUser} from "../models/IUser";
import { ILogModal } from '../store/store';

export const API_URL = `http://localhost:5000/api`

const $api = axios.create({
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = config.headers ?? {}

    config.headers['Accept-Language'] = store.lang.packet_name
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if(error.response) {
        if(error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true})
                localStorage.setItem('token', response.data.accessToken);
                return $api.request(originalRequest);
            } catch (e) {
                throw e
            }
        } else {
            if(error.response.data.config.visible && error.response.data.config.visible === false) return console.log("not visible")
            else store.callLogModal({
                ...error.response.data.config as ILogModal,
                status: 0
            })
        }
    } else if(error.request) {
        store.callLogModal({
            code: 'x6',
            alt: 'Unknown server error. Please try again in about 5 minutes.',
            status: 0
        })
    } else {

    }
    throw error;
})

export default $api;
