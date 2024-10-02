import { useRef } from "react";
// import { useNavigate } from "react-router-dom";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    // const navigate = useNavigate();

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

            // retrieve token and userId
            const data = await response.json();

            // set in localStorage with corresponding keys
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);

            // navigate("/components");

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
            <form action="/login" onSubmit={onSubmitHandler}>
                <label htmlFor="email">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email..."
                        ref={emailRef}
                    />
                </label>

                <label htmlFor="password">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password..."
                        ref={passwordRef}
                    />
                </label>

                <button type="submit">Log in</button>
            </form>
        </>
    );
}

export default Login;
