import instance from "./axios";

import { UserProfile } from "@/types/table";

const profile = {
    upsert: (data: UserProfile) => instance.post("/profile/upsert", { data }),
    get: (id: string): Promise<UserProfile> =>
        instance.get(`/profile/get/${id}`),
};

export const api = { profile };
