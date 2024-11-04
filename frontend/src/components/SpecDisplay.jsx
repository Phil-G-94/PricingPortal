import PropTypes from "prop-types";

function SpecDisplay({ specData, resellerPrice, retailPrice }) {
    const baseComponentData = Object.entries(
        specData.baseComponents ?? {}
    ).map(([key, value]) => {
        return (
            <li key={key}>
                {value.name} - £{value.cost}
            </li>
        );
    });

    const resourceComponentData = Object.entries(
        specData.resourceComponents ?? {}
    ).map(([key, value]) => {
        return (
            <li key={key}>
                {value.name} - £{value.cost}
            </li>
        );
    });

    return (
        <div>
            <h3 className="centred-text">Your Spec</h3>
            <ul>{baseComponentData}</ul>
            <ul>{resourceComponentData}</ul>

            <p>Reseller Price: £{resellerPrice}</p>

            <p>Retail Price: £{retailPrice}</p>
        </div>
    );
}

SpecDisplay.propTypes = {
    specData: PropTypes.object.isRequired,
    resellerPrice: PropTypes.number.isRequired,
    retailPrice: PropTypes.number.isRequired,
};

export default SpecDisplay;
