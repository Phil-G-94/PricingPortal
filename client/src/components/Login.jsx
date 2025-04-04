import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAccount, mdiLock } from "@mdi/js";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

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
            const response = await fetch(
                "https://pricingportal.onrender.com/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(formDataObject),
                }
            );

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
            className="border-2 p-4 flex flex-col items-center gap-4 w-full max-w-xs mx-auto"
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

            {responseMessage !== "" && (
                <p className="text-red-500">{responseMessage}</p>
            )}

            <div className="w-full flex justify-center">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <button
                            type="submit"
                            className="bg-inevi_dark_purple text-white text-lg px-4 py-2 rounded-md w-full"
                        >
                            Log In
                        </button>
                    </>
                )}
            </div>
        </form>
    );
}

export default Login;
