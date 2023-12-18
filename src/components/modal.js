import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(5px);
`;

const StyledContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
  width: 80%;
  height: 90%;
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--darkpurple);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    max-width: none;
  }
`;

const StyledNav = styled.div`
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: var(--darkpurple);
    border-bottom: 2px solid var(--green);

    @media (max-width: 768px) {
      padding: 15px;
    }
  }

  p {
    font-size: 1.25rem;
    color: var(--green);
    margin-right: 20px;
    font-family: var(--font-mono);

    @media (max-width: 768px) {
      padding: 15px;
      font-size: var(--fz-lg);
    }
  }

  .close-button {
    cursor: pointer;
    font-size: 16px;
    color: var(--green);
    background: none;
    border: none;
    ${({ theme }) => theme.mixins.smallButton};
  }
`;

const StyledModal = styled.div`
  padding: 10px;
  max-height: 90vh;
  overflow-y: auto;

  .breadcrumb {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 100px;
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
            <p>View Project</p>
            <button className="close-button" onClick={onClose}>
              X
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
