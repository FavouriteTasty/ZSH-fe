import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { CompleteIcon } from "@/assets";
import { AddProfile } from "@/components/add-profile";

export const AddPage: FC = () => {
    const { t } = useTranslation();
    const [finishedTab, setFinishedTab] = useState<string[]>([]);
    const [selected, setSelected] = useState("profile");

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
                    setSelected(key.toString());
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
                            <div>history</div>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </motion.div>
    );
};
