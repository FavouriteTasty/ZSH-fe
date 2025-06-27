import { Divider } from "@heroui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { capitalize } from "@/utils/string";

export interface DividerWithTileProps {
    translateKey: string;
}

export const DividerWithTile: FC<DividerWithTileProps> = ({ translateKey }) => {
    const { t } = useTranslation();

    return (
        <div className="w-full">
            <div>{capitalize(t(translateKey), false)}</div>
            <Divider />
        </div>
    );
};
