import { DividerWithTileProps } from "../divider";
import { FormItemProps } from "../form-item";

export const AddStentPlacementConfig: (FormItemProps | DividerWithTileProps)[] =
    [
        { type: "date", objectKey: "operationTime" },
        { type: "text", objectKey: "stentManufacturers" },
        { type: "date", objectKey: "dateOfSurgery" },
        { type: "text", objectKey: "complication" },
        { type: "text", objectKey: "surgeon" },
        { type: "text", objectKey: "surgeryLocation" },
        { type: "textarea", objectKey: "descriptionOfSurgery" },
        { type: "avatar", objectKey: "intraoperativePictures" },
        { type: "number", objectKey: "fastingDuration" },
        { type: "text", objectKey: "discomfortComplaint" },
        { type: "date", objectKey: "dischargeTime" },
    ];
