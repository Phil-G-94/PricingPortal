import { Outlet } from "react-router-dom";
import { isTokenExpired } from "../utils/token";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RootLayout() {
    const navigate = useNavigate();

    const isExpired = isTokenExpired();

    useEffect(() => {
        if (isExpired === true || isExpired === undefined) {
            return navigate("/login");
        }
    }, [navigate, isExpired]);

    return (
        <main>
            <Navigation />
            <Outlet />
        </main>
    );
}

export default RootLayout;
