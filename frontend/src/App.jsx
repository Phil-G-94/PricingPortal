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
import AuthRequired from "./pages/AuthRequired.jsx";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<LoginPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route element={<AuthRequired />}>
                    <Route
                        index
                        path="components"
                        element={<ComponentsPage />}
                    />
                    <Route
                        path="/pods/:podId"
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
