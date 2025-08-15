import { Button, Card, CardBody, Tab, Tabs } from "@heroui/react";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { AddableList } from "../addable-list";

import { api } from "@/api";
import { History, MedicalHistory } from "@/types/table";
import { logger } from "@/utils/alert";
import { capitalizeUpper } from "@/utils/string";

interface AddHistoryProps {
    setFinishedTab?: () => void;
    defaultValue?: MedicalHistory;
    inviteId?: string;
}

export const AddHistory: FC<AddHistoryProps> = (props) => {
    const { setFinishedTab, defaultValue, inviteId } = props;
    const { t } = useTranslation();
    const { id } = useParams();
    const [medicalHistory, setMedicalHistory] = useState<MedicalHistory>(
        defaultValue ?? {
            pastHistory: [],
            surgeryHistory: [],
            allergicHistory: [],
            vaccinationHistory: [],
            importantDrugHistory: [],
            bloodTransfusionHistory: [],
            smokingHistory: [],
            drinkingHistory: [],
            menstrualHistory: [],
            maritalHistory: [],
            familyHistory: [],
        },
    );

    const onSubmit = async () => {
        if (id === undefined && inviteId === undefined) {
            logger.danger(t("pleaseFillProfile"));
            return;
        }
        await api.history.upsert(medicalHistory, (id ?? inviteId)!);
        setFinishedTab?.();
    };

    const scheme = (key: keyof MedicalHistory, defaultValue: History[]) => {
        return (
            <Tab key={key} title={capitalizeUpper(t("tableColumn." + key))}>
                <Card>
                    <CardBody>
                        <AddableList
                            title={t("tableColumn." + key)}
                            onChange={(histories) =>
                                setMedicalHistory((prev) => ({
                                    ...prev,
                                    [key]: histories,
                                }))
                            }
                            defaultValue={defaultValue}
                        />
                    </CardBody>
                </Card>
            </Tab>
        );
    };

    return (
        <motion.div
            className="flex flex-col gap-2 p-2"
            key="add-history"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Tabs
                aria-label="Options"
                placement="start"
                classNames={{ panel: "w-full" }}
            >
                {scheme("pastHistory", medicalHistory.pastHistory)}
                {scheme("surgeryHistory", medicalHistory.surgeryHistory)}
                {scheme("allergicHistory", medicalHistory.allergicHistory)}
                {scheme(
                    "vaccinationHistory",
                    medicalHistory.vaccinationHistory,
                )}
                {scheme(
                    "importantDrugHistory",
                    medicalHistory.importantDrugHistory,
                )}
                {scheme(
                    "bloodTransfusionHistory",
                    medicalHistory.bloodTransfusionHistory,
                )}
                {scheme("smokingHistory", medicalHistory.smokingHistory)}
                {scheme("drinkingHistory", medicalHistory.drinkingHistory)}
                {scheme("menstrualHistory", medicalHistory.menstrualHistory)}
                {scheme("maritalHistory", medicalHistory.maritalHistory)}
                {scheme("familyHistory", medicalHistory.familyHistory)}
            </Tabs>
            <div className="flex justify-end">
                <Button
                    variant="flat"
                    color="primary"
                    onPress={() => {
                        onSubmit();
                    }}
                >
                    {t("submit")}
                </Button>
            </div>
        </motion.div>
    );
};
