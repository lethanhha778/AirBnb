import axios from "axios";
import { ACCESS_TOKEN, TOKEN, URL_API } from "./setting";

export const http = axios.create({
    baseURL: URL_API,
    timeout: 30000
})

http.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'TokenCybersoft': TOKEN,
        'token': localStorage.getItem(ACCESS_TOKEN),
    }
    return config
}, (errors) => {
    return Promise.reject(errors)
})