import { Button, Form } from "@heroui/react";
import { motion } from "framer-motion";
import { FC, FormEvent, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { DividerWithTile } from "../divider";
import { FormItem } from "../form-item";
import { AddHospitalizationConfig } from "./config";
import { AvatarUploader } from "../add-profile/components/upload-avatar";

import { api } from "@/api";
import { AutoSaveInterval } from "@/config";
import { HospitalizationNumberKeys } from "@/types/keys";
import { Hospitalization } from "@/types/table";
import { logger } from "@/utils/alert";
import { bmi } from "@/utils/cal";
import { FetchFormData, transformData } from "@/utils/table";

interface AddHospitalizationProps {
    setFinishedTab?: () => void;
    defaultValue?: Hospitalization;
}

export const AddHospitalization: FC<AddHospitalizationProps> = ({
    setFinishedTab,
    defaultValue,
}) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const timeRef = useRef<NodeJS.Timeout>(null);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const transformedData = transformData(
            data,
            HospitalizationNumberKeys,
        ) as Hospitalization;
        transformedData.bmi = bmi(
            transformedData.weight as number,
            transformedData.height as number,
        );
        if (id === undefined) {
            logger.danger(t("pleaseFillProfile"));
            return;
        }
        await api.hospitalization.upsert(transformedData, id);
        setFinishedTab?.();
    };

    const autoSave = async () => {
        const data = FetchFormData("hospitalization-form") as Record<
            string,
            string
        >;
        const transformedData = transformData(
            data,
            HospitalizationNumberKeys,
        ) as Hospitalization;
        if (id === undefined) {
            logger.danger(t("pleaseFillProfile"));
            return;
        }
        await api.hospitalization.draftUpsert(transformedData, id);
        logger.success(t("autoSave"));
    };

    useEffect(() => {
        if (timeRef.current === null) {
            timeRef.current = setInterval(() => {
                autoSave();
            }, AutoSaveInterval);
        }
        return () => {
            if (timeRef.current !== null) clearInterval(timeRef.current);
            timeRef.current = null;
        };
    }, []);

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
                id={"hospitalization-form"}
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
                                        item.objectKey as keyof Hospitalization
                                    ] ?? item.defaultValue
                                }
                            />
                        );
                    }
                })}

                <AvatarUploader translateKey="tableColumn.patientFrontPhoto" />
                <AvatarUploader translateKey="tableColumn.patientSidePhoto" />
                <div className="w-full flex justify-end">
                    <Button type="submit" variant="flat" color="primary">
                        {t("submit")}
                    </Button>
                </div>
            </Form>
        </motion.div>
    );
};
