import { Accordion, AccordionItem } from "@heroui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { Followup } from "./components/followup";
import { History } from "./components/history";
import { Hospitalization } from "./components/hospitalization";
import { Introduction } from "./components/introduction";
import { Preoperative } from "./components/preoperative";
import { StentPlacement } from "./components/stentPlacement";
import { StentRemoval } from "./components/stentRemoval";

import { api } from "@/api";
import {
    MedicalHistory,
    UserProfile,
    Hospitalization as HospitalizationType,
    StentPlacement as StentPlacementType,
    PreoperativeExaminationForStentRemoval,
    StentRemoval as StentRemovalType,
    Followup as FollowupType,
} from "@/types/table";

export const View = () => {
    const [userProfile, setUserProfile] = useState<UserProfile>();
    const [history, setHistory] = useState<MedicalHistory>();
    const [hospitalization, setHospitalization] =
        useState<HospitalizationType>();
    const [stentPlacement, setStentPlacement] = useState<StentPlacementType>();
    const [preoperative, setPreoperative] =
        useState<PreoperativeExaminationForStentRemoval>();
    const [stentRemoval, setStentRemoval] = useState<StentRemovalType>();
    const [followups, setFollowups] = useState<FollowupType[]>([]);

    const { id } = useParams();
    const { t } = useTranslation();

    const load = async () => {
        if (id === null || id === undefined) return;
        const userProfile = await api.profile.get(id);
        setUserProfile(userProfile);
        const history = await api.history.get(id);
        setHistory(history);
        const hospitalization = await api.hospitalization.get(id);
        setHospitalization(hospitalization ?? undefined);
        const stentPlacement = await api.stentPlacement.get(id);
        setStentPlacement(stentPlacement ?? undefined);
        const preoperative = await api.preoperative.get(id);
        setPreoperative(preoperative ?? undefined);
        const stentRemoval = await api.stentRemoval.get(id);
        setStentRemoval(stentRemoval ?? undefined);
        const followups = await api.followup.get(id);
        setFollowups(followups);
    };

    useEffect(() => {
        load();
    }, [id]);

    return (
        <div className="w-full px-9">
            <Introduction userProfile={userProfile} className="px-2 mb-4" />
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            <Accordion variant="shadow">
                <AccordionItem
                    key="view-accordion-history"
                    title={t("history")}
                >
                    <History history={history} />
                </AccordionItem>
                <AccordionItem
                    key="view-accordion-hospitalization"
                    title={t("hospitalization")}
                >
                    <Hospitalization hospitalization={hospitalization} />
                </AccordionItem>
                <AccordionItem
                    key="view-accordion-stentPlacement"
                    title={t("stentPlacement")}
                >
                    <StentPlacement stentPlacement={stentPlacement} />
                </AccordionItem>
                <AccordionItem
                    key="view-accordion-preoperativeExaminationForStentRemoval"
                    title={t("preoperativeExaminationForStentRemoval")}
                >
                    <Preoperative preoperative={preoperative} />
                </AccordionItem>

                <AccordionItem
                    key="view-accordion-stentRemoval"
                    title={t("stentRemoval")}
                >
                    <StentRemoval stentRemoval={stentRemoval} />
                </AccordionItem>
                {followups.map((followup) => (
                    <AccordionItem
                        key={`view-accordion-followup-${followup.admissionTime}`}
                        title={`${t("followup")} ${followup.period} ${followup.admissionTime}`}
                    >
                        <Followup hollowup={followup} />
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};
