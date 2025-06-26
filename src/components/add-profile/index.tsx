import { Button, Form } from "@heroui/react";
import { motion } from "framer-motion";
import { FC, FormEvent } from "react";
import { useTranslation } from "react-i18next";

import { FormItem } from "../form-item";
import { AvatarUploader } from "./components/upload-avatar";

interface AddProfileProps {
    setFinishedTab: () => void;
}

export const AddProfile: FC<AddProfileProps> = ({ setFinishedTab }) => {
    const { t } = useTranslation();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        console.log(data);
        setFinishedTab?.();
    };

    return (
        <motion.div
            className="w-full p-2"
            key="add-profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Form
                className="space-y-4 flex-wrap flex-row gap-[5%]"
                onSubmit={onSubmit}
            >
                <AvatarUploader />
                <FormItem type="text" objectKey="name" />
                <FormItem
                    type="select"
                    objectKey="sex"
                    pairs={[
                        { key: "male", value: t("male") },
                        { key: "female", value: t("female") },
                    ]}
                />
                <FormItem type="text" objectKey="ethnicity" />
                <FormItem type="number" objectKey="age" />
                <FormItem type="date" objectKey="birth" />
                <FormItem type="text" objectKey="country" />
                <FormItem type="text" objectKey="job" />
                <FormItem type="text" objectKey="maritalStatus" />
                <FormItem type="text" objectKey="nativePlace" />
                <FormItem type="text" objectKey="address" />
                <FormItem type="text" objectKey="phone" />
                <FormItem type="text" objectKey="contact" />
                <FormItem type="text" objectKey="relation" />
                <FormItem type="text" objectKey="contactPhone" />
                <div className="w-full flex justify-end">
                    <Button type="submit" variant="flat" color="primary">
                        {t("submit")}
                    </Button>
                </div>
            </Form>
        </motion.div>
    );
};
