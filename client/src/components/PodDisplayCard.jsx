import PropTypes from "prop-types";

import { useState } from "react";

import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCan } from "@mdi/js";

import EditPod from "./EditPod";
import Modal from "./Modal";

function PodDisplayCard({
    pod,
    componentData,
    onDeletePodHandler,
    setPodDataUpdateTrigger,
}) {
    const [showEditModal, setShowEditModal] = useState(false);

    const openEditModal = () => setShowEditModal(true);
    const closeEditModal = () => setShowEditModal(false);

    console.log(pod);

    return (
        <article className="border-2 p-2 rounded-md drop-shadow-2xl">
            <section className="w-min-sm">
                <h4 className="font-bold">Pod ID: {pod._id}</h4>
                <p>
                    <span className="font-bold">CPU: </span>
                    {pod.spec.resourceComponents.CPU.name}
                </p>
                <p>
                    <span className="font-bold">GPU: </span>
                    {pod.spec.resourceComponents.GPU.name}
                </p>
                <p>
                    <span className="font-bold">RAM: </span>
                    {pod.spec.resourceComponents.RAM.name} x
                    {pod.spec.resourceComponents.RAM.quantity}
                </p>
                <p>
                    <span className="font-bold">Storage: </span>
                    {pod.spec.resourceComponents.SSD.name} x
                    {pod.spec.resourceComponents.SSD.quantity}
                </p>

                <p>
                    <span className="font-bold">Reseller price: </span> £
                    {pod.resellerPrice}
                </p>
                <p>
                    <span className="font-bold">Retail price: </span> £
                    {pod.retailPrice}
                </p>
                <p>
                    <span className="font-bold">Created by: </span> {pod.user.name}
                </p>
                <p>
                    <span className="font-bold">Created at: </span>
                    {pod.createdAt}
                </p>

                <div className="flex flex-row justify-center gap-4 m-2">
                    <button
                        className="bg-inevi_dark_purple text-inevi_white text-lg px-4 py-1 rounded-md max-w-fit hover:bg-red-700"
                        onClick={() => onDeletePodHandler(pod._id)}
                    >
                        <Icon path={mdiTrashCan} size={1} title="Delete" />
                    </button>

                    <button
                        className="bg-inevi_dark_purple text-inevi_white text-lg px-4 py-1 rounded-md max-w-fit hover:bg-amber-500"
                        onClick={() => {
                            openEditModal();
                        }}
                    >
                        <Icon path={mdiPencil} size={1} title="Edit" />
                    </button>
                </div>
            </section>
            {showEditModal && (
                <Modal showEditModal={showEditModal} closeEditModal={closeEditModal}>
                    <EditPod
                        componentData={componentData}
                        podId={pod._id}
                        closeEditModal={closeEditModal}
                        setPodDataUpdateTrigger={setPodDataUpdateTrigger}
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
    setPodDataUpdateTrigger: PropTypes.func.isRequired,
};

export default PodDisplayCard;
