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
    const [errorData, setErrorData] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        try {
            const fetchComponentData = async () => {
                const response = await fetch(
                    "http://localhost:8080/components",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                /* Improve error handling */
                if (!response.ok) {
                    throw new Error(
                        "Could not fetch component data."
                    );
                }

                const data = await response.json();

                const components = data.components;

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
                "http://localhost:8080/components",
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

            setErrorData(data.errors);
            setSpecData(data.spec);
            setResellerPrice(data.totalResellerPrice);
            setRetailPrice(data.totalRetailPrice);
        } catch (err) {
            console.error(err);
        }
    };

    const errors = errorData.map((error) => {
        return (
            <li key={error.path}>
                {`${error.msg} for ${error.path} input `}
            </li>
        );
    });

    return (
        <>
            <h2>Component Selection</h2>
            <form
                action="/"
                method="POST"
                className="flex_col"
                onSubmit={onSubmitHandler}
            >
                <BaseComponents componentData={componentData} />

                <ResourceComponents componentData={componentData} />

                <button type="submit">Get Price</button>
            </form>

            <ul>{errors}</ul>
            {errorData.length == 0 && (
                <>
                    <SpecDisplay
                        specData={specData}
                        resellerPrice={resellerPrice}
                        retailPrice={retailPrice}
                    />
                </>
            )}

            <section>
                <PodsDisplay />
            </section>
        </>
    );
}

export default Form;
