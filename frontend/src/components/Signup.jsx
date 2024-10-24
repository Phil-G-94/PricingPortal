import { useRef, useState } from "react";

function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [responseMessage, setResponseMessage] = useState("");

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

            const jsonResponse = await response.json();

            if (!response.ok) {
                const { data } = jsonResponse;

                if (data && data[0].msg) {
                    setResponseMessage(data[0].msg);
                }
            }

            return jsonResponse;
        } catch (err) {
            console.error(err);
        } finally {
            emailRef.current.value = "";
            passwordRef.current.value = "";
            setTimeout(() => {
                setResponseMessage("");
            }, 6000);
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

                {responseMessage !== "" && <p>{responseMessage}</p>}

                <button type="submit">Sign up</button>
            </form>
        </>
    );
}

export default Signup;
