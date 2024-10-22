import { useRef, useState } from "react";

function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [responseMessage, setResponseMessage] = useState([]);

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
                return response.json().then((err) => {
                    const { data } = err;

                    setResponseMessage(data[0].msg);
                });
            }

            const data = await response.json();

            return data;
        } catch (err) {
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
                        required
                    />
                </label>

                <label htmlFor="password">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password..."
                        ref={passwordRef}
                        required
                    />
                </label>

                <p style={{ color: "black" }}>{responseMessage}</p>

                <button type="submit">Sign up</button>
            </form>
        </>
    );
}

export default Signup;
