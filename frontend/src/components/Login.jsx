import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState("");

    const remainingMilliseconds = 60 * 60 * 1000;
    const tokenExpiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
    );

    const onSubmitHandler = async (event) => {
        event.preventDefault();

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

                console.log(message);

                return;
            }

            localStorage.setItem("token", jsonResponse.token);
            localStorage.setItem("userId", jsonResponse.userId);
            localStorage.setItem(
                "tokenExpiry",
                tokenExpiryDate.toISOString()
            );

            navigate("/components");

            return jsonResponse;
        } catch (err) {
            console.error(err);
        } finally {
            console.log(emailRef, passwordRef);
            emailRef.current.value = "";
            passwordRef.current.value = "";
        }
    };

    return (
        <>
            <h2>Log in</h2>
            <form
                action="/login"
                className="flex_col_items_content_center"
                onSubmit={onSubmitHandler}
            >
                <label htmlFor="email">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email..."
                        autoComplete="on"
                        ref={emailRef}
                    />
                </label>

                <label htmlFor="password">
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
                <button className="btn" type="submit">
                    Log in
                </button>
            </form>
        </>
    );
}

export default Login;
