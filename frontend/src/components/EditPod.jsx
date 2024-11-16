import PropTypes from "prop-types";
import BaseComponents from "./BaseComponents";
import ResourceComponents from "./ResourceComponents";

function EditPod({ componentData, closeEditModal, podId }) {
    const token = localStorage.getItem("token");

    const onEditPodHandler = async (event) => {
        console.log(event);

        const formData = new FormData(event.target);
        const formDataObject = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(
                `https://pricingportal.onrender.com/pods/${podId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formDataObject),
                }
            );

            const jsonResponse = await response.json();

            if (!response.ok) {
                const { message } = jsonResponse;

                if (message) {
                    console.error(message); // improve? responseMessage?
                }

                return;
            }

            console.log(jsonResponse);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <form
                action="/pods/:podId"
                method="PUT"
                className="flex_col roboto-medium"
                onSubmit={onEditPodHandler}
            >
                <BaseComponents componentData={componentData} />
                <ResourceComponents componentData={componentData} />

                <button
                    className="btn"
                    onClick={() => closeEditModal()}
                >
                    Close
                </button>
                <button className="btn" type="submit">
                    Update pod spec
                </button>
            </form>
        </>
    );
}

EditPod.propTypes = {
    componentData: PropTypes.array.isRequired,
    closeEditModal: PropTypes.func.isRequired,
    podId: PropTypes.string.isRequired,
};

export default EditPod;