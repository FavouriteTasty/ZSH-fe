import { Button, Form } from "@heroui/react";
import { motion } from "framer-motion";
import { FC, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { AddStentPlacementConfig } from "../add-stent-placement/config";
import { DividerWithTile } from "../divider";
import { FormItem } from "../form-item";

import { api } from "@/api";
import { StentRemovalNumberKeys } from "@/types/keys";
import { StentRemoval } from "@/types/table";
import { logger } from "@/utils/alert";
import { transformData } from "@/utils/table";

interface AddStentRemovalProps {
    setFinishedTab?: () => void;
    defaultValue?: StentRemoval;
}

export const AddStentRemoval: FC<AddStentRemovalProps> = ({
    setFinishedTab,
    defaultValue,
}) => {
    const { t } = useTranslation();
    const { id } = useParams();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id === undefined) {
            logger.danger(t("pleaseFillProfile"));
            return;
        }
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const transformedData = transformData(data, StentRemovalNumberKeys);
        await api.stentRemoval.upsert(transformedData as StentRemoval, id);
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
                {AddStentPlacementConfig.filter(
                    (item) =>
                        !("objectKey" in item) ||
                        item.objectKey !== "stentManufacturers",
                ).map((item, index) => {
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
                                        item.objectKey as keyof StentRemoval
                                    ]
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
