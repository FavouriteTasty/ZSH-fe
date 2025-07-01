import { DividerWithTileProps } from "../divider";
import { FormItemProps } from "../form-item";

export const Unit109L = (
    <span>
        10<sup>9</sup>/L
    </span>
);

export const UnitBMI = (
    <span>
        kg/m<sup>2</sup>
    </span>
);

export const UnitGL = <span>g/L</span>;

export const AddHospitalizationConfig: (
    | FormItemProps
    | DividerWithTileProps
)[] = [
    { translateKey: "tableColumn.basic" },
    { type: "date", objectKey: "admissionTime" },
    { type: "number", objectKey: "bodyTemperature", endContent: "℃" },
    { type: "number", objectKey: "heartRate", endContent: "bpm" },
    { type: "number", objectKey: "breathe", endContent: "bpm" },
    { type: "number", objectKey: "bloodPressure", endContent: "mmHg" },
    { type: "number", objectKey: "height", endContent: "cm" },
    { type: "number", objectKey: "weight", endContent: "kg" },
    // { type: "number", objectKey: "bmi", endContent: UnitBMI },
    { type: "number", objectKey: "chestCircumference", endContent: "cm" },
    { type: "number", objectKey: "abdominalCircumference", endContent: "cm" },
    { type: "number", objectKey: "hips", endContent: "cm" },
    { type: "number", objectKey: "bigArm", endContent: "cm" },
    { type: "number", objectKey: "forearm", endContent: "cm" },
    { translateKey: "tableColumn.bloodRoutine" },
    {
        type: "number",
        objectKey: "redBloodCellCount",
        endContent: Unit109L,
    },
    {
        type: "number",
        objectKey: "leukocyteCount",
        endContent: Unit109L,
    },
    {
        type: "number",
        objectKey: "platelets",
        endContent: Unit109L,
    },
    {
        type: "number",
        objectKey: "hemoglobin",
        endContent: UnitGL,
    },
    { translateKey: "tableColumn.liverFunction" },
    {
        type: "number",
        objectKey: "alt",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "ast",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "tb",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "cb",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "totalProtein",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "albumin",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "globulin",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "urea",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "creatinine",
        endContent: UnitGL,
    },
    { translateKey: "tableColumn.electrolyte" },
    {
        type: "number",
        objectKey: "na",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "k",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "cl",
        endContent: UnitGL,
    },
    { translateKey: "tableColumn.sugarMetabolism" },
    {
        type: "number",
        objectKey: "fastingBloodGlucose",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "postprandialBloodSugar",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "glycatedHemoglobin",
        endContent: UnitGL,
    },
    { translateKey: "tableColumn.hormone" },
    {
        type: "number",
        objectKey: "tsh",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "tpo",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "tt3",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "tt4",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "fsh",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "lh",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "e2",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "p",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "insulin",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "thymosin",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "pyy",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "glp1",
        endContent: UnitGL,
    },
    { translateKey: "tableColumn.bloodLipids" },
    {
        type: "number",
        objectKey: "totalCholesterol",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "triglycerides",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "ldl",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "hdl",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "apoe",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "apob",
        endContent: UnitGL,
    },
    {
        type: "number",
        objectKey: "lipoproteinAlpha",
        endContent: UnitGL,
    },
    { translateKey: "tableColumn.bodyComposition" },
    {
        type: "number",
        objectKey: "water",
        endContent: "%",
    },
    {
        type: "number",
        objectKey: "protein",
        endContent: "%",
    },
    {
        type: "number",
        objectKey: "inorganicSalt",
        endContent: "%",
    },
    {
        type: "number",
        objectKey: "bodyFat",
        endContent: "%",
    },
    {
        type: "number",
        objectKey: "skeletalMuscle",
        endContent: "kg/%",
    },
    {
        type: "number",
        objectKey: "leanBodyMass",
        endContent: "kg",
    },
    { translateKey: "tableColumn.5E5Q5LScale" },
    {
        type: "text",
        objectKey: "actionAbility",
    },
    {
        type: "text",
        objectKey: "selfCare",
    },
    {
        type: "text",
        objectKey: "dailyActivity",
    },
    {
        type: "text",
        objectKey: "pain",
    },
    {
        type: "text",
        objectKey: "anxiety",
    },
    {
        type: "text",
        objectKey: "healthStatus",
    },
    {
        type: "text",
        objectKey: "eqVas",
    },
];
