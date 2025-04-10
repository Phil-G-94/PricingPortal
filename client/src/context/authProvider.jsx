import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "./authCtx";

function AuthProvider({ children }) {
    const [isAuthed, setIsAuthed] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true);

    const fetchAuth = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/check-auth", {
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                setIsAuthed(true);
            } else {
                setIsAuthed(false);
            }
        } catch (error) {
            throw new Error("Failed to confirm authentication status.", {
                cause: error,
            });
        } finally {
            setLoadingAuth(false);
        }
    };

    useEffect(() => {
        fetchAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthed, loadingAuth, fetchAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
