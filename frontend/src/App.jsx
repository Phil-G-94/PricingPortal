import "./App.css";
import { useEffect, useState } from "react";

function App() {
    const [componentData, setComponentData] = useState([]);
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

        setResellerPrice(data.totalResellerPrice);
        setRetailPrice(data.totalRetailPrice);
    };

    return (
        <>
            <h2>Ineviprice</h2>

            <form action="/" method="POST" onSubmit={onSubmitHandler}>
                {/* base components => outsource into own JSX cmp */}

                <label htmlFor="chassis">
                    Chassis
                    <select name="chassis" id="chassis">
                        {componentData
                            .filter((cmp) => cmp.type === "chassis")
                            .map((cmp) => {
                                return (
                                    <option
                                        value={cmp.cost}
                                        key={crypto.randomUUID()}
                                    >
                                        {cmp.name}
                                    </option>
                                );
                            })}
                    </select>
                </label>

                <label htmlFor="motherboard">
                    Motherboard
                    <select name="motherboard" id="motherboard">
                        {componentData
                            .filter(
                                (cmp) => cmp.type === "motherboard"
                            )
                            .map((cmp) => {
                                return (
                                    <option
                                        value={cmp.cost}
                                        key={crypto.randomUUID()}
                                    >
                                        {cmp.name}
                                    </option>
                                );
                            })}
                    </select>
                </label>

                <label htmlFor="coolingCabling">
                    Cooling/Cabling
                    {componentData
                        .filter(
                            (cmp) =>
                                cmp.type === "cooling and cabling"
                        )
                        .map((cmp) => {
                            return (
                                <input
                                    name="coolingCabling"
                                    id="coolingCabling"
                                    type="checkbox"
                                    key={crypto.randomUUID()}
                                    value={cmp.cost}
                                    placeholder={cmp.cost}
                                />
                            );
                        })}
                </label>

                <label htmlFor="islc">
                    ISLC
                    {componentData
                        .filter((cmp) => cmp.type === "islc")
                        .map((cmp) => {
                            return (
                                <input
                                    name="islc"
                                    id="islc"
                                    type="checkbox"
                                    key={crypto.randomUUID()}
                                    value={cmp.cost}
                                    placeholder={cmp.cost}
                                />
                            );
                        })}
                </label>

                {/* resource components => outsource into own JSX cmp */}

                <label htmlFor="CPU">
                    CPU
                    <select name="CPU" id="CPU">
                        {componentData
                            .filter((cmp) => cmp.type === "CPU")
                            .map((cmp) => {
                                return (
                                    <option
                                        value={cmp.cost}
                                        key={crypto.randomUUID()}
                                    >
                                        {cmp.name}
                                    </option>
                                );
                            })}
                    </select>
                </label>

                <label htmlFor="GPU">
                    GPU
                    <select name="GPU" id="GPU">
                        {componentData
                            .filter((cmp) => cmp.type === "GPU")
                            .map((cmp) => {
                                return (
                                    <option
                                        value={cmp.cost}
                                        key={crypto.randomUUID()}
                                    >
                                        {cmp.name}
                                    </option>
                                );
                            })}
                    </select>
                </label>

                <label htmlFor="RAM">
                    RAM
                    <select name="RAM" id="RAM">
                        {componentData
                            .filter((cmp) => cmp.type === "RAM")
                            .map((cmp) => {
                                return (
                                    <>
                                        <option
                                            value={cmp.cost}
                                            key={crypto.randomUUID()}
                                        >
                                            {cmp.name}
                                        </option>
                                    </>
                                );
                            })}
                    </select>
                </label>
                <label htmlFor="RAM_quantity">
                    RAM Quantity
                    <input
                        type="number"
                        name="RAM_quantity"
                        id="RAM_quantity"
                        min="1"
                        max="8"
                        defaultValue="4"
                    />
                </label>

                <label htmlFor="SSD">
                    SSD
                    <select name="SSD" id="SSD">
                        {componentData
                            .filter((cmp) => cmp.type === "SSD")
                            .map((cmp) => {
                                return (
                                    <option
                                        value={cmp.cost}
                                        key={crypto.randomUUID()}
                                    >
                                        {cmp.name}
                                    </option>
                                );
                            })}
                    </select>
                </label>
                <label htmlFor="SSD_quantity">
                    SSD Quantity
                    <input
                        type="number"
                        name="SSD_quantity"
                        id="SSD_quantity"
                        min="1"
                        max="8"
                        defaultValue="3"
                    />
                </label>

                <button type="submit">Submit</button>
            </form>

            <div>
                <p> £{resellerPrice}</p>
                <p> £{retailPrice}</p>
            </div>
        </>
    );
}

export default App;
