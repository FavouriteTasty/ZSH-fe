import { Alert } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect } from "react";

import { $UI } from "@/store/ui";

export const GlobalAlert: FC = () => {
    const color = $UI.use((state) => state.alertColor);
    const title = $UI.use((state) => state.alertTitle);
    const show = $UI.use((state) => state.alertShow);

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                $UI.update("closeAlert", (draft) => {
                    draft.alertShow = false;
                });
            }, 3000);
        }
    }, [show]);

    return (
        <motion.div className="fixed flex items-center justify-center w-screen top-[5%] z-[9999] select-none pointer-events-none">
            <AnimatePresence>
                {show && (
                    <motion.div
                        className="max-w-[40vw]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <Alert color={color} title={title} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
