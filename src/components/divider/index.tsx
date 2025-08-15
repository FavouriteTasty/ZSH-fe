import { Divider } from "@heroui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { capitalize } from "@/utils/string";

export interface DividerWithTileProps {
    translateKey: string;
    size?: "base" | "xs";
}

export const DividerWithTile: FC<DividerWithTileProps> = ({
    translateKey,
    size = "base",
}) => {
    const { t } = useTranslation();

    return (
        <div className="w-full">
            <div className={twMerge(size === "xs" && "text-xs")}>
                {capitalize(t(translateKey), false)}
            </div>
            <Divider />
        </div>
    );
};
