import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAccount, mdiLock } from "@mdi/js";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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

                setIsLoading(false);

                console.log(message);

                if (message) {
                    setResponseMessage(message);
                }

                return;
            }

            localStorage.setItem("token", jsonResponse.token);
            localStorage.setItem("userId", jsonResponse.userId);

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
            <form
                action="/login"
                className="flex_col_place_items_center login-form"
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
                        required
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
                        required
                    />
                </label>

                {responseMessage !== "" && (
                    <p className="response-message centered-text">
                        {responseMessage}
                    </p>
                )}

                <div className="btn_container">
                    {isLoading ? (
                        <div className="spinner"></div>
                    ) : (
                        <>
                            <button className="btn" type="submit">
                                <p className="btn-text">Log In</p>
                            </button>
                        </>
                    )}
                </div>
            </form>
        </>
    );
}

export default Login;
