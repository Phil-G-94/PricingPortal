// import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
    // let isLoggenIn = false;

    const token = localStorage.getItem("token");

    return (
        <header className="centred-text">
            <nav>
                {token === null ? (
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
