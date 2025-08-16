import { Button, Form } from "@heroui/react";
import { motion } from "framer-motion";
import { FC, FormEvent, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { AddHospitalizationConfig } from "../add-hospitalization/config";
import { AvatarUploader } from "../add-profile/components/upload-avatar";
import { DividerWithTile } from "../divider";
import { FormItem } from "../form-item";
import { AddPreoperativeConfig } from "./config";

import { api } from "@/api";
import { AutoSaveInterval } from "@/config";
import { PreoperativeExaminationForStentRemovalNumberKeys } from "@/types/keys";
import { PreoperativeExaminationForStentRemoval } from "@/types/table";
import { logger } from "@/utils/alert";
import { bmi } from "@/utils/cal";
import { FetchFormData, transformData } from "@/utils/table";

interface AddPreoperativeProps {
    setFinishedTab?: () => void;
    load?: () => Promise<void>;
    defaultValue?: PreoperativeExaminationForStentRemoval;
    isDraft?: boolean;
}

export const AddPreoperative: FC<AddPreoperativeProps> = ({
    setFinishedTab,
    load,
    defaultValue,
    isDraft = false,
}) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const timeRef = useRef<NodeJS.Timeout>(null);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const transformedData = transformData(
            data,
            PreoperativeExaminationForStentRemovalNumberKeys,
        ) as PreoperativeExaminationForStentRemoval;
        transformedData.bmi = bmi(
            transformedData.weight as number,
            transformedData.height as number,
        );
        if (id === undefined) {
            logger.danger(t("pleaseFillProfile"));
            return;
        }
        await api.preoperative.upsert(transformedData, id);
        await load?.();
        setFinishedTab?.();
    };

    const autoSave = async () => {
        const data = FetchFormData("preoperative-form") as Record<
            string,
            string
        >;
        const transformedData = transformData(
            data,
            PreoperativeExaminationForStentRemovalNumberKeys,
        ) as PreoperativeExaminationForStentRemoval;
        if (id === undefined) {
            logger.danger(t("pleaseFillProfile"));
            return;
        }
        await api.preoperative.draftUpsert(transformedData, id);
        await load?.();
        logger.success(t("autoSave"));
    };

    useEffect(() => {
        if (timeRef.current === null && isDraft) {
            timeRef.current = setInterval(() => {
                autoSave();
            }, AutoSaveInterval);
        }
        return () => {
            if (timeRef.current !== null) clearInterval(timeRef.current);
            timeRef.current = null;
        };
    }, [isDraft]);

    return (
        <motion.div
            className="w-full p-2"
            key="add-hospitalization"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Form
                className="space-y-4 flex-wrap flex-row gap-[5%]"
                onSubmit={onSubmit}
                id="preoperative-form"
            >
                {AddHospitalizationConfig.map((item, index) => {
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
                                        item.objectKey as keyof PreoperativeExaminationForStentRemoval
                                    ] ?? item.defaultValue
                                }
                            />
                        );
                    }
                })}

                <AvatarUploader translateKey="tableColumn.patientFrontPhoto" />
                <FormItem
                    defaultValue={defaultValue?.patientFrontPhoto}
                    type="text"
                    objectKey="patientFrontPhoto"
                    isRequired={false}
                />
                <AvatarUploader translateKey="tableColumn.patientSidePhoto" />
                <FormItem
                    defaultValue={defaultValue?.patientSidePhoto}
                    type="text"
                    objectKey="patientSidePhoto"
                    isRequired={false}
                />

                {AddPreoperativeConfig.map((item, index) => {
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
                                        item.objectKey as keyof PreoperativeExaminationForStentRemoval
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
