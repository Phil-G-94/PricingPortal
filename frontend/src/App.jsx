import "./App.css";
import { useEffect, useState } from "react";

function App() {
    const [componentData, setComponentData] = useState([]);

    const fetchData = async () => {
        const response = await fetch("http://localhost:8080");

        if (!response.ok) {
            throw new Error("Something went wrong...");
        }

        const data = await response.json();

        const components = data.components;

        setComponentData(components);

        return components;
    };

    useEffect(() => {
        try {
            fetchData();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <>
            <h2>Welcome to the Pricing Portal</h2>

            <form action="/" method="GET">
                {/*

                        choose:

                        chassis
                        mobo
                        cooling, cabling
                        islc

                        CPU
                        GPU
                        RAM
                        SSD

                        */}

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
            </form>
        </>
    );
}

export default App;
