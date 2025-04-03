import { useRef, useState } from "react";
import Icon from "@mdi/react";
import { mdiBadgeAccount, mdiAccount, mdiLock } from "@mdi/js";

function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [responseMessage, setResponseMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        const formData = new FormData(event.target);
        const formDataObject = Object.fromEntries(formData);

        try {
            const response = await fetch(
                "https://pricingportal.onrender.com/signup",
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
                const { data } = jsonResponse;

                if (data && data[0].msg) {
                    setResponseMessage(data[0].msg);
                }

                return;
            }
        } catch (err) {
            console.error(err);
        } finally {
            nameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
            setIsLoading(false);
            setTimeout(() => {
                setResponseMessage("");
            }, 6000);
        }
    };

    return (
        <>
            <form id="formSignup" action="/signup" onSubmit={onSubmitHandler}>
                <label htmlFor="signup_name">
                    <Icon path={mdiBadgeAccount} title="name" size={1}></Icon>
                    <input
                        type="text"
                        name="signup_name"
                        id="signup_name"
                        autoComplete="name"
                        ref={nameRef}
                        required
                    />
                </label>
                <label htmlFor="signup_email">
                    <Icon path={mdiAccount} title="email" size={1}></Icon>
                    <input
                        type="email"
                        name="signup_email"
                        id="signup_email"
                        autoComplete="username"
                        ref={emailRef}
                        required
                    />
                </label>
                <label htmlFor="signup_password">
                    <Icon path={mdiLock} title="email" size={1}></Icon>
                    <input
                        type="password"
                        name="signup_password"
                        id="signup_password"
                        autoComplete="new-password"
                        ref={passwordRef}
                        required
                    />
                </label>
                {responseMessage !== "" && <p>{responseMessage}</p>}

                <div>
                    {isLoading ? (
                        <div></div>
                    ) : (
                        <button type="submit">Sign up</button>
                    )}
                </div>
            </form>
        </>
    );
}

export default Signup;
