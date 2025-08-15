import { TFunction } from "i18next";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { ViewItem, ViewItemProps } from "@/components/view-item";
import { UserProfile } from "@/types/table";

interface IntroductionProps {
    userProfile?: UserProfile;
    className?: string;
}

const generate = (userProfile: UserProfile, t: TFunction): ViewItemProps[] => [
    {
        type: "text",
        objectKey: "name",
        value: userProfile.name,
    },
    {
        type: "text",
        objectKey: "id",
        value: userProfile.id,
    },
    {
        type: "text",
        objectKey: "sex",
        value: t(userProfile.sex),
    },
    {
        type: "text",
        objectKey: "ethnicity",
        value: userProfile.ethnicity,
    },
    {
        type: "number",
        objectKey: "age",
        value: userProfile.age,
    },
    {
        type: "text",
        objectKey: "birth",
        value: userProfile.birth,
    },
    {
        type: "text",
        objectKey: "country",
        value: userProfile.country,
    },
    {
        type: "text",
        objectKey: "job",
        value: userProfile.job,
    },
    {
        type: "text",
        objectKey: "maritalStatus",
        value: t(userProfile.maritalStatus),
    },
    {
        type: "text",
        objectKey: "nativePlace",
        value: userProfile.nativePlace,
    },
    {
        type: "text",
        objectKey: "address",
        value: userProfile.address,
    },
    {
        type: "text",
        objectKey: "phone",
        value: userProfile.phone,
    },
    {
        type: "text",
        objectKey: "contact",
        value: userProfile.contact,
    },
    {
        type: "text",
        objectKey: "relation",
        value: userProfile.relation,
    },
    {
        type: "text",
        objectKey: "contactPhone",
        value: userProfile.contactPhone,
    },
];

export const Introduction: FC<IntroductionProps> = (props) => {
    const { userProfile, className } = props;
    const { t } = useTranslation();
    if (userProfile === undefined)
        return <div className="text-xs">{t("noData")}</div>;
    const config = generate(userProfile, t);

    return (
        <div className={twMerge("flex w-full", className)}>
            <div className="flex flex-wrap gap-y-4 w-2/3">
                {config.map((item, index) => (
                    <ViewItem
                        className="flex-1/2"
                        {...item}
                        key={`view-introduction-${index}`}
                    />
                ))}
            </div>
            <div className="flex-1 pl-2 pr-32 max-h-64">
                <ViewItem
                    type="avatar"
                    objectKey="avatar"
                    value={userProfile.avatar}
                />
            </div>
        </div>
    );
};
