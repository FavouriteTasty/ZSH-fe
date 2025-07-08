import { model } from "@/packages/model";

export interface UIModel {
    login: boolean;
    alertColor:
        | "default"
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "danger";
    alertTitle: string;
    alertShow: boolean;
}

export const $UI = model<UIModel>("UI", {
    login: false,
    alertColor: "default",
    alertTitle: "",
    alertShow: false,
});
