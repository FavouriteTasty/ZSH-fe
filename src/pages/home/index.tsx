import { motion } from "framer-motion";
import { FC } from "react";

import { HomeTable } from "./components/table";

export const Home: FC = () => {
    return (
        <motion.div
            className="w-screen h-screen"
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <HomeTable />
        </motion.div>
    );
};
