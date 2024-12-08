import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

function AuthRequired() {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const isTokenExpired = () => {
        try {
            // decode token
            const decoded = jwtDecode(token);
            // check if expired
            return Date.now() >= decoded.exp * 1000;
        } catch (err) {
            console.error("Invalid token: " + err);
            return true; // treat expired tokens as invalid
        }
    };

    if (isTokenExpired()) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        return <Navigate to="/login" replace />;
    }

    console.log(isTokenExpired());

    return <Outlet />;
}

export default AuthRequired;
