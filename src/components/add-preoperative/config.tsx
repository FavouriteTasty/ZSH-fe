import { DividerWithTileProps } from "../divider";
import { FormItemProps } from "../form-item";

export const AddPreoperativeConfig: (FormItemProps | DividerWithTileProps)[] = [
    { type: "text", objectKey: "sweetsIntake" },
    { type: "text", objectKey: "emotionalEatingFrequency" },
    { type: "text", objectKey: "foodServings" },
    { type: "text", objectKey: "physicalActivityStatus" },
    { type: "text", objectKey: "foodComposition" },
];
