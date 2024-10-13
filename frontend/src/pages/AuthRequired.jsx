import { Navigate, Outlet } from "react-router-dom";

function AuthRequired() {
    const token = localStorage.getItem("token");
    const tokenExpiryDate = localStorage.getItem("tokenExpiry");

    const remainingTimeToExpiry =
        new Date(tokenExpiryDate).getTime() - new Date().getTime();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("tokenExpiryDate");
    };

    const autoLogout = (remainingTimeToExpiry) => {
        setTimeout(() => {
            logoutHandler();
        }, remainingTimeToExpiry);
    };

    autoLogout(remainingTimeToExpiry);

    console.log(remainingTimeToExpiry);
    console.log(token);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default AuthRequired;

/*
Removed code:

// import { useEffect, useState } from "react";
// const [jwtToken, setJwtToken] = useState(undefined);
// const [isAuth, setIsAuth] = useState(undefined);

// useEffect(() => {
//     if (!token && !isAuth) {
//         return;
//     }

//     setJwtToken(token);
//     setIsAuth(true);
// }, [token, isAuth]);
*/
