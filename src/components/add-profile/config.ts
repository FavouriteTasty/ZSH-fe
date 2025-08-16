import { DividerWithTileProps } from "../divider";
import { FormItemProps } from "../form-item";

export const AddProfileConfig: (FormItemProps | DividerWithTileProps)[] = [
    { type: "text", objectKey: "id" },
    { type: "text", objectKey: "name" },
    {
        type: "select",
        objectKey: "sex",
        pairs: [
            { key: "male", value: "male" },
            { key: "female", value: "female" },
        ],
    },
    {
        type: "text",
        objectKey: "ethnicity",
        defaultValue: "汉族",
        isRequired: false,
    },
    // { type: "number", objectKey: "age" },
    { type: "date", objectKey: "birth", isRequired: false },

    {
        type: "text",
        objectKey: "country",
        defaultValue: "中国",
        isRequired: false,
    },
    { type: "text", objectKey: "job", isRequired: false },
    {
        type: "select",
        objectKey: "maritalStatus",
        pairs: [
            { key: "unmarried", value: "unmarried" },
            { key: "married", value: "married" },
        ],
        isRequired: false,
    },
    { type: "text", objectKey: "nativePlace", isRequired: false },
    { type: "text", objectKey: "address", isRequired: false },
    { type: "text", objectKey: "phone", isRequired: false },
    { type: "text", objectKey: "contact", isRequired: false },
    { type: "text", objectKey: "relation", isRequired: false },
    { type: "text", objectKey: "contactPhone", isRequired: false },
];

export const InviteAddProfileConfig: (FormItemProps | DividerWithTileProps)[] =
    AddProfileConfig.map((item) =>
        "objectKey" in item &&
        (item.objectKey === "id" || item.objectKey === "name")
            ? { ...item, isDisabled: true }
            : item,
    );
export function makeInviteAddProfileConfig(id: string, name: string) {
    return AddProfileConfig.map((item) =>
        "objectKey" in item &&
        (item.objectKey === "id" || item.objectKey === "name")
            ? {
                  ...item,
                  isDisabled: true,
                  defaultValue: item.objectKey === "id" ? id : name,
              }
            : item,
    );
}
