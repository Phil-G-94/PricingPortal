import PropTypes from "prop-types";
function PodDisplayCard({
    pod,
    onDeletePodHandler,
    onEditPodHandler,
}) {
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

                <button
                    className="btn-warning"
                    onClick={() => onDeletePodHandler(pod._id)}
                >
                    Delete pod
                </button>

                <button
                    className="btn-caution"
                    onClick={() => onEditPodHandler(pod._id)}
                >
                    Edit pod
                </button>
            </div>
        </article>
    );
}

PodDisplayCard.propTypes = {
    pod: PropTypes.object.isRequired,
    onDeletePodHandler: PropTypes.func.isRequired,
    onEditPodHandler: PropTypes.func.isRequired,
};

export default PodDisplayCard;
