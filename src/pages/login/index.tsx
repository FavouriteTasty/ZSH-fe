import { Image, Input } from "@heroui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const Login: FC = () => {
    const { t } = useTranslation();
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center w-96">
                <Image className="mb-4" src="/logo.png" width={50} />
                <div className="text-2xl mb-4">{t("login.title")}</div>
                <Input label={t("login.username")} />
            </div>
        </div>
    );
};
