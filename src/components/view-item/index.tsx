import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { AvatarUploader } from "../add-profile/components/upload-avatar";

import { capitalize } from "@/utils/string";

export interface ViewItemProps {
    type:
        | "text"
        | "select"
        | "number"
        | "date"
        | "avatar"
        | "textarea"
        | "autocomplete";
    objectKey: string;
    endContent?: ReactNode;
    value: string | number;
    className?: string;
}

export const ViewItem: FC<ViewItemProps> = (props) => {
    const { type, objectKey, value, className, endContent } = props;
    const { t } = useTranslation();

    if (
        type === "text" ||
        type === "number" ||
        type === "date" ||
        type === "textarea" ||
        type === "autocomplete"
    ) {
        return (
            <div className={className}>
                <div className="text-xs text-gray-700">
                    {capitalize(t(`tableColumn.${objectKey}`), false)}
                </div>
                <div className="text-base font-medium">
                    {capitalize(
                        value === null ? t("noData") + " " : value.toString(),
                        false,
                    )}
                    {value !== null && endContent}
                </div>
            </div>
        );
    }

    if (type === "avatar") {
        return (
            <div className={className}>
                <div className="text-xs text-gray-700">
                    {capitalize(t(`tableColumn.${objectKey}`), false)}
                </div>

                <div className="w-1/3">
                    <AvatarUploader
                        translateKey={`tableColumn.${objectKey}`}
                        readonly
                        hideLabel
                        autoSize
                        defaultValue={value as string}
                    />
                </div>
            </div>
        );
    }
    return <div></div>;
};
