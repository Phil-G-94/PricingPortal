import PropTypes from "prop-types";
import { createPortal } from "react-dom";

const Backdrop = ({ closeEditModal }) => {
    return (
        <div
            className="backdrop"
            onClick={() => {
                closeEditModal();
            }}
        ></div>
    );
};

const ModalOverlay = ({ children }) => {
    return (
        <div className="modal">
            <h3 className="centred-text">Edit Pod</h3>
            {children}
        </div>
    );
};

function Modal({ children, closeEditModal }) {
    const portalElement = document.getElementById("modal-root");

    return (
        <>
            {createPortal(
                <Backdrop closeEditModal={closeEditModal} />,
                portalElement
            )}
            {createPortal(
                <ModalOverlay>{children}</ModalOverlay>,
                portalElement
            )}
        </>
    );
}

Backdrop.propTypes = {
    closeEditModal: PropTypes.func.isRequired,
};

ModalOverlay.propTypes = {
    children: PropTypes.object.isRequired,
};

Modal.propTypes = {
    children: PropTypes.object.isRequired,
    closeEditModal: PropTypes.func.isRequired,
};

export default Modal;
