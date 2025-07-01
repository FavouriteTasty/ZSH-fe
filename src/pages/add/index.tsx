import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { CompleteIcon } from "@/assets";
import { AddFollowUp } from "@/components/add-followup";
import { AddHistory } from "@/components/add-history";
import { AddHospitalization } from "@/components/add-hospitalization";
import { AddPreoperative } from "@/components/add-preoperative";
import { AddProfile } from "@/components/add-profile";
import { AddStentPlacement } from "@/components/add-stent-placement";
import { AddStentRemoval } from "@/components/add-stent-remove";

export type TabType =
    | "profile"
    | "history"
    | "hospitalization"
    | "stentPlacement"
    | "preoperativeExaminationForStentRemoval"
    | "stentRemoval"
    | "followup";

export const AddPage: FC = () => {
    const { t } = useTranslation();
    const [finishedTab, setFinishedTab] = useState<TabType[]>([]);
    const [selected, setSelected] = useState<TabType>("followup");

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
                    setSelected(key.toString() as TabType);
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
                                    if (
                                        !finishedTab.includes("hospitalization")
                                    ) {
                                        setFinishedTab((prev) => [
                                            ...prev,
                                            "hospitalization",
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
                        <CardBody>
                            <AddHospitalization
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
                    key="stentPlacement"
                    title={
                        <div
                            className={twMerge(
                                "flex items-center gap-1",
                                finishedTab.includes("stentPlacement") &&
                                    "text-green-600",
                            )}
                        >
                            {t("stentPlacement")}
                            {finishedTab.includes("stentPlacement") && (
                                <CompleteIcon />
                            )}
                        </div>
                    }
                >
                    <Card>
                        <CardBody>
                            <AddStentPlacement
                                setFinishedTab={() => {
                                    if (
                                        !finishedTab.includes("stentPlacement")
                                    ) {
                                        setFinishedTab((prev) => [
                                            ...prev,
                                            "stentPlacement",
                                        ]);
                                    }
                                    setSelected(
                                        "preoperativeExaminationForStentRemoval",
                                    );
                                }}
                            />
                        </CardBody>
                    </Card>
                </Tab>
                <Tab
                    key="preoperativeExaminationForStentRemoval"
                    title={
                        <div
                            className={twMerge(
                                "flex items-center gap-1",
                                finishedTab.includes(
                                    "preoperativeExaminationForStentRemoval",
                                ) && "text-green-600",
                            )}
                        >
                            {t("preoperativeExaminationForStentRemoval")}
                            {finishedTab.includes(
                                "preoperativeExaminationForStentRemoval",
                            ) && <CompleteIcon />}
                        </div>
                    }
                >
                    <Card>
                        <CardBody>
                            <AddPreoperative
                                setFinishedTab={() => {
                                    if (
                                        !finishedTab.includes(
                                            "preoperativeExaminationForStentRemoval",
                                        )
                                    ) {
                                        setFinishedTab((prev) => [
                                            ...prev,
                                            "preoperativeExaminationForStentRemoval",
                                        ]);
                                    }
                                    setSelected("stentRemoval");
                                }}
                            />
                        </CardBody>
                    </Card>
                </Tab>
                <Tab
                    key="stentRemoval"
                    title={
                        <div
                            className={twMerge(
                                "flex items-center gap-1",
                                finishedTab.includes("stentRemoval") &&
                                    "text-green-600",
                            )}
                        >
                            {t("stentRemoval")}
                            {finishedTab.includes("stentRemoval") && (
                                <CompleteIcon />
                            )}
                        </div>
                    }
                >
                    <Card>
                        <CardBody>
                            <AddStentRemoval
                                setFinishedTab={() => {
                                    if (!finishedTab.includes("stentRemoval")) {
                                        setFinishedTab((prev) => [
                                            ...prev,
                                            "stentRemoval",
                                        ]);
                                    }
                                    setSelected("stentRemoval");
                                }}
                            />
                        </CardBody>
                    </Card>
                </Tab>
                <Tab
                    key="followup"
                    title={
                        <div
                            className={twMerge(
                                "flex items-center gap-1",
                                finishedTab.includes("followup") &&
                                    "text-green-600",
                            )}
                        >
                            {t("followup")}
                            {finishedTab.includes("followup") && (
                                <CompleteIcon />
                            )}
                        </div>
                    }
                >
                    <Card>
                        <CardBody>
                            <AddFollowUp
                                setFinishedTab={() => {
                                    if (!finishedTab.includes("followup")) {
                                        setFinishedTab((prev) => [
                                            ...prev,
                                            "followup",
                                        ]);
                                    }
                                    setSelected("followup");
                                }}
                            />
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </motion.div>
    );
};
