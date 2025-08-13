import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";

import { History as HistoryType, MedicalHistory } from "@/types/table";

interface HistoryProps {
    history?: MedicalHistory;
}

export const History: FC<HistoryProps> = ({ history }) => {
    const { t } = useTranslation();
    if (history === undefined)
        return <div className="text-xs">{t("noData")}</div>;
    const showHistory = (histories: HistoryType[], key: string) => {
        return (
            <div className="flex gap-3 mb-4">
                {histories.length === 0 && t("noData")}
                {histories.map((item, index) => (
                    <Fragment key={`view-${key}-${index}`}>
                        <span>{`${item.date}, ${item.description}`}</span>
                        {index < histories.length - 1 && <span>|</span>}
                    </Fragment>
                ))}
            </div>
        );
    };

    return (
        <div>
            <div className="text-xs">{t("tableColumn.pastHistory")}</div>
            {showHistory(history.pastHistory, "pastHistory")}

            <div className="text-xs">{t("tableColumn.surgeryHistory")}</div>
            {showHistory(history.surgeryHistory, "surgeryHistory")}

            <div className="text-xs">{t("tableColumn.allergicHistory")}</div>
            {showHistory(history.allergicHistory, "allergicHistory")}

            <div className="text-xs">{t("tableColumn.vaccinationHistory")}</div>
            {showHistory(history.vaccinationHistory, "vaccinationHistory")}

            <div className="text-xs">
                {t("tableColumn.importantDrugHistory")}
            </div>
            {showHistory(history.importantDrugHistory, "importantDrugHistory")}

            <div className="text-xs">
                {t("tableColumn.bloodTransfusionHistory")}
            </div>
            {showHistory(
                history.bloodTransfusionHistory,
                "bloodTransfusionHistory",
            )}

            <div className="text-xs">{t("tableColumn.smokingHistory")}</div>
            {showHistory(history.smokingHistory, "smokingHistory")}

            <div className="text-xs">{t("tableColumn.drinkingHistory")}</div>
            {showHistory(history.drinkingHistory, "drinkingHistory")}

            <div className="text-xs">{t("tableColumn.menstrualHistory")}</div>
            {showHistory(history.menstrualHistory, "menstrualHistory")}

            <div className="text-xs">{t("tableColumn.maritalHistory")}</div>
            {showHistory(history.maritalHistory, "maritalHistory")}

            <div className="text-xs">{t("tableColumn.familyHistory")}</div>
            {showHistory(history.familyHistory, "familyHistory")}
        </div>
    );
};
