import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAccount, mdiLock } from "@mdi/js";
import useAuth from "../hooks/useAuth";

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
        <>
            <form id="formLogin" action="/login" onSubmit={onSubmitHandler}>
                <label htmlFor="login_email">
                    <Icon path={mdiAccount} title="login_email" size={1}></Icon>
                    <input
                        type="email"
                        name="login_email"
                        id="login_email"
                        autoComplete="email"
                        ref={emailRef}
                        required
                    />
                </label>

                <label htmlFor="login_password">
                    <Icon path={mdiLock} title="login_password" size={1}></Icon>
                    <input
                        type="password"
                        name="login_password"
                        id="login_password"
                        autoComplete="current-password"
                        ref={passwordRef}
                        required
                    />
                </label>

                {responseMessage !== "" && <p>{responseMessage}</p>}

                <div>
                    {isLoading ? (
                        <div></div>
                    ) : (
                        <>
                            <button type="submit">Log In</button>
                        </>
                    )}
                </div>
            </form>
        </>
    );
}

export default Login;
