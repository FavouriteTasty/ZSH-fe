import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
} from "@heroui/react";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { api } from "@/api";

export const ExportExcel: FC<{ isOpen: boolean; onClose: () => void }> = (
    props,
) => {
    const { isOpen, onClose } = props;
    const { t } = useTranslation();
    const [periodList, setPeriodList] = useState<string[]>([]);
    const selectedPeriods = useRef<string[]>([]);

    const handleExportExcel = async (onClose: () => void) => {
        console.log("导出Excel", onClose, selectedPeriods.current);
    };

    const load = async () => {
        const res = await api.excel.period();
        setPeriodList(res.periodList);
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {t("exportExcel")}
                        </ModalHeader>
                        <ModalBody>
                            <Select
                                className="max-w-xs"
                                labelPlacement="outside"
                                label={t("SelectExportPeriod")}
                                placeholder={
                                    t("pleaseEnter") + t(`tableColumn.period`)
                                }
                                selectionMode="multiple"
                                onChange={(selectedItems) => {
                                    selectedPeriods.current =
                                        selectedItems.target.value
                                            .split(",")
                                            .map((s) => s.trim())
                                            .filter((s) => s.length > 0);
                                }}
                            >
                                {periodList.map((item) => (
                                    <SelectItem key={item}>{item}</SelectItem>
                                ))}
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                            >
                                {t("close")}
                            </Button>
                            <Button
                                color="primary"
                                onPress={() => {
                                    handleExportExcel(onClose);
                                }}
                            >
                                {t("confirm")}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
