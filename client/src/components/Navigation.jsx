import { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAlphaXBox, mdiMenu } from "@mdi/js";

function Navigation() {
    const [isOpen, setIsOpen] = useState("");

    return (
        <header className="flex justify-end md:flex-row">
            <nav className="m-2 p-1 text-center text-sm md:text-lg">
                <ul className="hidden list-none gap-6 md:flex md:flex-row">
                    <li>
                        <NavLink
                            to="/signup"
                            className="font-bold px-2 py-1 rounded-md hover:bg-inevi_dark_purple hover:text-inevi_white"
                        >
                            Sign up
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/login"
                            className="font-bold px-2 py-1 rounded-md hover:bg-inevi_dark_purple hover:text-inevi_white"
                        >
                            Log in
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            className="font-bold px-2 py-1 rounded-md hover:bg-inevi_dark_purple hover:text-inevi_white"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/components"
                            className="font-bold px-2 py-1 rounded-md hover:bg-inevi_dark_purple hover:text-inevi_white"
                        >
                            Quote Tool
                        </NavLink>
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
                    className={`md:hidden relative w-full z-10 transition-all duration-300 ${
                        isOpen
                            ? "opacity-100 visible pointer-events-auto"
                            : "opacity-0 invisible pointer-events-none"
                    }`}
                >
                    <li>
                        <NavLink
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="font-bold text-lg px-2 py-1 rounded-md active:bg-inevi_dark_purple active:text-inevi_white"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/signup"
                            onClick={() => setIsOpen(false)}
                            className="font-bold text-lg px-2 py-1 rounded-md active:bg-inevi_dark_purple active:text-inevi_white"
                        >
                            Sign up
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="font-bold text-lg px-2 py-1 rounded-md active:bg-inevi_dark_purple active:text-inevi_white"
                        >
                            Log in
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/components"
                            onClick={() => setIsOpen(false)}
                            className="font-bold text-lg px-2 py-1 rounded-md active:bg-inevi_dark_purple active:text-inevi_white"
                        >
                            Quote Tool
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navigation;
