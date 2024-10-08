import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import { useEffect, useState } from "react";
import ComponentsPage from "./pages/ComponentsPage.jsx";
import AuthRequired from "./pages/AuthRequired.jsx";

function App() {
    const [jwtToken, setJwtToken] = useState(undefined);
    const [isAuth, setIsAuth] = useState(undefined);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiryDate = localStorage.getItem("tokenExpiry");
    const remainingTimeToExpiry =
        new Date(tokenExpiryDate).getTime() - new Date().getTime();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("tokenExpiryDate");
        setIsAuth(undefined);
        setJwtToken(undefined);
    };

    const autoLogout = (remainingTimeToExpiry) => {
        setTimeout(() => {
            return logoutHandler();
        }, remainingTimeToExpiry);
    };

    autoLogout(remainingTimeToExpiry);

    useEffect(() => {
        if (!token && !isAuth) {
            return;
        }

        setJwtToken(token);
        setIsAuth(true);
    }, [token, isAuth]);

    console.log(jwtToken);
    console.log(isAuth);
    console.log(remainingTimeToExpiry);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<LoginPage />}></Route>
                <Route path="login" element={<LoginPage />}></Route>
                <Route path="signup" element={<SignupPage />}></Route>
                <Route
                    element={
                        <AuthRequired
                            isUser={userId}
                            hasToken={jwtToken}
                            isAuth={isAuth}
                        />
                    }
                >
                    <Route
                        path="components"
                        element={<ComponentsPage />}
                    />
                </Route>
            </Route>
        )
    );

    return (
        <RouterProvider router={router}>
            <Navigation />
        </RouterProvider>
    );
}

export default App;
