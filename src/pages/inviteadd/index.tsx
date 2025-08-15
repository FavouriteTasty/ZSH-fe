import {
    Button,
    Card,
    CardBody,
    CircularProgress,
    Input,
    Tab,
    Tabs,
} from "@heroui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { twMerge } from "tailwind-merge";

import { TabType } from "../add";

import { api } from "@/api";
import { CompleteIcon } from "@/assets";
import { AddHistory } from "@/components/add-history";
import { InviteAddProfile } from "@/components/invite-add-profile";
import { MedicalHistory, UserProfile } from "@/types/table";
import { logger } from "@/utils/alert";
import { isEmptyMedicalHistory } from "@/utils/table";

export default function InviteAddPage() {
    const [finishedTab, setFinishedTab] = useState<TabType[]>([]);
    const [selected, setSelected] = useState<TabType>("profile");
    const { t } = useTranslation();
    const [defaultUserProfile, setDefaultUserProfile] = useState<
        UserProfile | undefined
    >(undefined);
    const [defaultMedicalHistory, setDefaultMedicalHistory] = useState<
        MedicalHistory | undefined
    >(undefined);

    const navigate = useNavigate();
    // 获取用户id和name
    const { uuid } = useParams();
    const [curUserProfile, setCurUserProfile] = useState<{
        id: string;
        name: string;
    }>({ id: "", name: "" });
    const id = curUserProfile.id;

    const handleProfile = async () => {
        if (id !== undefined && id !== "") {
            const profile = await api.profile.get(id);
            if (!finishedTab.includes("profile")) {
                setFinishedTab((prev) => [...prev, "profile"]);
            }
            setDefaultUserProfile(profile);
            navigate(0);
        }
    };

    const handleHistory = async () => {
        if (id !== undefined && id !== "") {
            const history = await api.history.get(id);
            if (
                !isEmptyMedicalHistory(history) &&
                !finishedTab.includes("history")
            ) {
                setFinishedTab((prev) => [...prev, "history"]);
            }
            setDefaultMedicalHistory(history);
            navigate(0);
        }
    };

    useEffect(() => {
        const fetch = async (uuid: string) => {
            const res = await api.inviteAdd.getProfile(uuid);
            setCurUserProfile(res);
        };
        if (uuid) {
            fetch(uuid);
        }
    }, [uuid]);
    // 数据没加载好时先不渲染 Tabs

    if (!curUserProfile.id) {
        return (
            <div className="flex items-center justify-center flex-1">
                <CircularProgress aria-label={t("Loading")} color="default" />
            </div>
        );
    }
    return (
        <motion.div
            className="flex-1 py-4 px-16 overflow-auto"
            key="home"
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
                            <InviteAddProfile
                                setFinishedTab={() => {
                                    if (!finishedTab.includes("profile")) {
                                        setFinishedTab((prev) => [
                                            ...prev,
                                            "profile",
                                        ]);
                                    }
                                    setSelected("history");
                                    logger.success(
                                        t("submitSuccess", {
                                            form: t("profile"),
                                        }),
                                    );
                                    handleProfile();
                                }}
                                defaultValue={defaultUserProfile}
                                id={curUserProfile.id}
                                name={curUserProfile.name}
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
                                    logger.success(
                                        t("submitSuccess", {
                                            form: t("history"),
                                        }),
                                    );
                                }}
                                defaultValue={defaultMedicalHistory}
                            />
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </motion.div>
    );
}
