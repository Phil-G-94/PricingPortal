import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./App.css";
import Form from "./components/Form.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

import Navigation from "./components/Navigation.jsx";
import RootLayout from "./pages/RootLayout.jsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                { path: "/components", element: <Form /> },
                {
                    path: "signup",
                    element: <Signup />,
                },
                {
                    path: "login",
                    element: <Login />,
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
