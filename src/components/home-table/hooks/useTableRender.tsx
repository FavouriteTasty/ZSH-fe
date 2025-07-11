/* eslint-disable react/display-name */
import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    User,
} from "@heroui/react";
import { TFunction } from "i18next";
import { Key, useMemo } from "react";

import { VerticalDotsIcon } from "@/assets";
import { Patient as DataType } from "@/types/table";
import { sexColorMap } from "@/types/table-style";

export const useTableRenderer = (t: TFunction, language: string) => {
    const renderCell = useMemo(() => {
        return (user: DataType, columnKey: Key) => {
            const cellValue = user[columnKey as keyof DataType];

            switch (columnKey) {
                case "name":
                    return (
                        <User
                            avatarProps={{ radius: "lg", src: user.avatar }}
                            description={user.birth}
                            name={cellValue as string}
                        >
                            {user.contactPhone}
                        </User>
                    );
                case "birth":
                    return user.birth;
                case "sex":
                    return (
                        <Chip
                            className="capitalize"
                            color={sexColorMap[user.sex]}
                            size="sm"
                            variant="flat"
                        >
                            {t(user.sex)}
                        </Chip>
                    );
                case "pastHistory":
                case "surgeryHistory":
                case "allergicHistory":
                case "vaccinationHistory":
                case "importantDrugHistory":
                case "bloodTransfusionHistory":
                case "smokingHistory":
                case "drinkingHistory":
                case "menstrualHistory":
                case "maritalHistory":
                case "familyHistory":
                    return (cellValue as unknown as Array<History>).length;
                case "actions":
                    return (
                        <div className="relative flex justify-end items-center gap-2">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                    >
                                        <VerticalDotsIcon className="text-default-300" />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem key="view">View</DropdownItem>
                                    <DropdownItem key="edit">Edit</DropdownItem>
                                    <DropdownItem key="delete">
                                        Delete
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    );
                default:
                    return cellValue as string;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [t, language]);

    return renderCell;
};
