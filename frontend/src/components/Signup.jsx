import { useRef } from "react";

function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formDataObject = Object.fromEntries(formData);

        try {
            const response = await fetch(
                "http://localhost:8080/signup",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formDataObject),
                }
            );

            if (!response.ok) {
                throw new Error("Could not complete signup.");
            }

            const data = await response.json();

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
            <h2>Sign up</h2>
            <form
                action="/signup"
                className="flex_col_items_content_center"
                onSubmit={onSubmitHandler}
            >
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

                <button type="submit">Sign up</button>
            </form>
        </>
    );
}

export default Signup;
