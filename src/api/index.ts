import instance from "./axios";

import {
    Hospitalization,
    MedicalHistory,
    StentPlacement,
    StentRemoval,
    UserProfile,
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
};

const stentPlacement = {
    upsert: (data: StentPlacement, id: string) =>
        instance.post("/stentPlacement/upsert", { data, id }),
    get: (id: string): Promise<StentPlacement | null> =>
        instance.get(`/stentPlacement/get/${id}`),
};

const stentRemoval = {
    upsert: (data: StentRemoval, id: string) =>
        instance.post("/stentRemoval/upsert", { data, id }),
    get: (id: string): Promise<StentRemoval | null> =>
        instance.get(`/stentRemoval/get/${id}`),
};

export const api = {
    profile,
    history,
    hospitalization,
    stentPlacement,
    stentRemoval,
};
