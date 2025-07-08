import { Avatar } from "@heroui/react";
import { ChangeEvent, FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { CameraIcon } from "@/assets";
import { capitalizeUpper } from "@/utils/string";

export interface AvatarUploaderProps {
    translateKey?: string;
    isRequired?: boolean;
}

export const AvatarUploader: FC<AvatarUploaderProps> = ({
    translateKey,
    isRequired = false,
}) => {
    const { t } = useTranslation();
    const [base64String, setBase64String] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            const result = event.target?.result as string;
            setBase64String(result);
        };

        reader.onerror = (error) => {
            console.error("Error reading file:", error);
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className="w-full flex items-center">
            <div className="mr-4 text-sm">
                {capitalizeUpper(t(translateKey ?? "tableColumn.avatar"))}
                {isRequired && <span className="ml-0.5 text-red-500">*</span>}
            </div>
            <Avatar
                className="h-24 w-24 cursor-pointer"
                radius="md"
                showFallback
                fallback={
                    <CameraIcon
                        className="animate-pulse w-14 h-14 text-default-500"
                        fill="currentColor"
                    />
                }
                onClick={() => {
                    inputRef.current?.click();
                }}
                src={base64String ?? ""}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: "none" }}
                ref={inputRef}
            />
        </div>
    );
};
