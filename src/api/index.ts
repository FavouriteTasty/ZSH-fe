import instance from "./axios";
import { SortOrder, TableListResponse } from "./type";

import { GenerateResponse, ProfileResponse } from "@/types/invite-add";
import {
    Hospitalization,
    MedicalHistory,
    PreoperativeExaminationForStentRemoval,
    StentPlacement,
    StentRemoval,
    UserProfile,
    Followup,
    Patient,
} from "@/types/table";

const profile = {
    upsert: (data: UserProfile) => instance.post("/profile/upsert", { data }),
    get: (id: string): Promise<UserProfile> =>
        instance.get(`/profile/get/${id}`),
};

const history = {
    upsert: (data: MedicalHistory, id: string) =>
        instance.post("/history/upsert", { data, id }),
    get: (id: string): Promise<MedicalHistory> =>
        instance.get(`/history/get/${id}`),
};

const hospitalization = {
    upsert: (data: Hospitalization, id: string) =>
        instance.post("/hospitalization/upsert", { data, id }),
    get: (id: string): Promise<Hospitalization | null> =>
        instance.get(`/hospitalization/get/${id}`),
    draftGet: (id: string): Promise<Hospitalization | null> =>
        instance.get(`/hospitalization/draftGet/${id}`),
    draftUpsert: (data: Hospitalization, id: string): Promise<void> =>
        instance.post("/hospitalization/draftUpsert", { data, id }),
};

const stentPlacement = {
    upsert: (data: StentPlacement, id: string) =>
        instance.post("/stentPlacement/upsert", { data, id }),
    get: (id: string): Promise<StentPlacement | null> =>
        instance.get(`/stentPlacement/get/${id}`),
    draftGet: (id: string): Promise<StentPlacement | null> =>
        instance.get(`/stentPlacement/draftGet/${id}`),
    draftUpsert: (data: StentPlacement, id: string): Promise<void> =>
        instance.post("/stentPlacement/draftUpsert", { data, id }),
};

const preoperative = {
    upsert: (data: PreoperativeExaminationForStentRemoval, id: string) =>
        instance.post("/preoperative/upsert", { data, id }),
    get: (id: string): Promise<PreoperativeExaminationForStentRemoval | null> =>
        instance.get(`/preoperative/get/${id}`),
};

const stentRemoval = {
    upsert: (data: StentRemoval, id: string) =>
        instance.post("/stentRemoval/upsert", { data, id }),
    get: (id: string): Promise<StentRemoval | null> =>
        instance.get(`/stentRemoval/get/${id}`),
};

const followup = {
    upsert: (data: Followup, id: string) =>
        instance.post("/followup/upsert", { data, id }),
    get: (id: string): Promise<Followup[]> =>
        instance.get(`/followup/get/${id}`),
};

const table = {
    get: (id: string): Promise<Patient> => instance.get(`/table/get/${id}`),
    list: (param: {
        page: number;
        limit: number;
        sortBy?: string;
        sortOrder?: SortOrder;
        search?: string;
        status?: string;
    }): Promise<TableListResponse> =>
        instance.post(`/table/get`, {
            page: param.page,
            limit: param.limit,
            sortBy: param.sortBy ?? null,
            sortOrder: param.sortOrder ?? null,
            search: param.search ?? null,
            status: param.status ?? null,
        }),
};

const inviteAdd = {
    generate: (id: string, name: string): Promise<GenerateResponse> =>
        instance.post("/invite/generate", {
            data: {
                id,
                name,
            },
        }),
    getProfile: (uuid: string): Promise<ProfileResponse> =>
        instance.get(`/invite/get/${uuid}`),
};

export const api = {
    profile,
    history,
    hospitalization,
    stentPlacement,
    preoperative,
    stentRemoval,
    followup,
    table,
    inviteAdd,
};
