import PropTypes from "prop-types";
import { createPortal } from "react-dom";

const Backdrop = () => {
    return <div className="backdrop"></div>;
};

const ModalOverlay = ({ children }) => {
    return (
        <div className="modal">
            <h3 className="centred-text">Edit Pod</h3>
            {children}
        </div>
    );
};

function Modal({ children }) {
    const portalElement = document.getElementById("modal-root");

    return (
        <>
            {createPortal(<Backdrop />, portalElement)}
            {createPortal(
                <ModalOverlay>{children}</ModalOverlay>,
                portalElement
            )}
        </>
    );
}

ModalOverlay.propTypes = {
    children: PropTypes.object.isRequired,
};

Modal.propTypes = {
    children: PropTypes.object.isRequired,
};

export default Modal;
