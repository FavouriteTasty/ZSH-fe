import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@heroui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { InternationalIcon } from "@/assets";

export const Header: FC = () => {
    const { t, i18n } = useTranslation();

    return (
        <Navbar>
            <NavbarBrand className="gap-2">
                <Image src="/logo.png" width={28} />
                <div className="font-semibold text-inherit">{t("title")}</div>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="light">
                                <InternationalIcon className="text-xl" />
                                {t("language")}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem
                                key="i18n-zh"
                                onClick={() => {
                                    i18n.changeLanguage("zh");
                                }}
                            >
                                简体中文
                            </DropdownItem>
                            <DropdownItem
                                key="i18n-en"
                                onClick={() => {
                                    i18n.changeLanguage("en");
                                }}
                            >
                                English
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
                <NavbarItem>
                    <Button color="primary" variant="flat">
                        {t("logout")}
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};
