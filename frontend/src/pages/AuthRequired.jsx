import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

function AuthRequired({ isUser, isAuth, hasToken }) {
    const isLoggedIn = isUser && isAuth && hasToken;

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

AuthRequired.propTypes = {
    isAuth: PropTypes.bool || undefined,
    hasToken: PropTypes.string || undefined,
    isUser: PropTypes.string,
};

export default AuthRequired;
