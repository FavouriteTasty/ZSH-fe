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

import { string2calenderDate } from "@/utils/date";
import { capitalize } from "@/utils/string";

export interface FormItemProps {
    type: "text" | "select" | "number" | "date" | "avatar" | "textarea";
    objectKey: string;
    pairs?: { key: string; value: string }[];
    endContent?: ReactNode;
    isRequired?: boolean;
    defaultValue?: string | number;
    isDisabled?: boolean;
    onBlur?: () => void;
}

export const FormItem: FC<FormItemProps> = (props) => {
    const {
        type,
        objectKey,
        pairs,
        endContent,
        isRequired = true,
        defaultValue,
        isDisabled = false,
        onBlur,
    } = props;
    const { t } = useTranslation();
    if (type === "text") {
        console.log("一个text input", objectKey, isDisabled, defaultValue);
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
                defaultValue={defaultValue as string}
                type={type}
                onBlur={onBlur}
                isDisabled={isDisabled}
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
                onBlur={onBlur}
                defaultValue={defaultValue as number}
                isDisabled={isDisabled}
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
                defaultValue={
                    defaultValue === undefined
                        ? undefined
                        : string2calenderDate(defaultValue as string)
                }
                name={objectKey}
                onBlur={onBlur}
                isDisabled={isDisabled}
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
                defaultValue={defaultValue as string}
                errorMessage={
                    t("pleaseEnterValid") + t(`tableColumn.${objectKey}`)
                }
                label={capitalize(t(`tableColumn.${objectKey}`), false)}
                labelPlacement="outside"
                name={objectKey}
                placeholder={t("pleaseEnter") + t(`tableColumn.${objectKey}`)}
                endContent={endContent}
                onBlur={onBlur}
                isDisabled={isDisabled}
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
            defaultSelectedKeys={
                defaultValue === undefined
                    ? undefined
                    : [defaultValue as string]
            }
            onBlur={onBlur}
            isDisabled={isDisabled}
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
