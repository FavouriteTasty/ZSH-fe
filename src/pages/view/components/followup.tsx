import { FC } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { generate } from "./generate";

import { AddFollowUpConfig } from "@/components/add-followup/config";
import { AddHospitalizationConfig } from "@/components/add-hospitalization/config";
import { DividerWithTile } from "@/components/divider";
import { ViewItem } from "@/components/view-item";
import { Followup as FollowupType } from "@/types/table";

interface FollowupProps {
    hollowup?: FollowupType;
    className?: string;
}

export const Followup: FC<FollowupProps> = (props) => {
    const { hollowup, className } = props;
    const { t } = useTranslation();
    if (hollowup === undefined)
        return <div className="text-xs">{t("noData")}</div>;
    const config = [
        ...generate(hollowup, AddHospitalizationConfig),
        ...generate(hollowup, AddFollowUpConfig),
    ];

    return (
        <div className={twMerge("flex flex-wrap gap-y-4", className)}>
            {config.map((item, index) =>
                "translateKey" in item ? (
                    <DividerWithTile
                        {...item}
                        size="xs"
                        key={`view-Followup-${hollowup.admissionTime}-${index}`}
                    />
                ) : (
                    <ViewItem
                        className="flex-1/3"
                        {...item}
                        key={`view-Followup-${hollowup.admissionTime}-${index}`}
                    />
                ),
            )}
        </div>
    );
};
