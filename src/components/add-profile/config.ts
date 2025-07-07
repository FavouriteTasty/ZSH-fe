import { DividerWithTileProps } from "../divider";
import { FormItemProps } from "../form-item";

export const AddProfileConfig: (FormItemProps | DividerWithTileProps)[] = [
    { type: "text", objectKey: "name" },
    {
        type: "select",
        objectKey: "sex",
        pairs: [
            { key: "male", value: "male" },
            { key: "female", value: "female" },
        ],
    },
    { type: "text", objectKey: "ethnicity" },
    { type: "number", objectKey: "age" },
    { type: "date", objectKey: "birth" },
    { type: "text", objectKey: "country" },
    { type: "text", objectKey: "job" },
    { type: "text", objectKey: "maritalStatus" },
    { type: "text", objectKey: "nativePlace" },
    { type: "text", objectKey: "address" },
    { type: "text", objectKey: "phone" },
    { type: "text", objectKey: "contact" },
    { type: "text", objectKey: "relation" },
    { type: "text", objectKey: "contactPhone" },
];
