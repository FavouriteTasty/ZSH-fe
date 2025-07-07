import {
    FollowupExtra,
    Hospitalization5E5Q5LScale,
    HospitalizationBasic,
    HospitalizationBloodLipids,
    HospitalizationBloodRoutine,
    HospitalizationBodyComposition,
    HospitalizationElectrolyte,
    HospitalizationHormone,
    HospitalizationLiverFunction,
    HospitalizationOther,
    HospitalizationSugarMetabolism,
    MedicalHistory,
    PreoperativeExaminationForStentRemovalExtra,
    StentPlacement,
    StentRemoval,
    TableActions,
    TableKeys,
    UserProfile,
} from "./table";

import { generateColumns } from "@/utils/table";

export const UserProfileKeys: (keyof UserProfile)[] = [
    "id",
    "name",
    "sex",
    "ethnicity",
    "age",
    "birth",
    "country",
    "job",
    "maritalStatus",
    "nativePlace",
    "address",
    "phone",
    "contact",
    "relation",
    "contactPhone",
    "avatar",
] as const;

export const MedicalHistoryKeys: (keyof MedicalHistory)[] = [
    "pastHistory",
    "surgeryHistory",
    "allergicHistory",
    "vaccinationHistory",
    "importantDrugHistory",
    "bloodTransfusionHistory",
    "smokingHistory",
    "drinkingHistory",
    "menstrualHistory",
    "maritalHistory",
    "familyHistory",
] as const;

export const HospitalizationBasicKeys: (keyof HospitalizationBasic)[] = [
    "admissionTime",
    "bodyTemperature",
    "heartRate",
    "breathe",
    "bloodPressure",
    "height",
    "weight",
    "bmi",
    "chestCircumference",
    "abdominalCircumference",
    "hips",
    "bigArm",
    "forearm",
] as const;

export const HospitalizationBloodRoutineKeys: (keyof HospitalizationBloodRoutine)[] =
    ["redBloodCellCount", "leukocyteCount", "platelets", "hemoglobin"] as const;

export const HospitalizationLiverFunctionKeys: (keyof HospitalizationLiverFunction)[] =
    [
        "alt",
        "ast",
        "tb",
        "cb",
        "totalProtein",
        "albumin",
        "globulin",
        "urea",
        "creatinine",
    ] as const;

export const HospitalizationElectrolyteKeys: (keyof HospitalizationElectrolyte)[] =
    ["na", "k", "cl"] as const;

export const HospitalizationSugarMetabolismKeys: (keyof HospitalizationSugarMetabolism)[] =
    [
        "fastingBloodGlucose",
        "postprandialBloodSugar",
        "glycatedHemoglobin",
    ] as const;

export const HospitalizationHormoneKeys: (keyof HospitalizationHormone)[] = [
    "tsh",
    "tpo",
    "ft3",
    "ft4",
    "fsh",
    "lh",
    "e2",
    "p",
    "t",
    "insulin",
    "thymosin",
    "pyy",
    "glp1",
] as const;

export const HospitalizationBloodLipidsKeys: (keyof HospitalizationBloodLipids)[] =
    [
        "totalCholesterol",
        "hdl",
        "ldl",
        "triglycerides",
        "apoe",
        "apob",
        "lipoproteinAlpha",
    ] as const;

export const HospitalizationBodyCompositionKeys: (keyof HospitalizationBodyComposition)[] =
    [
        "water",
        "protein",
        "inorganicSalt",
        "bodyFat",
        "skeletalMuscle",
        "leanBodyMass",
    ] as const;

export const Hospitalization5E5Q5LScaleKeys: (keyof Hospitalization5E5Q5LScale)[] =
    [
        "actionAbility",
        "selfCare",
        "dailyActivity",
        "pain",
        "anxiety",
        "healthStatus",
        "eqVas",
    ] as const;

export const HospitalizationOtherKeys: (keyof HospitalizationOther)[] = [
    "patientFrontPhoto",
    "patientSidePhoto",
] as const;

export const HospitalizationKeys = [
    ...HospitalizationBasicKeys,
    ...HospitalizationBloodRoutineKeys,
    ...HospitalizationLiverFunctionKeys,
    ...HospitalizationElectrolyteKeys,
    ...HospitalizationSugarMetabolismKeys,
    ...HospitalizationHormoneKeys,
    ...HospitalizationBloodLipidsKeys,
    ...HospitalizationBodyCompositionKeys,
    ...HospitalizationOtherKeys,
] as const;

export const StentPlacementKeys: (keyof StentPlacement)[] = [
    "operationTime",
    "stentManufacturers",
    "dateOfSurgery",
    "complication",
    "surgeon",
    "surgeryLocation",
    "descriptionOfSurgery",
    "intraoperativePictures",
    "fastingDuration",
    "discomfortComplaint",
    "dischargeTime",
] as const;

export const PreoperativeExaminationForStentRemovalExtraKeys: (keyof PreoperativeExaminationForStentRemovalExtra)[] =
    [
        "sweetsIntake",
        "emotionalEatingFrequency",
        "foodServings",
        "physicalActivityStatus",
        "foodComposition",
    ] as const;

export const PreoperativeExaminationForStentRemovalKeys = [
    ...HospitalizationKeys,
    ...PreoperativeExaminationForStentRemovalExtraKeys,
] as const;

export const StentRemovalKeys: (keyof StentRemoval)[] = [
    "operationTime",
    "dateOfSurgery",
    "complication",
    "surgeon",
    "surgeryLocation",
    "descriptionOfSurgery",
    "intraoperativePictures",
    "fastingDuration",
    "discomfortComplaint",
    "dischargeTime",
] as const;

export const FollowUpExtraKeys: (keyof FollowupExtra)[] = [
    "improvementOfPreviousDiseases",
] as const;

export const FollowupKeys = [
    ...HospitalizationKeys,
    ...FollowUpExtraKeys,
] as const;

export const tableActionsKeys: (keyof TableActions)[] = ["actions"] as const;

export const userColumns = generateColumns<TableKeys>(
    [...UserProfileKeys, ...MedicalHistoryKeys, ...tableActionsKeys],
    ["id", "name", "age", "birth"],
    ["avatar"],
);
