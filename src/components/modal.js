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

const StyledContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    overflow-y: auto;
  }
`;

const StyledNav = styled.div`
  .navbar {
    display: flex;
    justify-content: space-between;
    position: fixed;
    z-index: 1001;
    width: 90%;
    top: 0.4%;
    background-color: var(--darkpurple);
    padding: 20px;

    @media (max-width: 768px) {
      display: flex;
      justify-content: space-between;
      position: fixed;
      z-index: 1001;
      width: 96%;
      top: 0.4%;
      background-color: var(--darkpurple);
      padding: 10px;
    }
  }
  .close-button {
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 16px;
    color: var(--green);
    ${({ theme }) => theme.mixins.smallButton};
  }
`;

const StyledModal = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: var(--darkpurple);
  z-index: 1000;
  border-radius: 10px;
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    top: 50%;
    left: 50%;
    max-height: 100vh;
    overflow-y: auto;
  }

  .breadcrumb {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 50px;
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
      <StyledContainer>
        <StyledNav>
          <div className="navbar">
            <p></p>
            <button className="close-button" onClick={onClose}>
              Close X
            </button>
          </div>
        </StyledNav>
        <StyledModal>
          <div className="breadcrumb">{children}</div>
        </StyledModal>
      </StyledContainer>
    </>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
