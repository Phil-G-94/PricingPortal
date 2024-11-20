import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

function RootLayout() {
    const token = localStorage.getItem("token");

    if (!token) {
        return (
            <main>
                <Navigation />
                <Outlet />
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
