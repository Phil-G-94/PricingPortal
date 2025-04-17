import { useNavigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

function RequireAuth() {
    const { isAuthed, loadingAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (loadingAuth) return;

        if (!isAuthed) {
            navigate("/", {
                state: location.pathname,
                replace: true,
            });
        }
    }, [isAuthed, loadingAuth, navigate, location.pathname]);

    return isAuthed ? <Outlet /> : null;
}

export default RequireAuth;
