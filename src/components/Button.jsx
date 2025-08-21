import React from 'react';

/**
 * Reusable Button component
 * Props:
 * - children: node (button label or content)
 * - onClick: function
 * - type: string (button, submit, reset)
 * - disabled: boolean
 * - className: string (extra tailwind classes)
 * - ...rest: other button props
 */
const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  style = 'primary',
  ...rest
}) => {
    const styles = {
        primary:"bg-[#023AA2] font-semibold text-[18px] leading-[27px] text-white",
        secondary:"border-2 border-[#023AA2] bg-transparent text-[#023AA2] font-semibold text-base hover:bg-[#023AA2]/10"
    }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-[54px] cursor-pointer transition-all flex items-center justify-center font-poppins duration-200 disabled:opacity-60 disabled:cursor-not-allowed rounded-full ${styles[style]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

