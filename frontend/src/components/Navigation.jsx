import { NavLink } from "react-router-dom";

function Navigation() {
    return (
        <header>
            <nav>
                <ul
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        placeContent: "center",
                        gap: "2em",
                    }}
                >
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
