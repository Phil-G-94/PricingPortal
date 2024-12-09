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
            <form
                action="/signup"
                className="flex_col_place_items_center signup-form"
                onSubmit={onSubmitHandler}
            >
                <label htmlFor="name" className="input-group">
                    <Icon
                        path={mdiBadgeAccount}
                        title="name"
                        size={1}
                        className="icon"
                    ></Icon>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="name..."
                        ref={nameRef}
                        required
                    />
                </label>
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
                        ref={emailRef}
                        required
                    />
                </label>
                <label htmlFor="password" className="input-group">
                    <Icon
                        path={mdiLock}
                        title="email"
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
                    <p className="response-message">
                        {responseMessage}
                    </p>
                )}

                <div className="btn_container">
                    {isLoading ? (
                        <div className="spinner"></div>
                    ) : (
                        <button className="btn" type="submit">
                            <p className="btn-text">Sign up</p>
                        </button>
                    )}
                </div>
            </form>
        </>
    );
}

export default Signup;
