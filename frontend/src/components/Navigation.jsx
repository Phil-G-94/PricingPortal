import { NavLink } from "react-router-dom";

function Navigation() {
    return (
        <header>
            <nav className="navbar">
                <ul className="nav-items flex_row_center">
                    <li>
                        <NavLink to="/signup"> Sign up </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login"> Log in </NavLink>
                    </li>
                    <li>
                        <NavLink to="/components">
                            Components Page
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navigation;
