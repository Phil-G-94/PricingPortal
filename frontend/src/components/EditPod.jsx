import PropTypes from "prop-types";
import BaseComponents from "./BaseComponents";
import ResourceComponents from "./ResourceComponents";

function EditPod({ componentData, closeEditModal }) {
    /*

    submit handler

    */

    return (
        <>
            <form
                action="/pod/:podId"
                method="PUT"
                className="flex_col roboto-medium"
            >
                <BaseComponents componentData={componentData} />
                <ResourceComponents componentData={componentData} />
            </form>
            <button className="btn" onClick={closeEditModal}>
                Close
            </button>
            <button className="btn">Update pod spec</button>
        </>
    );
}

EditPod.propTypes = {
    componentData: PropTypes.array.isRequired,
    closeEditModal: PropTypes.func.isRequired,
};

export default EditPod;
