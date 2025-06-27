import { Button, Card, CardBody, Tab, Tabs } from "@heroui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { AddableList } from "../addable-list";

import { capitalizeUpper } from "@/utils/string";

interface AddHistoryProps {
    setFinishedTab?: () => void;
}

export const AddHistory: FC<AddHistoryProps> = (props) => {
    const { setFinishedTab } = props;
    const { t } = useTranslation();

    const scheme = (key: string) => {
        return (
            <Tab key={key} title={capitalizeUpper(t("tableColumn." + key))}>
                <Card>
                    <CardBody>
                        <AddableList title={t("tableColumn." + key)} />
                    </CardBody>
                </Card>
            </Tab>
        );
    };

    return (
        <div className="flex flex-col gap-2 p-2">
            <Tabs
                aria-label="Options"
                placement="start"
                classNames={{ panel: "w-full" }}
            >
                {scheme("pastHistory")}
                {scheme("surgeryHistory")}
                {scheme("allergicHistory")}
                {scheme("vaccinationHistory")}
                {scheme("importantDrugHistory")}
                {scheme("bloodTransfusionHistory")}
                {scheme("smokingHistory")}
                {scheme("drinkingHistory")}
                {scheme("menstrualHistory")}
                {scheme("maritalHistory")}
                {scheme("familyHistory")}
            </Tabs>
            <div className="flex justify-end">
                <Button
                    variant="flat"
                    color="primary"
                    onPress={() => {
                        setFinishedTab?.();
                    }}
                >
                    {t("submit")}
                </Button>
            </div>
        </div>
    );
};
