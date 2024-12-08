import { jwtDecode } from "jwt-decode";

const isTokenExpired = () => {
    const token = localStorage.getItem("token");

    try {
        // decode token
        const decoded = jwtDecode(token);
        // check if expired
        return Date.now() >= decoded.exp * 1000;
    } catch (err) {
        console.error("Invalid token: " + err);
        return true; // treat expired tokens as invalid
    }
};

export { isTokenExpired };
