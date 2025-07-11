import { SortDescriptor } from "@heroui/react";

import { SortOrder } from "@/api/type";
import { MedicalHistory } from "@/types/table";

export type ColumnName<T extends string> = `${Uppercase<T>}`;

export const generateColumns = <T extends Record<string, unknown>>(
    keys: (keyof T)[],
    sortableKeys?: (keyof T)[],
    excludeKeys?: (keyof T)[],
) => {
    return keys
        .filter((key) => !excludeKeys?.includes(key))
        .map((key) => ({
            name: key.toString().toUpperCase() as ColumnName<string>,
            uid: key,
            sortable: sortableKeys?.includes(key) || false,
        }));
};

export const isEmptyMedicalHistory = (mh: MedicalHistory) => {
    return (
        mh.pastHistory.length === 0 &&
        mh.surgeryHistory.length === 0 &&
        mh.allergicHistory.length === 0 &&
        mh.vaccinationHistory.length === 0 &&
        mh.importantDrugHistory.length === 0 &&
        mh.bloodTransfusionHistory.length === 0 &&
        mh.smokingHistory.length === 0 &&
        mh.drinkingHistory.length === 0 &&
        mh.menstrualHistory.length === 0 &&
        mh.maritalHistory.length === 0 &&
        mh.familyHistory.length === 0
    );
};

export const transformData = (
    data: Record<string, unknown>,
    numberKeys: string[],
): Record<string, unknown> => {
    return Object.keys(data).reduce(
        (acc, key) => {
            if (numberKeys.includes(key)) {
                acc[key] = Number(data[key]);
            } else {
                acc[key] = data[key];
            }
            return acc;
        },
        {} as Record<string, unknown>,
    );
};

export const SortDescriptor2SortOrder = (
    sd: SortDescriptor | undefined,
): SortOrder | undefined => {
    if (sd === undefined) return undefined;
    if (sd.direction === "ascending") return "asc" as const;
    else return "desc" as const;
};

export const FetchFormData = (id: string) => {
    const form = document.getElementById(id);
    if (form === null) return undefined;
    const fd = new FormData(form as HTMLFormElement);
    const obj = Object.fromEntries(fd.entries());
    return obj;
};
