import React from "react";
import PropTypes from "prop-types";
import "../styles/Drawer.css";

const Drawer = ({
  isOpen,
  onClose,
  children,
  width = "half", // 'half' or 'full'
  position = "right", // 'left' or 'right'
}) => {
  if (!isOpen) return null;

  const getDrawerWidth = () => {
    return width === "full" ? "w-full" : "w-1/2";
  };

  const getDrawerPosition = () => {
    return position === "right" ? "right-0" : "left-0";
  };

  return (
    <>
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 bg-black/20 transition-opacity duration-300 ${
          width === "full" ? "z-10" : "z-20"
        } drawer-overlay`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 h-full bg-white shadow-xl z-30 ${getDrawerWidth()} ${getDrawerPosition()} drawer ${
          isOpen ? "open" : ""
        }`}
      >
        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
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
  width: PropTypes.oneOf(["half", "full"]),
  position: PropTypes.oneOf(["left", "right"]),
};

export default Drawer;
