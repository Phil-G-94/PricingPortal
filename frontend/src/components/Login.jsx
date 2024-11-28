import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAccount, mdiLock } from "@mdi/js";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const remainingMilliseconds = 60 * 60 * 1000;
    const tokenExpiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
    );

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
                    body: JSON.stringify(formDataObject),
                }
            );

            const jsonResponse = await response.json();

            if (!response.ok) {
                const { message } = jsonResponse;

                if (message) {
                    setResponseMessage(message);
                }

                return;
            }

            localStorage.setItem("token", jsonResponse.token);
            localStorage.setItem("userId", jsonResponse.userId);
            localStorage.setItem(
                "tokenExpiry",
                tokenExpiryDate.toISOString()
            );

            navigate("/components");
        } catch (err) {
            console.error(err);
        } finally {
            emailRef.current.value = "";
            passwordRef.current.value = "";
        }
    };

    return (
        <>
            <form
                action="/login"
                className="flex_col_items_content_center login-form"
                onSubmit={onSubmitHandler}
            >
                <label htmlFor="email" className="input-group">
                    <Icon
                        path={mdiAccount}
                        title="email"
                        size={1}
                        className="icon"
                    ></Icon>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email..."
                        autoComplete="on"
                        ref={emailRef}
                    />
                </label>

                <label htmlFor="password" className="input-group">
                    <Icon
                        path={mdiLock}
                        title="password"
                        size={1}
                        className="icon"
                    ></Icon>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password..."
                        autoComplete="on"
                        ref={passwordRef}
                    />
                </label>

                {responseMessage && (
                    <p className="response-message">
                        {responseMessage}
                    </p>
                )}

                {isLoading ? (
                    <div className="spinner"></div>
                ) : (
                    <button className="btn" type="submit">
                        Log in
                    </button>
                )}
            </form>
        </>
    );
}

export default Login;
