import { model } from "@/packages/model";

export interface UserModel {
    login: boolean;
    accessToken?: string;
    refreshToken?: string;
    role?: "admin" | "user";
}

const accessToken = localStorage.getItem("accessToken") ?? undefined;
const refreshToken = localStorage.getItem("refreshToken") ?? undefined;

export const $User = model<UserModel>("USER", {
    login: accessToken !== undefined && refreshToken !== undefined,
    accessToken: accessToken,
    refreshToken: refreshToken,
});
