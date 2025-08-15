import { Button, Checkbox, Image, Input } from "@heroui/react";
import { motion } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { api } from "@/api";
import { $User } from "@/store/user";
import { logger } from "@/utils/alert";

export const Login: FC = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const selected = useRef<boolean>(true);
    const login = $User.use((state) => state.login);

    const navigate = useNavigate();

    useEffect(() => {
        if (login) {
            navigate("/home");
        }
    }, [login]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await api.login.login({ username, password });
            logger.success(t("LoginSuccess"));
            $User.update("login", (draft) => {
                draft.login = true;
                draft.accessToken = res.accessToken;
                draft.refreshToken = res.refreshToken;
            });
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            navigate("/home");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (username.length > 0 && password.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [username, password]);

    return (
        <motion.div
            className="h-[calc(100vh-64px)] flex items-center justify-center"
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="flex flex-col items-center justify-center w-96">
                <Image className="mb-4" src="/logo.png" width={50} />
                <div className="text-2xl mb-4 font-medium">
                    {t("login.title")}
                </div>
                <Input
                    className="mb-3"
                    placeholder={t("login.username")}
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <Input
                    className="mb-3"
                    placeholder={t("login.password")}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    type="password"
                />
                <Checkbox
                    defaultSelected
                    className="my-2"
                    onChange={() => (selected.current = !selected.current)}
                >
                    {t("NoLoginRequired", { num: 30 })}
                </Checkbox>
                <Button
                    className="w-full bg-black text-white font-medium mb-[200px]"
                    onPress={handleSubmit}
                    isDisabled={disabled}
                    isLoading={loading}
                >
                    {t("login.submit")}
                </Button>
            </div>
        </motion.div>
    );
};
