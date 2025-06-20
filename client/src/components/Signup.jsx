import { useRef, useState } from "react";
import Icon from "@mdi/react";
import { mdiBadgeAccount, mdiAccount, mdiLock } from "@mdi/js";
import Loader from "./Loader";

const API_BASE_URL = import.meta.env.VITE_API_URL;

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
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject),
      });

      const jsonResponse = await response.json();

      if (!response.ok) {
        const { data } = jsonResponse;

        if (data && data[0].msg) {
          setResponseMessage(data[0].msg);
        }

        console.log(data);

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
    <form
      id="formSignup"
      action="/signup"
      onSubmit={onSubmitHandler}
      className="p-4 flex flex-col items-center gap-4 w-full max-w-xs mx-auto"
    >
      <label htmlFor="signup_name" className="flex flex-col w-full">
        <span className="flex items-center gap-2">
          <Icon path={mdiBadgeAccount} title="name" size={1}></Icon>
          Name
        </span>
        <input
          type="text"
          name="signup_name"
          id="signup_name"
          autoComplete="name"
          ref={nameRef}
          required
          className="border-2 rounded-md p-2 w-full"
        />
      </label>

      <label htmlFor="signup_email" className="flex flex-col w-full">
        <span className="flex items-center gap-2">
          <Icon path={mdiAccount} title="email" size={1}></Icon>
          Email
        </span>
        <input
          type="email"
          name="signup_email"
          id="signup_email"
          autoComplete="username"
          ref={emailRef}
          required
          className="border-2 rounded-md p-2 w-full"
        />
      </label>

      <label htmlFor="signup_password" className="flex flex-col w-full">
        <span className="flex items-center gap-2">
          <Icon path={mdiLock} title="password" size={1}></Icon>
          Password
        </span>
        <input
          type="password"
          name="signup_password"
          id="signup_password"
          autoComplete="new-password"
          ref={passwordRef}
          required
          className="border-2 rounded-md p-2 w-full"
        />
      </label>

      <div className="flex justify-center">
        <div className="relative w-full h-12 flex items-center justify-center">
          {responseMessage ? (
            <p className="text-red-500">{responseMessage}</p>
          ) : (
            <>
              <button
                type="submit"
                style={{
                  visibility: isLoading ? "hidden" : "visible",
                }}
                className="bg-inevi_dark_purple text-inevi_white font-semibold text-lg px-4 py-2 rounded-md w-full active:bg-inevi_dark_lavender"
              >
                Sign up
              </button>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </form>
  );
}

export default Signup;
