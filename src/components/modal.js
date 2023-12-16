import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  z-index: 999; /* Ensure the backdrop is behind the modal */
  backdrop-filter: blur(5px); /* Apply the blur effect */
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: var(--darkpurple);
  z-index: 1000;
  border-radius: 10px;
  border: 2px solid var(--green);
  max-height: 86vh;
  overflow-y: auto;
  width: 90%;

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    padding-top: 10px;
    cursor: pointer;
    font-size: 16px;
    color: var(--green);
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
`;

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    // Prevent scrolling on the background page when the modal is open
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the modal is closed
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <>
      <StyledBackdrop />
      <StyledModal>
        <div className="breadcrumb">
          <button className="close-button" onClick={onClose}>
            Close X
          </button>
        </div>
        {children}
      </StyledModal>
    </>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
