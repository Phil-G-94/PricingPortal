import { Outlet } from "react-router-dom";
import { isTokenExpired } from "../utils/token";
import Navigation from "../components/Navigation";
import LoginPage from "./LoginPage";

function RootLayout() {
    if (isTokenExpired()) {
        return (
            <main>
                <Navigation />
                <LoginPage />
            </main>
        );
    }

    return (
        <main>
            <Navigation />
            <Outlet />
        </main>
    );
}

export default RootLayout;
