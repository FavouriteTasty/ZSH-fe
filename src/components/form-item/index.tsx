import {
    DatePicker,
    Input,
    NumberInput,
    Select,
    SelectItem,
    Textarea,
} from "@heroui/react";
import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { AvatarUploader } from "../add-profile/components/upload-avatar";

import { capitalize } from "@/utils/string";

export interface FormItemProps {
    type: "text" | "select" | "number" | "date" | "avatar" | "textarea";
    objectKey: string;
    pairs?: { key: string; value: string }[];
    endContent?: ReactNode;
    isRequired?: boolean;
}

export const FormItem: FC<FormItemProps> = (props) => {
    const { type, objectKey, pairs, endContent, isRequired = true } = props;
    const { t } = useTranslation();
    if (type === "text") {
        return (
            <Input
                className="w-[45%] max-w-[384px]"
                isRequired={isRequired}
                errorMessage={
                    t("pleaseEnterValid") + t(`tableColumn.${objectKey}`)
                }
                label={capitalize(t(`tableColumn.${objectKey}`), false)}
                labelPlacement="outside"
                name={objectKey}
                placeholder={t("pleaseEnter") + t(`tableColumn.${objectKey}`)}
                endContent={endContent}
                type={type}
            />
        );
    }

    if (type === "number") {
        return (
            <NumberInput
                className="w-[45%] max-w-[384px]"
                isWheelDisabled
                isRequired={isRequired}
                errorMessage={
                    t("pleaseEnterValid") + t(`tableColumn.${objectKey}`)
                }
                label={capitalize(t(`tableColumn.${objectKey}`), false)}
                labelPlacement="outside"
                name={objectKey}
                placeholder={t("pleaseEnter") + t(`tableColumn.${objectKey}`)}
                endContent={endContent}
            />
        );
    }

    if (type === "date") {
        return (
            <DatePicker
                className="w-[45%] max-w-[384px]"
                isRequired={isRequired}
                errorMessage={
                    t("pleaseEnterValid") + t(`tableColumn.${objectKey}`)
                }
                label={capitalize(t(`tableColumn.${objectKey}`), false)}
                labelPlacement="outside"
                name={objectKey}
            />
        );
    }

    if (type === "avatar") {
        return <AvatarUploader translateKey={`tableColumn.${objectKey}`} />;
    }

    if (type === "textarea") {
        return (
            <Textarea
                className="w-[45%] max-w-[384px]"
                isRequired={isRequired}
                errorMessage={
                    t("pleaseEnterValid") + t(`tableColumn.${objectKey}`)
                }
                label={capitalize(t(`tableColumn.${objectKey}`), false)}
                labelPlacement="outside"
                name={objectKey}
                placeholder={t("pleaseEnter") + t(`tableColumn.${objectKey}`)}
                endContent={endContent}
            />
        );
    }

    if (pairs === undefined) return <></>;

    return (
        <Select
            className="w-[45%] max-w-[384px]"
            isRequired={isRequired}
            label={capitalize(t(`tableColumn.${objectKey}`), false)}
            labelPlacement="outside"
            name={objectKey}
            placeholder={t("pleaseSelect") + t(`tableColumn.${objectKey}`)}
        >
            {pairs.map((pair) => {
                return (
                    <SelectItem key={pair.key}>
                        {capitalize(t(pair.value))}
                    </SelectItem>
                );
            })}
        </Select>
    );
};
