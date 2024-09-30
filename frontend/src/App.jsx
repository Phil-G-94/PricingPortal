import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./App.css";
import Form from "./components/Form.jsx";

import Navigation from "./components/Navigation.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                { index: true, element: <LoginPage /> },
                { path: "components", element: <Form /> },
                {
                    path: "signup",
                    element: <SignupPage />,
                },
                {
                    path: "login",
                    element: <LoginPage />,
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
