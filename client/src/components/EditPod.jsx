import PropTypes from "prop-types";
import BaseComponents from "./BaseComponents";
import ResourceComponents from "./ResourceComponents";

function EditPod({ componentData, closeEditModal, podId, setPodDataUpdateTrigger }) {
    const onEditPodHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formDataObject = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`http://localhost:8080/api/pods/${podId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formDataObject),
            });

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

                <button onClick={() => closeEditModal()}>Close</button>
                <button type="submit">Update pod spec</button>
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
