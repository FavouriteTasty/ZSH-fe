import { model } from "@/packages/model";

export interface UIModel {
    login: boolean;
}

export const $UI = model<UIModel>("UI", {
    login: false,
});
