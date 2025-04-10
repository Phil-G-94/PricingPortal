import PropTypes from "prop-types";

function BaseComponents({ componentData }) {
    return (
        <section className="flex flex-col gap-2">
            <label htmlFor="chassis" className="flex flex-col w-full">
                Chassis
                <select
                    name="chassis"
                    id="chassis"
                    required
                    className="border-2 rounded-md p-2 w-full"
                >
                    {componentData
                        .filter((cmp) => cmp.type === "chassis")
                        .map((cmp) => {
                            return (
                                <option
                                    key={cmp._id}
                                    label={cmp.name}
                                    value={`${cmp.name} : ${cmp.cost}`}
                                >
                                    {cmp.name}
                                </option>
                            );
                        })}
                </select>
            </label>

            <label htmlFor="motherboard" className="flex flex-col w-full">
                Motherboard
                <select
                    name="motherboard"
                    id="motherboard"
                    required
                    className="border-2 rounded-md p-2 w-full"
                >
                    {componentData
                        .filter((cmp) => cmp.type === "motherboard")
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

            {componentData
                .filter((cmp) => cmp.type === "cooling and cabling")
                .map((cmp) => {
                    return (
                        <label
                            key={cmp._id}
                            htmlFor={`coolingCabling_${cmp._id}`}
                            className="hidden"
                        >
                            Cooling/Cabling
                            <input
                                name="coolingCabling"
                                id={`coolingCabling_${cmp._id}`}
                                type="checkbox"
                                value={`${cmp.name} : ${cmp.cost}`}
                                placeholder={cmp.cost}
                                required
                                defaultChecked={true}
                            />
                        </label>
                    );
                })}

            {componentData
                .filter((cmp) => cmp.type === "islc")
                .map((cmp) => {
                    return (
                        <label
                            key={cmp._id}
                            htmlFor={`islc_${cmp._id}`}
                            className="hidden"
                        >
                            ISLC
                            <input
                                name="islc"
                                id={`islc_${cmp._id}`}
                                type="checkbox"
                                value={`${cmp.name} : ${cmp.cost}`}
                                placeholder={cmp.cost}
                                required
                                defaultChecked={true}
                            />
                        </label>
                    );
                })}
        </section>
    );
}

BaseComponents.propTypes = {
    componentData: PropTypes.array.isRequired,
};

export default BaseComponents;
