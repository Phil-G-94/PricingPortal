import { useEffect, useState } from "react";
import BaseComponents from "./BaseComponents.jsx";
import ResourceComponents from "./ResourceComponents.jsx";
import SpecDisplay from "./SpecDisplay.jsx";

function Form() {
    const [componentData, setComponentData] = useState([]);
    const [specData, setSpecData] = useState([]);
    const [resellerPrice, setResellerPrice] = useState(0);
    const [retailPrice, setRetailPrice] = useState(0);

    const fetchComponentData = async () => {
        const response = await fetch("http://localhost:8080");

        if (!response.ok) {
            throw new Error(
                "Something went wrong...fetch component data"
            );
        }

        const data = await response.json();

        const components = data.components;

        setComponentData(components);

        return components;
    };

    useEffect(() => {
        try {
            fetchComponentData();
        } catch (err) {
            console.log(err);
        }
    }, []);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const formDataObject = Object.fromEntries(formData.entries());

        const response = await fetch("http://localhost:8080", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObject),
        });

        if (!response.ok) {
            throw new Error("Something went wrong...submit handler");
        }

        const data = await response.json();

        setSpecData(data.spec);
        setResellerPrice(data.totalResellerPrice);
        setRetailPrice(data.totalRetailPrice);
    };

    return (
        <>
            <form action="/" method="POST" onSubmit={onSubmitHandler}>
                <BaseComponents componentData={componentData} />

                <ResourceComponents componentData={componentData} />

                <button type="submit">Submit</button>
            </form>

            <SpecDisplay specData={specData} />

            <div>
                <p> £{resellerPrice}</p>
                <p> £{retailPrice}</p>
            </div>
        </>
    );
}

export default Form;
