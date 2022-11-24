import axios from "axios";
import { ACCESS_TOKEN, TOKEN, URL_API } from "./setting";
import { openCustomNotificationWithIcon } from "../util/func";

export const http = axios.create({
    baseURL: URL_API,
    timeout: 30000
})

http.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'TokenCybersoft': TOKEN,
        'Token': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
    }
    return config
}, (errors) => {
    debugger
    return Promise.reject(errors)
})

http.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        err?.response?.data?.content && openCustomNotificationWithIcon(
            "error",
            "Register Failed",
            err?.response?.data?.content
        );

        return Promise.reject(err);
    }
);