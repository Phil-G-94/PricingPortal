import PropTypes from "prop-types";
function PodDisplayCard({ pod }) {
    const token = localStorage.getItem("token");

    const onDeletePodHandler = async () => {
        const response = await fetch(
            "https://pricingportal.onrender.com/pods",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(pod._id),
            }
        );

        if (!response.ok) {
            throw new Error(
                "Something went wrong trying to delete the pod..."
            );
        }

        const jsonResponse = await response.json();

        return jsonResponse;
    };

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

                <button className="btn" onClick={onDeletePodHandler}>
                    Delete pod
                </button>
            </div>
        </article>
    );
}

PodDisplayCard.propTypes = {
    pod: PropTypes.object.isRequired,
};

export default PodDisplayCard;
