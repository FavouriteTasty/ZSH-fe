import { Navigate, Route, Routes } from "react-router";

import { Layout } from "./pages/layout";
import { Login } from "./pages/login";

import "@/i18n/config";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/login" replace />} />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
    );
}

export default App;
