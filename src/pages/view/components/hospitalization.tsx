import { FC } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { generate } from "./generate";

import { AddHospitalizationConfig } from "@/components/add-hospitalization/config";
import { DividerWithTile } from "@/components/divider";
import { ViewItem } from "@/components/view-item";
import { Hospitalization as HospitalizationType } from "@/types/table";

interface HospitalizationProps {
    hospitalization?: HospitalizationType;
    className?: string;
}

export const Hospitalization: FC<HospitalizationProps> = (props) => {
    const { hospitalization, className } = props;
    const { t } = useTranslation();
    if (hospitalization === undefined)
        return <div className="text-xs">{t("noData")}</div>;
    const config = generate(hospitalization, AddHospitalizationConfig);

    return (
        <div className={twMerge("flex flex-wrap gap-y-4", className)}>
            {config.map((item, index) =>
                "translateKey" in item ? (
                    <DividerWithTile
                        {...item}
                        size="xs"
                        key={`view-Hospitalization-${index}`}
                    />
                ) : (
                    <ViewItem
                        className="flex-1/3"
                        {...item}
                        key={`view-Hospitalization-${index}`}
                    />
                ),
            )}
        </div>
    );
};
