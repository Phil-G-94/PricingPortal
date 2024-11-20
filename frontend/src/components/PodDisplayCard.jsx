import PropTypes from "prop-types";

import { useState } from "react";

import EditPod from "./EditPod";
import Modal from "./Modal";

function PodDisplayCard({ pod, componentData, onDeletePodHandler }) {
    const [showEditModal, setShowEditModal] = useState(false);

    const openEditModal = () => setShowEditModal(true);
    const closeEditModal = () => setShowEditModal(false);

    return (
        <article className="grid-item">
            <section>
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
                    onClick={() => {
                        openEditModal();
                    }}
                >
                    Edit pod
                </button>
            </section>
            {showEditModal && (
                <Modal
                    showEditModal={showEditModal}
                    closeEditModal={closeEditModal}
                >
                    <EditPod
                        componentData={componentData}
                        podId={pod._id}
                        closeEditModal={closeEditModal}
                    />
                </Modal>
            )}
        </article>
    );
}

PodDisplayCard.propTypes = {
    pod: PropTypes.object.isRequired,
    componentData: PropTypes.array.isRequired,
    onDeletePodHandler: PropTypes.func.isRequired,
};

export default PodDisplayCard;
