import { FC } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { generate } from "./generate";

import { AddHospitalizationConfig } from "@/components/add-hospitalization/config";
import { AddPreoperativeConfig } from "@/components/add-preoperative/config";
import { DividerWithTile } from "@/components/divider";
import { ViewItem } from "@/components/view-item";
import { PreoperativeExaminationForStentRemoval } from "@/types/table";

interface PreoperativeProps {
    preoperative?: PreoperativeExaminationForStentRemoval;
    className?: string;
}

export const Preoperative: FC<PreoperativeProps> = (props) => {
    const { preoperative, className } = props;
    const { t } = useTranslation();
    if (preoperative === undefined)
        return <div className="text-xs">{t("noData")}</div>;
    const config = [
        ...generate(preoperative, AddHospitalizationConfig),
        ...generate(preoperative, AddPreoperativeConfig),
    ];

    return (
        <div className={twMerge("flex flex-wrap gap-y-4 w-full", className)}>
            {config.map((item, index) =>
                "translateKey" in item ? (
                    <DividerWithTile
                        {...item}
                        size="xs"
                        key={`view-Preoperative-${index}`}
                    />
                ) : (
                    <ViewItem
                        className="flex-1/3"
                        {...item}
                        key={`view-Preoperative-${index}`}
                    />
                ),
            )}
        </div>
    );
};
