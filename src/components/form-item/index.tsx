import {
    DatePicker,
    Input,
    NumberInput,
    Select,
    SelectItem,
} from "@heroui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { capitalize, capitalizeUpper } from "@/utils/string";

interface FormItemProps {
    type: "text" | "select" | "number" | "date";
    objectKey: string;
    pairs?: { key: string; value: string }[];
}

export const FormItem: FC<FormItemProps> = (props) => {
    const { type, objectKey, pairs } = props;
    const { t } = useTranslation();

    if (type === "text") {
        return (
            <Input
                className="w-[45%] max-w-[384px]"
                isRequired
                errorMessage={
                    t("pleaseEnterValid") +
                    t(`tableColumn.${objectKey.toUpperCase()}`).toLowerCase()
                }
                label={capitalizeUpper(
                    t(`tableColumn.${objectKey.toUpperCase()}`),
                )}
                labelPlacement="outside"
                name={objectKey.toLowerCase()}
                placeholder={
                    t("pleaseEnter") +
                    t(`tableColumn.${objectKey.toUpperCase()}`).toLowerCase()
                }
                type={type}
            />
        );
    }

    if (type === "number") {
        return (
            <NumberInput
                className="w-[45%] max-w-[384px]"
                isWheelDisabled
                isRequired
                errorMessage={
                    t("pleaseEnterValid") +
                    t(`tableColumn.${objectKey.toUpperCase()}`).toLowerCase()
                }
                label={capitalizeUpper(
                    t(`tableColumn.${objectKey.toUpperCase()}`),
                )}
                labelPlacement="outside"
                name={objectKey.toLowerCase()}
                placeholder={
                    t("pleaseEnter") +
                    t(`tableColumn.${objectKey.toUpperCase()}`).toLowerCase()
                }
            />
        );
    }

    if (type === "date") {
        return (
            <DatePicker
                className="w-[45%] max-w-[384px]"
                isRequired
                errorMessage={
                    t("pleaseEnterValid") +
                    t(`tableColumn.${objectKey.toUpperCase()}`).toLowerCase()
                }
                label={capitalizeUpper(
                    t(`tableColumn.${objectKey.toUpperCase()}`),
                )}
                labelPlacement="outside"
                name={objectKey.toLowerCase()}
            />
        );
    }

    if (pairs === undefined) return <></>;

    return (
        <Select
            className="w-[45%] max-w-[384px]"
            isRequired
            label={capitalizeUpper(t(`tableColumn.${objectKey.toUpperCase()}`))}
            labelPlacement="outside"
            name={objectKey.toLowerCase()}
            placeholder={
                t("pleaseSelect") +
                t(`tableColumn.${objectKey.toUpperCase()}`).toLowerCase()
            }
        >
            {pairs.map((pair) => {
                return (
                    <SelectItem key={pair.key}>
                        {capitalize(pair.value)}
                    </SelectItem>
                );
            })}
        </Select>
    );
};
