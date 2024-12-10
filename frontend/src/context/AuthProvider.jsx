import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken !== token) {
            setToken(storedToken);
        }
    }, [token]);
    return (
        <AuthContext.Provider value={{ token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
