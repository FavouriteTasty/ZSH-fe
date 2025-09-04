import { DividerWithTileProps } from "../divider";
import { FormItemProps } from "../form-item";

export const Unit1012L = (
    <span>
        10<sup>12</sup>/L
    </span>
);
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

export const UnitUL = <span>U/L</span>;
export const UnitIUL = <span>IU/L</span>;
export const UnitMuIUL = <span>μIU/L</span>;
export const UnitMuIUML = <span>μIU/mL</span>;
export const UnitIUML = <span>IU/mL</span>;

export const UnitGL = <span>g/L</span>;
export const UnitMuGL = <span>μg/L</span>;
export const UnitPGML = <span>pg/mL</span>;

export const UnitMuMolL = <span>mmol/L</span>;
export const UnitMilliMolL = <span>mmol/L</span>;
export const UnitNanoMolL = <span>nmol/L</span>;
export const UnitPMolL = <span>pmol/L</span>;

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
        endContent: Unit1012L,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "leukocyteCount",
        endContent: Unit109L,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "platelets",
        endContent: Unit109L,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "hemoglobin",
        endContent: UnitGL,
        isRequired: false,
    },
    { translateKey: "tableColumn.liverFunction" },
    {
        type: "number",
        objectKey: "alt",
        endContent: UnitUL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "ast",
        endContent: UnitUL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "tb",
        endContent: UnitMuMolL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "cb",
        endContent: UnitMuMolL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "totalProtein",
        endContent: UnitGL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "albumin",
        endContent: UnitGL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "globulin",
        endContent: UnitGL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "urea",
        endContent: UnitMilliMolL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "creatinine",
        endContent: UnitMilliMolL,
        isRequired: false,
    },
    { translateKey: "tableColumn.electrolyte" },
    {
        type: "number",
        objectKey: "na",
        endContent: UnitMilliMolL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "k",
        endContent: UnitMilliMolL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "cl",
        endContent: UnitMilliMolL,
        isRequired: false,
    },
    { translateKey: "tableColumn.sugarMetabolism" },
    {
        type: "number",
        objectKey: "fastingBloodGlucose",
        endContent: UnitMilliMolL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "postprandialBloodSugar",
        endContent: UnitMilliMolL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "glycatedHemoglobin",
        endContent: "%",
        isRequired: false,
    },
    { translateKey: "tableColumn.hormone" },
    {
        type: "number",
        objectKey: "tsh",
        endContent: UnitMuIUL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "tpo",
        endContent: UnitIUML,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "ft3",
        endContent: UnitNanoMolL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "ft4",
        endContent: UnitNanoMolL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "fsh",
        endContent: UnitIUL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "lh",
        endContent: UnitIUL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "e2",
        endContent: UnitPMolL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "p",
        endContent: UnitNanoMolL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "t",
        endContent: UnitNanoMolL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "insulin",
        endContent: UnitMuIUML,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "thymosin",
        endContent: UnitMuGL,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "pyy",
        endContent: UnitPGML,
        isRequired: false,
    },
    {
        type: "number",
        objectKey: "glp1",
        endContent: UnitPMolL,
        isRequired: false,
    },
    { translateKey: "tableColumn.bloodLipids" },
    {
        type: "number",
        objectKey: "totalCholesterol",
        endContent: UnitMilliMolL,
    },
    {
        type: "number",
        objectKey: "triglycerides",
        endContent: UnitMilliMolL,
    },
    {
        type: "number",
        objectKey: "ldl",
        endContent: UnitMilliMolL,
    },
    {
        type: "number",
        objectKey: "hdl",
        endContent: UnitMilliMolL,
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
        endContent: "kg",
    },
    {
        type: "number",
        objectKey: "protein",
        endContent: "kg",
    },
    {
        type: "number",
        objectKey: "inorganicSalt",
        endContent: "kg",
    },
    {
        type: "number",
        objectKey: "bodyFat",
        endContent: "kg",
    },
    {
        type: "number",
        objectKey: "skeletalMuscle",
        endContent: "kg",
    },
    {
        type: "number",
        objectKey: "leanBodyMass",
        endContent: "kg",
    },
    { translateKey: "tableColumn.5E5Q5LScale" },
    {
        type: "number",
        objectKey: "actionAbility",
    },
    {
        type: "number",
        objectKey: "selfCare",
    },
    {
        type: "number",
        objectKey: "dailyActivity",
    },
    {
        type: "number",
        objectKey: "pain",
    },
    {
        type: "number",
        objectKey: "anxiety",
    },
    {
        type: "number",
        objectKey: "healthStatus",
    },
    {
        type: "number",
        objectKey: "eqVas",
    },
    {
        type: "avatar",
        objectKey: "patientFrontPhotoThumbnail",
    },
    {
        type: "text",
        objectKey: "patientFrontPhoto",
        isRequired: false,
    },
    {
        type: "avatar",
        objectKey: "patientSidePhotoThumbnail",
    },
    {
        type: "text",
        objectKey: "patientSidePhoto",
        isRequired: false,
    },
];
