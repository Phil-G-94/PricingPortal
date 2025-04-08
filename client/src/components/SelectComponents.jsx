import { useEffect, useState } from "react";
import BaseComponents from "./BaseComponents.jsx";
import ResourceComponents from "./ResourceComponents.jsx";
import PodsDisplay from "./PodsDisplay.jsx";
import Icon from "@mdi/react";
import { mdiCalculator } from "@mdi/js";
import Loader from "./Loader.jsx";

function SelectComponents() {
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
        <section>
            <h2 className="text-2xl text-center">Component Selection</h2>
            <form
                action="/"
                method="POST"
                onSubmit={onSubmitHandler}
                className="border-2 p-4 flex flex-col gap-4 w-full max-w-xs mx-auto"
            >
                <BaseComponents componentData={componentData} />

                <ResourceComponents componentData={componentData} />

                {responseMessage !== "" && (
                    <p className="text-red-500">{responseMessage}</p>
                )}

                <div className="flex justify-center">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        <button
                            type="submit"
                            style={{ visibility: isLoading ? "hidden" : "visible" }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Icon
                                path={mdiCalculator}
                                size={2}
                                title="Calculate price"
                            />
                        </button>

                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
            </form>

            <section>
                <PodsDisplay
                    componentData={componentData}
                    podDataUpdateTrigger={podDataUpdateTrigger}
                    setPodDataUpdateTrigger={setPodDataUpdateTrigger}
                />
            </section>
        </section>
    );
}

export default SelectComponents;
