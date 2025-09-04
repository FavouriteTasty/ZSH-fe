import { Button, Form } from "@heroui/react";
import { motion } from "framer-motion";
import { FC, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { AddHospitalizationConfig } from "../add-hospitalization/config";
import { DividerWithTile, DividerWithTileProps } from "../divider";
import { FormItem, FormItemProps } from "../form-item";
import { AddFollowUpConfig } from "./config";

import { api } from "@/api";
import { FollowupNumberKeys } from "@/types/keys";
import { Followup } from "@/types/table";
import { logger } from "@/utils/alert";
import { bmi } from "@/utils/cal";
import { transformData } from "@/utils/table";

interface AddFollowUpProps {
    setFinishedTab?: () => void;
    defaultValue?: Followup;
}

export const AddFollowUp: FC<AddFollowUpProps> = ({
    setFinishedTab,
    defaultValue,
}) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [periodList, setPeriodList] = useState<string[]>([]);
    const config: (FormItemProps | DividerWithTileProps)[] = [
        AddHospitalizationConfig[0],
        {
            type: "autocomplete",
            objectKey: "period",
            autoCompleteItems: periodList.map((item) => ({
                key: item,
                label: item,
            })),
        },
        ...AddHospitalizationConfig.slice(1),
    ];

    const load = async () => {
        const res = await api.excel.period();
        setPeriodList(res.periodList);
    };

    useEffect(() => {
        load();
    }, []);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const transformedData = transformData(
            data,
            FollowupNumberKeys,
        ) as Followup;
        transformedData.bmi = bmi(
            transformedData.weight as number,
            transformedData.height as number,
        );
        if (id === undefined) {
            logger.danger(t("pleaseFillProfile"));
            return;
        }

        await api.followup.upsert(transformedData, id);
        setFinishedTab?.();
    };

    // const autoSave = () => {
    //     const data = FetchFormData("followup-form") as Record<string, string>;
    //     const transformedData = transformData(
    //         data,
    //         FollowupNumberKeys,
    //     ) as Followup;
    //     console.log(transformedData);
    // };

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
                id={defaultValue === undefined ? "followup-form" : undefined}
            >
                {config.map((item, index) => {
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
                                        item.objectKey as keyof Followup
                                    ] ?? item.defaultValue
                                }
                            />
                        );
                    }
                })}

                {AddFollowUpConfig.map((item, index) => {
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
                                        item.objectKey as keyof Followup
                                    ] ?? item.defaultValue
                                }
                            />
                        );
                    }
                })}

                <div className="w-full flex justify-end gap-4">
                    {(defaultValue === undefined || defaultValue === null) && (
                        <Button type="reset" variant="bordered">
                            {t("reset")}
                        </Button>
                    )}
                    <Button type="submit" variant="flat" color="primary">
                        {t("submit")}
                    </Button>
                </div>
            </Form>
        </motion.div>
    );
};
