import { FC } from "react";
import { Outlet } from "react-router";

export const Layout: FC = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};
