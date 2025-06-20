import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Backdrop = ({ isClosing, handleClose }) => {
  return (
    <div
      onClick={() => {
        handleClose();
      }}
      className={`fixed inset-0 z-[999] bg-black/75 transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    ></div>
  );
};

const ModalOverlay = ({ isClosing, children }) => {
  return (
    <div
      className={`fixed top-1/2 left-1/2 z-[1000] bg-white w-[90%] max-w-[500px] min-w-[25%] rounded-[14px] shadow-lg p-6 ${
        isClosing ? "animate-slide-up" : "animate-slide-down"
      }`}
    >
      <h3 className="text-lg font-semibold mb-4">Edit Pod</h3>
      {children}
    </div>
  );
};

function Modal({ children, closeEditModal }) {
  const portalElement = document.getElementById("modal-root");
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        closeEditModal();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isClosing, closeEditModal]);

  return (
    <>
      {createPortal(<Backdrop isClosing={isClosing} handleClose={handleClose} />, portalElement)}
      {createPortal(<ModalOverlay isClosing={isClosing}>{children}</ModalOverlay>, portalElement)}
    </>
  );
}

Backdrop.propTypes = {
  isClosing: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

ModalOverlay.propTypes = {
  isClosing: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
};

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  closeEditModal: PropTypes.func.isRequired,
};

export default Modal;
