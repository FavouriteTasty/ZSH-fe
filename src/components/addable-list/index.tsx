import { Button, Card, CardBody, DatePicker, Input } from "@heroui/react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { AddIcon, DeleteIcon } from "@/assets";
import { History } from "@/types/table";
import { calendarDate2Date, date2calenderDate } from "@/utils/date";
import { capitalizeUpper } from "@/utils/string";

interface AddableListProps {
    title: string;
}

export const AddableList: FC<AddableListProps> = (props) => {
    const { title } = props;
    const { t } = useTranslation();
    const [histories, setHistories] = useState<History[]>([
        {
            description: "test",
            date: new Date(),
        },
    ]);

    return (
        <div>
            <div className="text-sm mb-2">
                {capitalizeUpper(title)}
                <span className="ml-0.5 text-red-600">*</span>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
                {histories.map((history, index) => (
                    <Card
                        key={`${title}-addable-${index}`}
                        shadow="none"
                        isHoverable
                    >
                        <CardBody className="flex flex-row items-center gap-2">
                            <div className="flex flex-col gap-2">
                                <Input
                                    value={history.description}
                                    label={t("description")}
                                    onChange={(e) => {
                                        setHistories((prev) =>
                                            prev.map((item, i) =>
                                                i === index
                                                    ? {
                                                          ...item,
                                                          description:
                                                              e.target.value,
                                                      }
                                                    : item,
                                            ),
                                        );
                                    }}
                                />
                                <DatePicker
                                    value={date2calenderDate(history.date)}
                                    label={t("date")}
                                    onChange={(value) => {
                                        if (value !== null) {
                                            setHistories((prev) =>
                                                prev.map((item, i) =>
                                                    i === index
                                                        ? {
                                                              ...item,
                                                              date: calendarDate2Date(
                                                                  value,
                                                              ),
                                                          }
                                                        : item,
                                                ),
                                            );
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <Button
                                    variant="light"
                                    isIconOnly
                                    onPress={() => {
                                        setHistories((prev) =>
                                            prev.filter(
                                                (item) =>
                                                    item.description !==
                                                    history.description,
                                            ),
                                        );
                                    }}
                                >
                                    <DeleteIcon className="text-xl cursor-pointer text-gray-500" />
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                ))}
                <Button
                    variant="flat"
                    color="primary"
                    onPress={() => {
                        setHistories((prev) => [
                            ...prev,
                            {
                                description: "",
                                date: new Date(),
                            },
                        ]);
                    }}
                >
                    <AddIcon className="text-xl text-blue-500" />
                    <span>{t("addNew")}</span>
                </Button>
            </div>
        </div>
    );
};
