import { NavLink } from "react-router-dom";

function Navigation() {
    return (
        <header>
            <nav>
                <ul className="nav flex_row_center">
                    <li>
                        <NavLink to="/signup"> Sign up </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login"> Log in </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navigation;
