// import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { isTokenExpired } from "../utils/token";

function Navigation() {
    // let isLoggenIn = false;

    const token = localStorage.getItem("token");

    console.log(token);

    const validToken = isTokenExpired(token);

    console.log(validToken);

    return (
        <header className="centred-text">
            <nav>
                {validToken ? (
                    <ul className="nav flex_row_center">
                        <li>
                            <NavLink to="/signup"> Sign up </NavLink>
                        </li>
                        <li>
                            <NavLink to="/login"> Log in </NavLink>
                        </li>
                    </ul>
                ) : (
                    <ul className="nav flex_row_center">
                        <li>
                            <NavLink to="/components">
                                Components Page
                            </NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
}

export default Navigation;
