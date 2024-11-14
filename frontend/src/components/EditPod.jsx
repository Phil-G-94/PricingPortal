import PropTypes from "prop-types";
import BaseComponents from "./BaseComponents";
import ResourceComponents from "./ResourceComponents";

function EditPod({ componentData }) {
    /*

    submit handler

    */

    return (
        <form
            action="/pod/:podId"
            method="PUT"
            className="flex_col roboto-medium"
        >
            <BaseComponents componentData={componentData} />
            <ResourceComponents componentData={componentData} />
            <button className="btn">Close</button>
            <button className="btn">Update pod spec</button>
        </form>
    );
}

EditPod.propTypes = {
    componentData: PropTypes.array.isRequired,
};

export default EditPod;
