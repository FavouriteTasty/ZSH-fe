import { FC } from "react";
import { Outlet } from "react-router";

import { Header } from "@/components/header";

export const Layout: FC = () => {
    return (
        <div className="h-screen w-screen flex flex-col">
            <Header />
            <Outlet />
        </div>
    );
};
