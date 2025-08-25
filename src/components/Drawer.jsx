import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Drawer.css';

const Drawer = ({ 
  isOpen, 
  onClose, 
  children, 
  title,
  width = 'half', // 'half' or 'full'
  position = 'right' // 'left' or 'right'
}) => {
  if (!isOpen) return null;

  const getDrawerWidth = () => {
    return width === 'full' ? 'w-full' : 'w-1/2';
  };

  const getDrawerPosition = () => {
    return position === 'right' ? 'right-0' : 'left-0';
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          width === 'full' ? 'z-10' : 'z-20'
        } drawer-overlay ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0'}`} 
        onClick={onClose} 
      />
      <div 
        className={`fixed top-0 h-full bg-white shadow-xl z-30 ${getDrawerWidth()} ${getDrawerPosition()} drawer ${
          isOpen ? 'open' : ''
        }`}
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
        <div className="p-4 h-[calc(100vh-4rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  width: PropTypes.oneOf(['half', 'full']),
  position: PropTypes.oneOf(['left', 'right'])
};

export default Drawer;
