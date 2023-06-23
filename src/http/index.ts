import axios, { AxiosRequestConfig } from "axios";
import { AuthResponse } from "../interfaces/AuthResponse";
import store from "../store/store";

export const API_URL = "http://localhost:5000/api";

const $api = axios.create({
    headers: {
        "Content-Type": "multipart/form-data"
    },
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = config.headers ?? {};

    config.headers["Accept-Language"] = store.lang.packet_name;
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

$api.interceptors.response.use((config) => {
    console.log("Hola");
    return config;
}, async (error) => {
    const originalRequest = error.config;
    console.log(error);
    if (error.response) {
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true });
            localStorage.setItem("token", response.data.accessToken);
            return $api.request(originalRequest);
        } else {
            if (error.response.data.config?.visible === false) return console.log("not visible");
            else {
                store.callLogModal({
                    code: "x1",
                    status: 0
                });
            }
        }
    } else if (error.request) {
        store.callLogModal({
            code: "x6",
            status: 0
        });
    }
    throw error;
});

export default $api;