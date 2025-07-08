import axios from "axios";

import { $UI } from "@/store/ui";

const instance = axios.create({
    baseURL: "/api",
    timeout: 100000,
});

instance.defaults.headers.get["Content-Type"] = "application/json";
instance.defaults.headers.get.Accept = "*/*";
instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`;

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        return config;
    },
    async (err) => {
        return await Promise.reject(err);
    },
);

// 响应拦截器
instance.interceptors.response.use(
    (res) => {
        if (res.config.responseType === "blob") {
            return res; // 返回整个响应以便下载
        }
        return res.data;
    },
    async (err) => {
        if (err.response.status === 401 || err.response.status === 422) {
            $UI.update("unauthorized", (draft) => {
                draft.login = false;
            });
            localStorage.setItem("token", "");
            if (!window.location.href.includes("login"))
                window.location.href = "/login";
        }
        return await Promise.reject(err);
    },
);

export default instance;
