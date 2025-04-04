import { useEffect, useState } from "react";
import BaseComponents from "./BaseComponents.jsx";
import ResourceComponents from "./ResourceComponents.jsx";
import PodsDisplay from "./PodsDisplay.jsx";
import Icon from "@mdi/react";
import { mdiCalculator } from "@mdi/js";

function Form() {
    const [componentData, setComponentData] = useState([]);
    const [responseMessage, setResponseMessage] = useState("");
    const [podDataUpdateTrigger, setPodDataUpdateTrigger] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        try {
            const fetchComponentData = async () => {
                const response = await fetch(
                    "https://pricingportal.onrender.com/api/components",
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );

                const jsonResponse = await response.json();

                if (!response.ok) {
                    const { message } = jsonResponse;

                    setResponseMessage(message);

                    return;
                }

                const components = jsonResponse.components;

                setComponentData(components);

                return components;
            };

            fetchComponentData();
        } catch (err) {
            console.error(err);
        }
    }, [token]);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        const formData = new FormData(event.target);

        const formDataObject = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(
                "https://pricingportal.onrender.com/api/components",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(formDataObject),
                }
            );

            if (!response.ok) {
                throw new Error("Could not submit your component selection.");
            }

            await response.json();

            setPodDataUpdateTrigger((prev) => !prev);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h2>Component Selection</h2>
            <form
                action="/"
                method="POST"
                className="flex_col component-form roboto-medium"
                onSubmit={onSubmitHandler}
            >
                <BaseComponents componentData={componentData} />

                <ResourceComponents componentData={componentData} />

                {responseMessage !== "" && (
                    <p className="response-message">{responseMessage}</p>
                )}

                <div className="btn_container place-self-center">
                    {isLoading ? (
                        <div className="spinner"></div>
                    ) : (
                        <button className="btn" type="submit">
                            <Icon
                                path={mdiCalculator}
                                size={1}
                                title="Calculate price"
                            />
                        </button>
                    )}
                </div>
            </form>

            <section className="roboto-light">
                <PodsDisplay
                    componentData={componentData}
                    podDataUpdateTrigger={podDataUpdateTrigger}
                    setPodDataUpdateTrigger={setPodDataUpdateTrigger}
                />
            </section>
        </>
    );
}

export default Form;
