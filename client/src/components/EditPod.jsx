import PropTypes from "prop-types";
import BaseComponents from "./BaseComponents";
import ResourceComponents from "./ResourceComponents";
import Icon from "@mdi/react";
import { mdiClose, mdiContentSaveEdit } from "@mdi/js";

function EditPod({ componentData, closeEditModal, podId, setPodDataUpdateTrigger }) {
    const onEditPodHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formDataObject = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(
                `https://pricingportal.onrender.com/api/pods/${podId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(formDataObject),
                }
            );

            const jsonResponse = await response.json();

            if (!response.ok) {
                const { message } = jsonResponse;

                if (message) {
                    console.error(message);
                }

                return;
            }

            setPodDataUpdateTrigger((prevState) => !prevState);
            closeEditModal();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <form action={`/pods/${podId}`} method="PUT" onSubmit={onEditPodHandler}>
                <BaseComponents componentData={componentData} />
                <ResourceComponents componentData={componentData} />

                <div className="flex flex-row items-center justify-center gap-4 m-2">
                    <button
                        onClick={closeEditModal}
                        className="bg-inevi_dark_purple text-white text-lg px-4 py-2 rounded-md max-w-fit"
                    >
                        <Icon path={mdiClose} size={1} title="Close" />
                    </button>
                    <button
                        type="submit"
                        className="bg-inevi_dark_purple text-white text-lg px-4 py-2 rounded-md max-w-fit"
                    >
                        <Icon path={mdiContentSaveEdit} size={1} title="Save" />
                    </button>
                </div>
            </form>
        </>
    );
}

EditPod.propTypes = {
    componentData: PropTypes.array.isRequired,
    closeEditModal: PropTypes.func.isRequired,
    podId: PropTypes.string.isRequired,
    setPodDataUpdateTrigger: PropTypes.func.isRequired,
};

export default EditPod;
