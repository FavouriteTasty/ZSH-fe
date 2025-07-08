import instance from "./axios";

import { MedicalHistory, UserProfile } from "@/types/table";

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

export const api = { profile, history };
