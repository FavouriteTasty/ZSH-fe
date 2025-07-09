import instance from "./axios";

import { Hospitalization, MedicalHistory, UserProfile } from "@/types/table";

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
};

export const api = { profile, history, hospitalization };
