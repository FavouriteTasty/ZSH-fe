import { Avatar } from "@heroui/react";
import { ChangeEvent, FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { CameraIcon } from "@/assets";
import { capitalizeUpper } from "@/utils/string";

export interface AvatarUploaderProps {
    translateKey?: string;
    isRequired?: boolean;
    readonly?: boolean;
    hideLabel?: boolean;
    autoSize?: boolean;
}

export const AvatarUploader: FC<AvatarUploaderProps> = ({
    translateKey,
    readonly = false,
    isRequired = false,
    hideLabel = false,
    autoSize = false,
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
        <div className="w-full h-full flex items-center">
            {!hideLabel && (
                <div className="mr-4 text-sm">
                    {capitalizeUpper(t(translateKey ?? "tableColumn.avatar"))}
                    {isRequired && (
                        <span className="ml-0.5 text-red-500">*</span>
                    )}
                </div>
            )}
            <Avatar
                className={twMerge(
                    !readonly && "cursor-pointer",
                    autoSize ? "h-full w-full" : "h-24 w-24",
                )}
                radius="md"
                showFallback
                fallback={
                    <CameraIcon
                        className={twMerge(
                            "w-14 h-14 text-default-500",
                            !readonly && "animate-pulse",
                        )}
                        fill="currentColor"
                    />
                }
                onClick={() => {
                    if (readonly) return;
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
