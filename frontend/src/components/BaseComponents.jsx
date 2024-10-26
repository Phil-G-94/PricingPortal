import PropTypes from "prop-types";

function BaseComponents({ componentData }) {
    return (
        <>
            <label htmlFor="chassis">
                Chassis
                <select name="chassis" id="chassis" required>
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

            <label htmlFor="motherboard">
                Motherboard
                <select name="motherboard" id="motherboard" required>
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
                        >
                            Cooling/Cabling
                            <input
                                name="coolingCabling"
                                id={`coolingCabling_${cmp._id}`}
                                type="checkbox"
                                value={`${cmp.name} : ${cmp.cost}`}
                                placeholder={cmp.cost}
                                required
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
                        >
                            ISLC
                            <input
                                name="islc"
                                id={`islc_${cmp._id}`}
                                type="checkbox"
                                value={`${cmp.name} : ${cmp.cost}`}
                                placeholder={cmp.cost}
                                required
                            />
                        </label>
                    );
                })}
        </>
    );
}

BaseComponents.propTypes = {
    componentData: PropTypes.array.isRequired,
};

export default BaseComponents;
