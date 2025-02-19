import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ComponentsPage from "./pages/ComponentsPage.jsx";
import Home from "./components/Home.jsx";
import RequireAuth from "./pages/RequireAuth.jsx";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route element={<RequireAuth />}>
                    <Route
                        path="components"
                        element={<ComponentsPage />}
                    />
                    <Route
                        path="pods/:podId"
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
