import { model } from "@/packages/model";

export type AlertColor =
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
export interface UIModel {
    login: boolean;
    alertColor: AlertColor;
    alertTitle: string;
    alertShow: boolean;
}

export const $UI = model<UIModel>("UI", {
    login: false,
    alertColor: "default",
    alertTitle: "",
    alertShow: false,
});
