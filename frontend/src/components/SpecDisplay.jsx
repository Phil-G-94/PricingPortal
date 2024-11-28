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
        <section className="flex_col_items_content_center">
            <h3 className="centred-text">Your Spec</h3>
            <ul>
                {baseComponentData}
                {resourceComponentData}
            </ul>
            <p>Reseller Price: £{resellerPrice}</p>

            <p>Retail Price: £{retailPrice}</p>
        </section>
    );
}

SpecDisplay.propTypes = {
    specData: PropTypes.object.isRequired,
    resellerPrice: PropTypes.number.isRequired,
    retailPrice: PropTypes.number.isRequired,
};

export default SpecDisplay;
