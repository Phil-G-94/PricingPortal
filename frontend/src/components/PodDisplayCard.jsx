import PropTypes from "prop-types";
function PodDisplayCard({ pod }) {
    return (
        <article>
            <div>
                <h4>Pod ID: {pod._id}</h4>
                <p>
                    <b>CPU:</b>
                    {pod.spec.resourceComponents.CPU.name}
                </p>
                <p>
                    <b>GPU:</b>
                    {pod.spec.resourceComponents.GPU.name}
                </p>
                <p>
                    {pod.spec.resourceComponents.RAM.name} x
                    {pod.spec.resourceComponents.RAM.quantity}
                </p>
                <p>
                    {pod.spec.resourceComponents.SSD.name} x
                    {pod.spec.resourceComponents.SSD.quantity}
                </p>

                <p>
                    <b>Reseller price:</b> £{pod.resellerPrice}
                </p>
                <p>
                    <b>Retail price:</b> £{pod.retailPrice}
                </p>
                <p>
                    <b>Created by:</b> {pod.user.name}
                </p>
            </div>
        </article>
    );
}

PodDisplayCard.propTypes = {
    pod: PropTypes.object.isRequired,
};

export default PodDisplayCard;
