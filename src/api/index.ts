import instance from "./axios";

import { UserProfile } from "@/types/table";

const profile = {
    upsert: (data: UserProfile) => instance.post("/profile/upsert", { data }),
};

export const api = { profile };
