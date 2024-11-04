import { useEffect, useState } from "react";
import BaseComponents from "./BaseComponents.jsx";
import ResourceComponents from "./ResourceComponents.jsx";
import SpecDisplay from "./SpecDisplay.jsx";
import PodsDisplay from "./PodsDisplay.jsx";

function Form() {
    const [componentData, setComponentData] = useState([]);
    const [specData, setSpecData] = useState({});
    const [resellerPrice, setResellerPrice] = useState(0);
    const [retailPrice, setRetailPrice] = useState(0);
    const [responseMessage, setResponseMessage] = useState("");
    const [podDataUpdateTrigger, setPodDataUpdateTrigger] =
        useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        try {
            const fetchComponentData = async () => {
                const response = await fetch(
                    "https://pricingportal.onrender.com/components",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
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

        const formData = new FormData(event.target);

        const formDataObject = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(
                "https://pricingportal.onrender.com/components",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formDataObject),
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Could not submit your component selection."
                );
            }

            const data = await response.json();
            setPodDataUpdateTrigger((prev) => !prev);
            setSpecData(data.spec);
            setResellerPrice(data.totalResellerPrice);
            setRetailPrice(data.totalRetailPrice);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <h2>Component Selection</h2>
            <form
                action="/"
                method="POST"
                className="flex_col roboto-medium"
                onSubmit={onSubmitHandler}
            >
                <BaseComponents componentData={componentData} />

                <ResourceComponents componentData={componentData} />

                {responseMessage === "" && (
                    <button className="btn" type="submit">
                        Get Price
                    </button>
                )}

                {responseMessage !== "" && (
                    <p className="response-message">
                        {responseMessage}
                    </p>
                )}
            </form>

            {!responseMessage && (
                <section className="roboto-light">
                    <SpecDisplay
                        specData={specData}
                        resellerPrice={resellerPrice}
                        retailPrice={retailPrice}
                    />
                </section>
            )}

            <section className="roboto-light">
                <PodsDisplay
                    podDataUpdateTrigger={podDataUpdateTrigger}
                />
            </section>
        </>
    );
}

export default Form;
