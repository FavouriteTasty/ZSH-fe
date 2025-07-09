import { Button, Form } from "@heroui/react";
import { motion } from "framer-motion";
import { FC, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { AddHospitalizationConfig } from "../add-hospitalization/config";
import { AvatarUploader } from "../add-profile/components/upload-avatar";
import { DividerWithTile } from "../divider";
import { FormItem } from "../form-item";
import { AddPreoperativeConfig } from "./config";

import { api } from "@/api";
import { PreoperativeExaminationForStentRemovalNumberKeys } from "@/types/keys";
import { PreoperativeExaminationForStentRemoval } from "@/types/table";
import { logger } from "@/utils/alert";
import { transformData } from "@/utils/table";

interface AddPreoperativeProps {
    setFinishedTab?: () => void;
    defaultValue?: PreoperativeExaminationForStentRemoval;
}

export const AddPreoperative: FC<AddPreoperativeProps> = ({
    setFinishedTab,
    defaultValue,
}) => {
    const { t } = useTranslation();
    const { id } = useParams();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const transformedData = transformData(
            data,
            PreoperativeExaminationForStentRemovalNumberKeys,
        );
        if (id === undefined) {
            logger.danger(t("pleaseFillProfile"));
            return;
        }
        await api.preoperative.upsert(
            transformedData as PreoperativeExaminationForStentRemoval,
            id,
        );
        console.log(data);
        setFinishedTab?.();
    };

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
                <AvatarUploader translateKey="tableColumn.patientSidePhoto" />

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
