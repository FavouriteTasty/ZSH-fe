import { Navigate, Route, Routes } from "react-router";

import "./App.css";
import { Layout } from "./pages/layout";
import { Login } from "./pages/login";

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
