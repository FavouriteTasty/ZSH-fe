import { Button, Form } from "@heroui/react";
import { motion } from "framer-motion";
import { FC, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { FormItem } from "../form-item";
import { AvatarUploader } from "./components/upload-avatar";
import { AddProfileConfig } from "./config";
import { DividerWithTile } from "../divider";

import { api } from "@/api";
import { UserProfileNumberKeys } from "@/types/keys";
import { UserProfile } from "@/types/table";
import { calculateAge } from "@/utils/cal";
import { transformData } from "@/utils/table";

interface AddProfileProps {
    setFinishedTab: () => void;
    defaultValue?: UserProfile;
}

export const AddProfile: FC<AddProfileProps> = ({
    setFinishedTab,
    defaultValue,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const transformedData = transformData(
            data,
            UserProfileNumberKeys,
        ) as UserProfile;
        if (!transformedData.birth) {
            transformedData.age = calculateAge(transformedData.birth);
        }
        await api.profile.upsert(transformedData as unknown as UserProfile);
        navigate(`/add/${transformedData.id}`);
        setFinishedTab?.();
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

                {AddProfileConfig.map((item, index) => {
                    if ("translateKey" in item) {
                        return (
                            <DividerWithTile
                                key={`add-hospitalization-${index}`}
                                translateKey={item.translateKey}
                            />
                        );
                    } else {
                        return (
                            <FormItem
                                key={`add-hospitalization-${index}`}
                                {...item}
                                defaultValue={
                                    defaultValue?.[
                                        item.objectKey as keyof UserProfile
                                    ] ?? item.defaultValue
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
