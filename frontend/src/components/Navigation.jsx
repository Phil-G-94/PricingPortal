import { NavLink } from "react-router-dom";
import { isTokenExpired } from "../utils/token";

function Navigation() {
    const isExpired = isTokenExpired();

    return (
        <header>
            <nav className="navbar">
                {isExpired === undefined ? (
                    <ul className="nav-items flex_row_center">
                        <li>
                            <NavLink to="/signup"> Sign up </NavLink>
                        </li>
                        <li>
                            <NavLink to="/login"> Log in </NavLink>
                        </li>
                    </ul>
                ) : (
                    <ul className="nav-items flex_row_center">
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
