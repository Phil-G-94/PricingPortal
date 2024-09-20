import PropTypes from "prop-types";

function BaseComponents({ componentData }) {
    return (
        <>
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
                        .filter((cmp) => cmp.type === "motherboard")
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
                        (cmp) => cmp.type === "cooling and cabling"
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
        </>
    );
}

BaseComponents.propTypes = {
    componentData: PropTypes.object.isRequired,
};

export default BaseComponents;
