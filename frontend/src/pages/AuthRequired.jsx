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

    return <Outlet />;

    // const token = localStorage.getItem("token");
    // const tokenExpiryDate = localStorage.getItem("tokenExpiry");

    // const remainingTimeToExpiry =
    //     new Date(tokenExpiryDate).getTime() - new Date().getTime();

    // const isTokenExpired = () => {
    //     // decode token
    //     const decoded = jwtDecode(token);
    //     // true if expired, false if not
    //     return Date.now() >= decoded.exp * 1000;
    // };

    // const logoutHandler = () => {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("userId");
    //     localStorage.removeItem("tokenExpiryDate");
    // };

    // const autoLogout = (remainingTimeToExpiry) => {
    //     setTimeout(() => {
    //         logoutHandler();
    //     }, remainingTimeToExpiry);
    // };

    // autoLogout(remainingTimeToExpiry);

    // if (!isTokenExpired) {
    //     return <Navigate to="/login" />;
    // }

    // return <Outlet />;
}

export default AuthRequired;
