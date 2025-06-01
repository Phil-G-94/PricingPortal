import { useEffect, useState } from "react";
import BaseComponents from "./BaseComponents.jsx";
import ResourceComponents from "./ResourceComponents.jsx";
import PodsDisplay from "./PodsDisplay.jsx";
import Icon from "@mdi/react";
import { mdiCalculator } from "@mdi/js";
import Loader from "./Loader.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function SelectComponents() {
    const [componentData, setComponentData] = useState({});
    const [responseMessage, setResponseMessage] = useState("");
    const [podDataUpdateTrigger, setPodDataUpdateTrigger] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        try {
            const fetchComponentData = async () => {
                const response = await fetch(`${API_BASE_URL}/api/components`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

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
    }, []);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        const formData = new FormData(event.target);

        const formDataObject = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${API_BASE_URL}/api/components`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formDataObject),
            });

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
        <section className="container mx-auto">
            <h1 className="text-4xl text-center">Quote Tool</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <section>
                    <h2 className="text-center text-2xl">Component Selector</h2>
                    <form
                        action="/"
                        method="POST"
                        onSubmit={onSubmitHandler}
                        className="mx-2 p-4 flex flex-col gap-4 "
                    >
                        <div className="grid grid-rows-1">
                            <BaseComponents
                                componentData={componentData?.baseComponents}
                            />

                            <ResourceComponents
                                componentData={componentData?.resourceComponents}
                            />
                        </div>

                        {responseMessage !== "" && (
                            <p className="text-red-500 text-center">
                                {responseMessage}
                            </p>
                        )}

                        <div className="flex justify-center">
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                <button
                                    type="submit"
                                    style={{
                                        visibility: isLoading ? "hidden" : "visible",
                                    }}
                                    className="absolute inset-0 flex items-center justify-center text-inevi_dark_purple"
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
                </section>

                <section>
                    <PodsDisplay
                        componentData={componentData}
                        podDataUpdateTrigger={podDataUpdateTrigger}
                        setPodDataUpdateTrigger={setPodDataUpdateTrigger}
                    />
                </section>
            </div>
        </section>
    );
}

export default SelectComponents;
