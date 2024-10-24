import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

function RootLayout() {
    const token = localStorage.getItem("token");

    if (!token) {
        return (
            <main className="flex_col">
                <Navigation />
                <Outlet />
            </main>
        );
    }

    return (
        <main className="flex_col">
            <Navigation />
            <Outlet />
        </main>
    );
}

export default RootLayout;
