import { FC } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { generate } from "./generate";

import { AddStentPlacementConfig } from "@/components/add-stent-placement/config";
import { DividerWithTile } from "@/components/divider";
import { ViewItem } from "@/components/view-item";
import { StentRemoval as StentRemovalType } from "@/types/table";

interface StentRemovalProps {
    stentRemoval?: StentRemovalType;
    className?: string;
}

export const StentRemoval: FC<StentRemovalProps> = (props) => {
    const { stentRemoval, className } = props;
    const { t } = useTranslation();
    if (stentRemoval === undefined)
        return <div className="text-xs">{t("noData")}</div>;
    const config = generate(
        stentRemoval,
        AddStentPlacementConfig.filter(
            (item) =>
                !("objectKey" in item) ||
                item.objectKey !== "stentManufacturers",
        ),
    );

    return (
        <div className={twMerge("flex flex-wrap gap-y-4 w-full", className)}>
            {config.map((item, index) =>
                "translateKey" in item ? (
                    <DividerWithTile
                        {...item}
                        size="xs"
                        key={`view-StentRemoval-${index}`}
                    />
                ) : (
                    <ViewItem
                        className="flex-1/3"
                        {...item}
                        key={`view-StentRemoval-${index}`}
                    />
                ),
            )}
        </div>
    );
};
