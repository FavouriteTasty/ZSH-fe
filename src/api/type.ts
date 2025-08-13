/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Followup,
    Hospitalization,
    MedicalHistory,
    Patient,
    PreoperativeExaminationForStentRemoval,
    StentPlacement,
    StentRemoval,
    UserProfile,
} from "@/types/table";

export type SortOrder = "asc" | "desc";

export interface Pagination {
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
    page: number;
    total: number;
    totalPages: number;
}

export type ProfileAndHistory = UserProfile & MedicalHistory;

export interface TablePatient extends ProfileAndHistory {
    hospitalization: Hospitalization | null;
    preExamination: PreoperativeExaminationForStentRemoval | null;
    stentPlacement: StentPlacement | null;
    stentRemoval: StentRemoval | null;
    followup: Followup[];
}

export interface TableListResponse {
    data: TablePatient[];
    pagination: Pagination;
}

export function tablePatientToPatient(tp: TablePatient): Patient {
    const {
        hospitalization,
        stentPlacement,
        preExamination,
        stentRemoval,
        followup,
        ...rest
    } = tp;

    const latest =
        followup.length === 0
            ? undefined
            : followup.reduce((prev, curr) => {
                  const prevTime = new Date(prev.admissionTime).getTime();
                  const currTime = new Date(curr.admissionTime).getTime();
                  return currTime > prevTime ? curr : prev;
              });

    // 这是前端类型没写 undefined 的补丁
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return {
        ...hospitalization,
        ...stentPlacement,
        ...rest,
        latestBMI: latest?.bmi,
    };
}
