import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { twMerge } from "tailwind-merge";

import { api } from "@/api";
import { CompleteIcon } from "@/assets";
import { AddFollowUp } from "@/components/add-followup";
import { AddHistory } from "@/components/add-history";
import { AddHospitalization } from "@/components/add-hospitalization";
import { AddPreoperative } from "@/components/add-preoperative";
import { AddProfile } from "@/components/add-profile";
import { AddStentPlacement } from "@/components/add-stent-placement";
import { AddStentRemoval } from "@/components/add-stent-remove";
import {
    Followup,
    Hospitalization,
    MedicalHistory,
    PreoperativeExaminationForStentRemoval,
    StentPlacement,
    StentRemoval,
    UserProfile,
} from "@/types/table";
import { logger } from "@/utils/alert";
import { isEmptyMedicalHistory } from "@/utils/table";

export type TabType =
    | "profile"
    | "history"
    | "hospitalization"
    | "stentPlacement"
    | "preoperativeExaminationForStentRemoval"
    | "stentRemoval"
    | "followup"
    | string;

export const AddPage: FC = () => {
    const { t } = useTranslation();
    const [finishedTab, setFinishedTab] = useState<TabType[]>([]);
    const [selected, setSelected] = useState<TabType>("followup");
    const { id } = useParams();
    const [defaultUserProfile, setDefaultUserProfile] = useState<
        UserProfile | undefined
    >(undefined);
    const [defaultMedicalHistory, setDefaultMedicalHistory] = useState<
        MedicalHistory | undefined
    >(undefined);
    const [defaultHospitalization, setDefaultHospitalization] = useState<
        Hospitalization | undefined
    >(undefined);
    const [defaultStentPlacement, setDefaultStentPlacement] = useState<
        StentPlacement | undefined
    >(undefined);
    const [defaultStentRemoval, setDefaultStentRemoval] = useState<
        StentRemoval | undefined
    >(undefined);
    const [defaultPreoperative, setDefaultPreoperative] = useState<
        PreoperativeExaminationForStentRemoval | undefined
    >(undefined);
    const [followups, setFollowups] = useState<Followup[]>([]);

    const navigate = useNavigate();

    const handleProfile = async () => {
        if (id !== undefined && id !== "") {
            const profile = await api.profile.get(id);
            if (!finishedTab.includes("profile")) {
                setFinishedTab((prev) => [...prev, "profile"]);
            }
            setDefaultUserProfile(profile);
            navigate(`/add/${profile.id}`);
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
        }
    };

    const handleHospitalization = async () => {
        if (id !== undefined && id !== "") {
            const hospitalization = await api.hospitalization.get(id);
            if (
                hospitalization !== null &&
                !finishedTab.includes("hospitalization")
            ) {
                setFinishedTab((prev) => [...prev, "hospitalization"]);
                setDefaultHospitalization(hospitalization);
            }
        }
    };

    const handleStentPlacement = async () => {
        if (id !== undefined && id !== "") {
            const placement = await api.stentPlacement.get(id);
            if (placement !== null && !finishedTab.includes("stentPlacement")) {
                setFinishedTab((prev) => [...prev, "stentPlacement"]);
                setDefaultStentPlacement(placement);
            }
        }
    };

    const handlePreoperative = async () => {
        if (id !== undefined && id !== "") {
            const pre = await api.preoperative.get(id);
            if (
                pre !== null &&
                !finishedTab.includes("preoperativeExaminationForStentRemoval")
            ) {
                setFinishedTab((prev) => [
                    ...prev,
                    "preoperativeExaminationForStentRemoval",
                ]);
                setDefaultPreoperative(pre);
            }
        }
    };

    const handleStentRemoval = async () => {
        if (id !== undefined && id !== "") {
            const removal = await api.stentRemoval.get(id);
            if (removal !== null && !finishedTab.includes("stentRemoval")) {
                setFinishedTab((prev) => [...prev, "stentRemoval"]);
                setDefaultStentRemoval(removal);
            }
        }
    };

    const handleFollowup = async () => {
        if (id !== undefined && id !== "") {
            const followups = await api.followup.get(id);
            followups.forEach((followup) => {
                const followupId = `followup-${followup.admissionTime}`;
                if (!finishedTab.includes(followupId)) {
                    setFinishedTab((prev) => [...prev, followupId]);
                }
            });
            console.log(followups);
            setFollowups(followups);
        }
    };

    const handleUrlId = async () => {
        try {
            await handleProfile();
            handleHistory();
            handleHospitalization();
            handleStentPlacement();
            handleStentRemoval();
            handlePreoperative();
            handleFollowup();
        } catch (error) {
            console.error(error);
            navigate("/add");
            logger.danger(t("patientNotFound", { id }));
        }
    };

    useEffect(() => {
        handleUrlId();
    }, [id]);

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
                                    logger.success(
                                        t("submitSuccess", {
                                            form: t("profile"),
                                        }),
                                    );
                                    handleProfile();
                                }}
                                defaultValue={defaultUserProfile}
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
                                    handleHistory();
                                }}
                                defaultValue={defaultMedicalHistory}
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
                                    logger.success(
                                        t("submitSuccess", {
                                            form: t("history"),
                                        }),
                                    );
                                    handleHistory();
                                }}
                                defaultValue={defaultHospitalization}
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
                                    logger.success(
                                        t("submitSuccess", {
                                            form: t("stentPlacement"),
                                        }),
                                    );
                                    handleStentPlacement();
                                }}
                                defaultValue={defaultStentPlacement}
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
                                    logger.success(
                                        t("submitSuccess", {
                                            form: t(
                                                "preoperativeExaminationForStentRemoval",
                                            ),
                                        }),
                                    );
                                    handlePreoperative();
                                }}
                                defaultValue={defaultPreoperative}
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
                                    setSelected("followup");
                                    logger.success(
                                        t("submitSuccess", {
                                            form: t("stentRemoval"),
                                        }),
                                    );
                                    handleStentRemoval();
                                }}
                                defaultValue={defaultStentRemoval}
                            />
                        </CardBody>
                    </Card>
                </Tab>
                {followups.map((followup) => (
                    <Tab
                        key={`followup-${followup.admissionTime}`}
                        title={
                            <div
                                className={twMerge(
                                    "flex items-center gap-1",
                                    finishedTab.includes(
                                        `followup-${followup.admissionTime}`,
                                    ) && "text-green-600",
                                )}
                            >
                                {`${t("followup")}-${followup.admissionTime}`}
                                {finishedTab.includes(
                                    `followup-${followup.admissionTime}`,
                                ) && <CompleteIcon />}
                            </div>
                        }
                    >
                        <Card>
                            <CardBody>
                                <AddFollowUp
                                    setFinishedTab={() => {
                                        setSelected("followup");
                                        logger.success(
                                            t("submitSuccess", {
                                                form: t("followup"),
                                            }),
                                        );
                                        handleFollowup();
                                    }}
                                    defaultValue={followup}
                                />
                            </CardBody>
                        </Card>
                    </Tab>
                ))}
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
                                    setSelected("followup");
                                    logger.success(
                                        t("submitSuccess", {
                                            form: t("followup"),
                                        }),
                                    );
                                    handleFollowup();
                                }}
                            />
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </motion.div>
    );
};
