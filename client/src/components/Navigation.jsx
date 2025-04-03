import { NavLink } from "react-router-dom";

function Navigation() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/signup"> Sign up </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login"> Log in </NavLink>
                    </li>
                    <li>
                        <NavLink to="/components">Components Page</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navigation;
