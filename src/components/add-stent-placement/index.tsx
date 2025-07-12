import { Button, Form } from "@heroui/react";
import { motion } from "framer-motion";
import { FC, FormEvent, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { AddStentPlacementConfig } from "./config";
import { DividerWithTile } from "../divider";
import { FormItem } from "../form-item";

import { api } from "@/api";
import { AutoSaveInterval } from "@/config";
import { StentPlacementNumberKeys } from "@/types/keys";
import { StentPlacement } from "@/types/table";
import { logger } from "@/utils/alert";
import { FetchFormData, transformData } from "@/utils/table";

interface AddStentPlacementProps {
    setFinishedTab?: () => void;
    defaultValue?: StentPlacement;
}

export const AddStentPlacement: FC<AddStentPlacementProps> = ({
    setFinishedTab,
    defaultValue,
}) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const timeRef = useRef<NodeJS.Timeout>(null);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id === undefined) {
            logger.danger(t("pleaseFillProfile"));
            return;
        }
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const transformedData = transformData(data, StentPlacementNumberKeys);
        await api.stentPlacement.upsert(transformedData as StentPlacement, id);
        setFinishedTab?.();
    };

    const autoSave = async () => {
        const data = FetchFormData("stent-placement-form") as Record<
            string,
            string
        >;
        const transformedData = transformData(
            data,
            StentPlacementNumberKeys,
        ) as StentPlacement;
        if (id === undefined) {
            logger.danger(t("pleaseFillProfile"));
            return;
        }
        await api.stentPlacement.draftUpsert(transformedData, id);
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
                id="stent-placement-form"
            >
                {AddStentPlacementConfig.map((item, index) => {
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
                                        item.objectKey as keyof StentPlacement
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
