import axios from "axios";

import { $User } from "@/store/user";
import { logger } from "@/utils/alert";

const instance = axios.create({
    baseURL: "/api",
    timeout: 100000,
});

instance.defaults.headers.get["Content-Type"] = "application/json";
instance.defaults.headers.get.Accept = "*/*";
instance.interceptors.request.use((config) => {
    const at = $User.get().accessToken;
    if (at) config.headers.Authorization = `Bearer ${at}`;
    return config;
});

let refreshing = false;
instance.interceptors.response.use(undefined, async (error) => {
    const original = error.config;
    const refreshToken = $User.get().refreshToken;
    if (error.response?.status === 401 && !original._retry && refreshToken) {
        original._retry = true;
        if (!refreshing) {
            refreshing = true;
            try {
                const res = await instance.post("/auth/refresh", null, {
                    headers: {
                        "X-Refresh-Token": `Bearer ${refreshToken}`,
                    },
                });
                $User.update("refresh token", (draft) => {
                    draft.accessToken = res.data.accessToken;
                    draft.refreshToken = res.data.refreshToken;
                });
            } finally {
                refreshing = false;
            }
        }
        original.headers.Authorization = `Bearer ${$User.get().accessToken}`;
        return instance(original);
    }
    return Promise.reject(error);
});

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
        logger.danger(err.response.data.message ?? err.response.data);
        if (err.response.status === 401 || err.response.status === 422) {
            $User.update("unauthorized", (draft) => {
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
