import { FC } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { generate } from "./generate";

import { AddStentPlacementConfig } from "@/components/add-stent-placement/config";
import { DividerWithTile } from "@/components/divider";
import { ViewItem } from "@/components/view-item";
import { StentPlacement as StentPlacementType } from "@/types/table";

interface StentPlacementProps {
    stentPlacement?: StentPlacementType;
    className?: string;
}

export const StentPlacement: FC<StentPlacementProps> = (props) => {
    const { stentPlacement, className } = props;
    const { t } = useTranslation();
    if (stentPlacement === undefined)
        return <div className="text-xs">{t("noData")}</div>;
    const config = generate(stentPlacement, AddStentPlacementConfig);

    return (
        <div className={twMerge("flex flex-wrap gap-y-4 w-full", className)}>
            {config.map((item, index) =>
                "translateKey" in item ? (
                    <DividerWithTile
                        {...item}
                        size="xs"
                        key={`view-StentPlacement-${index}`}
                    />
                ) : (
                    <ViewItem
                        className="flex-1/3"
                        {...item}
                        key={`view-StentPlacement-${index}`}
                    />
                ),
            )}
        </div>
    );
};
