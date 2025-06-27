import { Button, Form } from "@heroui/react";
import { motion } from "framer-motion";
import { FC, FormEvent } from "react";
import { useTranslation } from "react-i18next";

import { DividerWithTile } from "../divider";
import { FormItem } from "../form-item";
import { AddHospitalizationConfig } from "./config";
import { AvatarUploader } from "../add-profile/components/upload-avatar";

interface AddHospitalizationProps {
    setFinishedTab?: () => void;
}

export const AddHospitalization: FC<AddHospitalizationProps> = ({
    setFinishedTab,
}) => {
    const { t } = useTranslation();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
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
