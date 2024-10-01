import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import "./App.css";
import Form from "./components/Form.jsx";
import Navigation from "./components/Navigation.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import { useEffect, useState } from "react";

function App() {
    const [jwtToken, setJwtToken] = useState(undefined);
    const [isAuth, setIsAuth] = useState(undefined);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            setJwtToken(token);
        }

        setIsAuth(true);
    }, [token]);

    console.log(isAuth);
    console.log(jwtToken);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                { index: true, element: <LoginPage /> },

                {
                    path: "signup",
                    element: <SignupPage />,
                },
                {
                    path: "login",
                    element: <LoginPage />,
                },
                {
                    path: "components",
                    element: <Form />,
                    loader: () => {
                        if (!isAuth) return redirect("/");
                        return null;
                    },
                },
            ],
        },
    ]);

    return (
        <RouterProvider router={router}>
            <Navigation />
        </RouterProvider>
    );
}

export default App;
