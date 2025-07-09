import { $UI, AlertColor } from "@/store/ui";

const log = (content: string, color: AlertColor) => {
    $UI.update("alert", (draft) => {
        draft.alertColor = color;
        draft.alertShow = true;
        draft.alertTitle = content;
    });
};

export const logger = {
    danger: (content: string) => log(content, "danger"),
    success: (content: string) => log(content, "success"),
    warning: (content: string) => log(content, "warning"),
    default: (content: string) => log(content, "default"),
    primary: (content: string) => log(content, "primary"),
    secondary: (content: string) => log(content, "secondary"),
};
