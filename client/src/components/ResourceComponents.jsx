import PropTypes from "prop-types";

function ResourceComponents({ componentData }) {
    return (
        <section className="flex flex-col gap-2">
            <label htmlFor="CPU" className="flex flex-col w-full">
                CPU
                <select
                    name="CPU"
                    id="CPU"
                    className="border-2 rounded-md p-2 w-full"
                >
                    {componentData
                        .filter((cmp) => cmp.type === "CPU")
                        .map((cmp) => {
                            return (
                                <option
                                    label={cmp.name}
                                    value={`${cmp.name} : ${cmp.cost}`}
                                    key={cmp._id}
                                >
                                    {cmp.name}
                                </option>
                            );
                        })}
                </select>
            </label>

            <label htmlFor="GPU" className="flex flex-col w-full">
                GPU
                <select
                    name="GPU"
                    id="GPU"
                    className="border-2 rounded-md p-2 w-full"
                >
                    {componentData
                        .filter((cmp) => cmp.type === "GPU")
                        .map((cmp) => {
                            return (
                                <option
                                    label={cmp.name}
                                    value={`${cmp.name} : ${cmp.cost}`}
                                    key={cmp._id}
                                >
                                    {cmp.name}
                                </option>
                            );
                        })}
                </select>
            </label>

            <label htmlFor="RAM" className="flex flex-col w-full">
                RAM
                <select
                    name="RAM"
                    id="RAM"
                    className="border-2 rounded-md p-2 w-full"
                >
                    {componentData
                        .filter((cmp) => cmp.type === "RAM")
                        .map((cmp) => {
                            return (
                                <option
                                    label={cmp.name}
                                    value={`${cmp.name} : ${cmp.cost}`}
                                    key={cmp._id}
                                >
                                    {cmp.name}
                                </option>
                            );
                        })}
                </select>
            </label>

            <label htmlFor="RAM_quantity" className="flex flex-col w-full">
                RAM Quantity
                <input
                    type="number"
                    name="RAM_quantity"
                    id="RAM_quantity"
                    min="1"
                    max="8"
                    defaultValue="4"
                    className="border-2 rounded-md p-2 w-full"
                />
            </label>

            <label htmlFor="SSD" className="flex flex-col w-full">
                SSD
                <select
                    name="SSD"
                    id="SSD"
                    className="border-2 rounded-md p-2 w-full"
                >
                    {componentData
                        .filter((cmp) => cmp.type === "SSD")
                        .map((cmp) => {
                            return (
                                <option
                                    value={`${cmp.name} : ${cmp.cost}`}
                                    key={cmp._id}
                                >
                                    {cmp.name}
                                </option>
                            );
                        })}
                </select>
            </label>
            <label htmlFor="SSD_quantity" className="flex flex-col w-full">
                SSD Quantity
                <input
                    type="number"
                    name="SSD_quantity"
                    id="SSD_quantity"
                    min="1"
                    max="8"
                    defaultValue="3"
                    className="border-2 rounded-md p-2 w-full"
                />
            </label>
        </section>
    );
}

ResourceComponents.propTypes = {
    componentData: PropTypes.array.isRequired,
};

export default ResourceComponents;
