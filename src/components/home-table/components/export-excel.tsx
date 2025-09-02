import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@heroui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const ExportExcel: FC<{ isOpen: boolean; onClose: () => void }> = (
    props,
) => {
    const { isOpen, onClose } = props;
    const { t } = useTranslation();

    const handleExportExcel = async (onClose: () => void) => {
        console.log("导出Excel", onClose);
    };

    return (
        <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {t("exportExcel")}
                        </ModalHeader>
                        <ModalBody>
                            <p>{t("exportExcelConfirm")}</p>
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
