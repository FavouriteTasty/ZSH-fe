import { Avatar } from "@heroui/react";
import { ChangeEvent, FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { CameraIcon } from "@/assets";
import { resizeImageToBase64 } from "@/utils/image";
import { capitalizeUpper } from "@/utils/string";

export interface AvatarUploaderProps {
    translateKey?: string;
    isRequired?: boolean;
    readonly?: boolean;
    hideLabel?: boolean;
    autoSize?: boolean;
    name?: string;
    defaultValue?: string;
}

export const AvatarUploader: FC<AvatarUploaderProps> = ({
    translateKey,
    readonly = false,
    isRequired = false,
    hideLabel = false,
    autoSize = false,
    name,
    defaultValue = null,
}) => {
    const { t } = useTranslation();
    const [base64String, setBase64String] = useState<string | null>(
        defaultValue,
    );
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const resizedBase64 = await resizeImageToBase64(file, 10 * 1024);
            setBase64String(resizedBase64);
        } catch (err) {
            console.error("Resize error:", err);
        }
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
            {base64String && (
                <input
                    type="string"
                    style={{ display: "none" }}
                    name={name}
                    value={base64String}
                    readOnly
                />
            )}
        </div>
    );
};
