import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-overlay" onClick={onClose}>
      <div 
        className="bg-white rounded-lg w-1/2 h-1/2 max-h-[90vh] relative modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          <button 
            className="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none transition-colors duration-200" 
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Modal;
