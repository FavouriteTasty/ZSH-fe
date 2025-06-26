import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { CompleteIcon } from "@/assets";
import { AddHistory } from "@/components/add-history";
import { AddProfile } from "@/components/add-profile";

export type Tab = "profile" | "history" | "hospitalization";

export const AddPage: FC = () => {
    const { t } = useTranslation();
    const [finishedTab, setFinishedTab] = useState<Tab[]>([]);
    const [selected, setSelected] = useState<Tab>("history");

    return (
        <motion.div
            className="flex-1 py-4 px-6 overflow-auto"
            key="add"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Tabs
                aria-label="Options"
                placement="start"
                selectedKey={selected}
                onSelectionChange={(key) => {
                    setSelected(key.toString() as Tab);
                }}
                classNames={{ panel: "flex-1 " }}
            >
                <Tab
                    key="profile"
                    title={
                        <div
                            className={twMerge(
                                "flex items-center gap-1",
                                finishedTab.includes("profile") &&
                                    "text-green-600",
                            )}
                        >
                            {t("profile")}
                            {finishedTab.includes("profile") && (
                                <CompleteIcon />
                            )}
                        </div>
                    }
                >
                    <Card className="flex-1">
                        <CardBody>
                            <AddProfile
                                setFinishedTab={() => {
                                    if (!finishedTab.includes("profile")) {
                                        setFinishedTab((prev) => [
                                            ...prev,
                                            "profile",
                                        ]);
                                    }
                                    setSelected("history");
                                }}
                            />
                        </CardBody>
                    </Card>
                </Tab>
                <Tab
                    key="history"
                    title={
                        <div
                            className={twMerge(
                                "flex items-center gap-1",
                                finishedTab.includes("history") &&
                                    "text-green-600",
                            )}
                        >
                            {t("history")}
                            {finishedTab.includes("history") && (
                                <CompleteIcon />
                            )}
                        </div>
                    }
                >
                    <Card>
                        <CardBody>
                            <AddHistory
                                setFinishedTab={() => {
                                    if (!finishedTab.includes("history")) {
                                        setFinishedTab((prev) => [
                                            ...prev,
                                            "history",
                                        ]);
                                    }
                                    setSelected("hospitalization");
                                }}
                            />
                        </CardBody>
                    </Card>
                </Tab>
                <Tab
                    key="hospitalization"
                    title={
                        <div
                            className={twMerge(
                                "flex items-center gap-1",
                                finishedTab.includes("hospitalization") &&
                                    "text-green-600",
                            )}
                        >
                            {t("hospitalization")}
                            {finishedTab.includes("hospitalization") && (
                                <CompleteIcon />
                            )}
                        </div>
                    }
                >
                    <Card>
                        <CardBody>Hospitalization</CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </motion.div>
    );
};
