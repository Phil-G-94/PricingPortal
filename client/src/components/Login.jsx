import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAccount, mdiLock } from "@mdi/js";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { fetchAuth } = useAuth();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        const formData = new FormData(event.target);
        const formDataObject = Object.fromEntries(formData);

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formDataObject),
            });

            const jsonResponse = await response.json();

            if (!response.ok) {
                const { message } = jsonResponse;

                setIsLoading(false);

                console.log(message);

                if (message) {
                    setResponseMessage(message);
                }

                return;
            }

            await fetchAuth();

            navigate("/components");
        } catch (err) {
            console.error(err);
        } finally {
            emailRef.current.value = "";
            passwordRef.current.value = "";
            setIsLoading(false);
            setTimeout(() => {
                setResponseMessage(null);
            }, 6000);
        }
    };

    return (
        <form
            id="formLogin"
            action="/login"
            onSubmit={onSubmitHandler}
            className="p-4 flex flex-col items-center gap-4 w-full max-w-xs mx-auto"
        >
            <label htmlFor="login_email" className="flex flex-col w-full">
                <span className="flex items-center gap-2">
                    <Icon path={mdiAccount} title="login_email" size={1}></Icon>
                    Email
                </span>

                <input
                    type="email"
                    name="login_email"
                    id="login_email"
                    autoComplete="email"
                    ref={emailRef}
                    required
                    className="border-2 rounded-md p-2 w-full"
                />
            </label>

            <label htmlFor="login_password" className="flex flex-col w-full">
                <span className="flex items-center gap-2">
                    <Icon path={mdiLock} title="login_password" size={1}></Icon>
                    Password
                </span>

                <input
                    type="password"
                    name="login_password"
                    id="login_password"
                    autoComplete="current-password"
                    ref={passwordRef}
                    required
                    className="border-2 rounded-md p-2 w-full"
                />
            </label>

            <div className="flex justify-center">
                <div className="relative w-full h-12 flex items-center justify-center">
                    {responseMessage ? (
                        <p className="text-red-500">{responseMessage}</p>
                    ) : (
                        <>
                            <button
                                type="submit"
                                style={{
                                    visibility: isLoading ? "hidden" : "visible",
                                }}
                                className="bg-inevi_dark_purple text-inevi_white font-semibold text-lg px-4 py-2 rounded-md w-full active:bg-inevi_dark_lavender"
                            >
                                Log in
                            </button>
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Loader />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}

export default Login;
