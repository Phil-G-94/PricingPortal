import PropTypes from "prop-types";

function SpecDisplay({ specData }) {
    const baseComponentData = Object.entries(
        specData.baseComponents ?? []
    ).map(([key, value]) => {
        return (
            <li key={key}>
                {value.name} - £{value.cost}
            </li>
        );
    });

    const resourceComponentData = Object.entries(
        specData.resourceComponents ?? []
    ).map(([key, value]) => {
        return (
            <li key={key}>
                {value.name} - £{value.cost}
            </li>
        );
    });

    return (
        <div>
            <ul>{baseComponentData}</ul>
            <ul>{resourceComponentData}</ul>
        </div>
    );
}

SpecDisplay.propTypes = {
    specData: PropTypes.array.isRequired,
};

export default SpecDisplay;
