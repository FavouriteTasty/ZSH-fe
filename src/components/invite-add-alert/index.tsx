import {
    Button,
    Form,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Snippet,
} from "@heroui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { GenerateResponse } from "@/types/invite-add";
interface PatientData {
    patientName: string;
    patientID: string;
}
interface InviteAddAlertProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function InviteAddAlert({
    isOpen,
    onClose,
}: InviteAddAlertProps) {
    const { t } = useTranslation();
    const [genRes, setGenRes] = useState<GenerateResponse | null>(null);
    return (
        <Modal
            isOpen={isOpen}
            size="xl"
            onClose={() => {
                setGenRes(null);
                onClose();
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {t("inviteAdd.title")}
                        </ModalHeader>
                        <ModalBody>
                            <Form
                                className="w-full  flex flex-col gap-4 pb-4"
                                onReset={() => {
                                    setGenRes(null);
                                }}
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const data = Object.fromEntries(
                                        new FormData(e.currentTarget),
                                    ) as unknown as PatientData;
                                    console.log(data);
                                    const mockRes: GenerateResponse =
                                        Math.random() > 0.5
                                            ? {
                                                  code: 200,
                                                  message: `https://example.com/invite/${data.patientID}`,
                                              }
                                            : {
                                                  code: 100,
                                                  message: `生成失败`,
                                              };
                                    setGenRes(mockRes);
                                }}
                            >
                                <Input
                                    isRequired
                                    errorMessage={t(
                                        "inviteAdd.patientNameErrorMsg",
                                    )}
                                    label={t("inviteAdd.patientName")}
                                    labelPlacement="outside"
                                    name="patientName"
                                    placeholder={t(
                                        "inviteAdd.patientNamePlaceholder",
                                    )}
                                    type="text"
                                />

                                <Input
                                    isRequired
                                    errorMessage={t(
                                        "inviteAdd.patientIDErrorMsg",
                                    )}
                                    label={t("inviteAdd.patientID")}
                                    labelPlacement="outside"
                                    name="patientID"
                                    placeholder={t(
                                        "inviteAdd.patientIDPlaceholder",
                                    )}
                                    type="text"
                                />
                                {genRes !== null && (
                                    <div className="w-full gap-3 flex flex-col">
                                        <p className="text-sm ">
                                            {t("inviteAdd.shareLink")}
                                        </p>
                                        <Snippet
                                            symbol=""
                                            color={
                                                genRes.code === 200
                                                    ? "success"
                                                    : "danger"
                                            }
                                            className="w-full"
                                            tooltipProps={{
                                                content:
                                                    t("inviteAdd.copyLink"),
                                            }}
                                        >
                                            {genRes.message}
                                        </Snippet>
                                    </div>
                                )}
                                <div className="flex gap-2 justify-around w-full">
                                    <Button color="primary" type="submit">
                                        {t("inviteAdd.submit")}
                                    </Button>
                                    <Button type="reset" variant="flat">
                                        {t("inviteAdd.reset")}
                                    </Button>
                                    <Button
                                        type="button"
                                        color="danger"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        {t("inviteAdd.close")}
                                    </Button>
                                </div>
                            </Form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
