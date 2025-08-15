import { Button, Form } from "@heroui/react";
import { motion } from "framer-motion";
import { FC, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

import { DividerWithTile } from "../divider";
import { FormItem } from "../form-item";
import { AvatarUploader } from "./components/upload-avatar";
import { makeInviteAddProfileConfig } from "../add-profile/config";

import { api } from "@/api";
import { UserProfileNumberKeys } from "@/types/keys";
import { UserProfile } from "@/types/table";
import { transformData } from "@/utils/table";

interface InviteAddProfileProps {
    setFinishedTab: () => void;
    defaultValue?: UserProfile;
    id: string;
    name: string;
}

export const InviteAddProfile: FC<InviteAddProfileProps> = ({
    setFinishedTab,
    defaultValue,
    id,
    name,
}) => {
    const { t } = useTranslation();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        data.id = id;
        data.name = name;
        const transformedData = transformData(data, UserProfileNumberKeys);
        await api.profile.upsert(transformedData as unknown as UserProfile);
        setFinishedTab();
    };

    return (
        <motion.div
            className="w-full p-2"
            key="add-profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Form
                className="space-y-4 flex-wrap flex-row gap-[5%]"
                onSubmit={onSubmit}
            >
                <AvatarUploader />

                {makeInviteAddProfileConfig(id, name).map((item, index) => {
                    console.log("item");
                    if ("translateKey" in item) {
                        return (
                            <DividerWithTile
                                key={`add-hospitalization-${index}`}
                                translateKey={item.translateKey}
                            />
                        );
                    } else {
                        console.log(
                            "formitem的信息",
                            item.objectKey,
                            item.defaultValue,
                            item.defaultValue ??
                                defaultValue?.[
                                    item.objectKey as keyof UserProfile
                                ] ??
                                item.defaultValue,
                        );
                        return (
                            <FormItem
                                key={`add-hospitalization-${index}`}
                                {...item}
                                defaultValue={
                                    item.defaultValue ??
                                    defaultValue?.[
                                        item.objectKey as keyof UserProfile
                                    ] ??
                                    item.defaultValue
                                }
                            />
                        );
                    }
                })}
                <div className="w-full flex justify-end">
                    <Button type="submit" variant="flat" color="primary">
                        {t("submit")}
                    </Button>
                </div>
            </Form>
        </motion.div>
    );
};
