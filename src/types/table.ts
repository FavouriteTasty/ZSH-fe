import { generateColumns } from "@/utils/table";

export interface History {
    description: string;
    date: Date;
}

export type UserProfile = {
    id: number;
    name: string;
    sex: "male" | "female";
    ethnicity: string;
    age: number;
    birth: Date;
    country: string;
    job: string;
    maritalStatus: string;
    nativePlace: string;
    address: string;
    phone: string;
    contact: string;
    relation: string;
    contactPhone: string;
    avatar: string;
};

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

export type MedicalHistory = {
    pastHistory: History[];
    surgeryHistory: History[];
    allergicHistory: History[];
    vaccinationHistory: History[];
    importantDrugHistory: History[];
    bloodTransfusionHistory: History[];
    smokingHistory: History[];
    drinkingHistory: History[];
    menstrualHistory: History[];
    maritalHistory: History[];
    familyHistory: History[];
};

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

export type User = UserProfile & MedicalHistory;

export type TableActions = {
    actions: never;
};

export const tableActionsKeys: (keyof TableActions)[] = ["actions"] as const;

export type TableKeys = User & TableActions;

export const userColumns = generateColumns<TableKeys>(
    [...UserProfileKeys, ...MedicalHistoryKeys, ...tableActionsKeys],
    ["id", "name", "age", "birth"],
    ["avatar"],
);

export const profileColumns = generateColumns<UserProfile>(UserProfileKeys);
