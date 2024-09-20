import PropTypes from "prop-types";

function ResourceComponents({ componentData }) {
    return (
        <>
            <label htmlFor="CPU">
                CPU
                <select name="CPU" id="CPU">
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

            <label htmlFor="GPU">
                GPU
                <select name="GPU" id="GPU">
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

            <label htmlFor="RAM">
                RAM
                <select name="RAM" id="RAM">
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
                                    value={`${cmp.name} : ${cmp.cost}`}
                                    key={cmp._id}
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
        </>
    );
}

ResourceComponents.propTypes = {
    componentData: PropTypes.array.isRequired,
};

export default ResourceComponents;
