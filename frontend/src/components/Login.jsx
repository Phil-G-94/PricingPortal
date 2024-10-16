import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

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
                "http://localhost:8080/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formDataObject),
                }
            );

            if (!response.ok) {
                throw new Error("Could not complete login.");
            }

            const data = await response.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem(
                "tokenExpiry",
                tokenExpiryDate.toISOString()
            );

            navigate("/components");

            return data;
        } catch (err) {
            if (!(err instanceof Error)) {
                const error = new Error(err);

                console.error(error.message);
            }
            console.error(err);
        } finally {
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

                <button type="submit">Log in</button>
            </form>
        </>
    );
}

export default Login;
