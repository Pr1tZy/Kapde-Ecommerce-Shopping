// components/Modal.js
import React from 'react';
import '../styles/Modal.css'; // Ensure the modal CSS is correctly linked

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <button className="closeButton" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
