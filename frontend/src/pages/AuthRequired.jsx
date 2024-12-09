import { isTokenExpired } from "../utils/token";
import { Navigate, Outlet } from "react-router-dom";

function AuthRequired() {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (isTokenExpired()) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default AuthRequired;
