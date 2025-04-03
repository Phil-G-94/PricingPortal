import { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAlphaXBox, mdiMenu } from "@mdi/js";

function Navigation() {
    const [isOpen, setIsOpen] = useState("");

    return (
        <header className="flex justify-end-safe md:flex-row p-6">
            <nav className="m-2 border-2">
                <ul className="hidden list-none gap-6 md:flex md:flex-row">
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

                <span className="flex justify-center">
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <Icon
                                path={mdiAlphaXBox}
                                size={2}
                                className="text-inevi_dark_purple"
                            />
                        ) : (
                            <Icon
                                path={mdiMenu}
                                size={2}
                                className="text-inevi_dark_purple"
                            />
                        )}
                    </button>
                </span>

                <ul
                    className={`md:hidden relative transition-all ${
                        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                >
                    <li>
                        <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                            Sign up
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" onClick={() => setIsOpen(false)}>
                            Log in
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/components" onClick={() => setIsOpen(false)}>
                            Components Page
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navigation;
