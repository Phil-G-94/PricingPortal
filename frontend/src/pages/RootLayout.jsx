import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

function RootLayout() {
    const token = localStorage.getItem("token");

    if (!token) {
        return (
            /* removed className="flex_col" */
            <main>
                <Navigation />
                <Outlet />
            </main>
        );
    }

    return (
        /* removed className="flex_col" */
        <main>
            <Navigation />
            <Outlet />
        </main>
    );
}

export default RootLayout;
