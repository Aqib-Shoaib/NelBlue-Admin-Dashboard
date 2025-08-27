import React, { useState } from 'react';

const Input = ({
    label,
    placeholder = '',
    value = '',
    onChange,
    name,
    type = 'text',
    error = '',
    style = '',
    labelStyle = '',
    inputStyle = '',
    inputProps = {},
}) => {
    const [showPassword, setShowPassword] = useState(false);
    
    // Determine the actual input type
    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
    
    // Check if this is a password input
    const isPasswordInput = type === 'password';

    return (
        <div className={`flex flex-col justify-start w-full ${style}`}>
            {label && (
                <label
                    htmlFor={name}
                    className={`font-bold capitalize text-xl text-[#121212] mb-1 ${labelStyle}`}
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full h-14 border border-[#121212] rounded-md font-light text-base leading-6 text-[#12121280] p-4 outline-none focus:border-[#347CC6] focus:ring-2 focus:ring-[#347CC6] ${inputStyle} ${isPasswordInput ? 'pr-12' : ''}`}
                    {...inputProps}
                />
                {isPasswordInput && (
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
            {error && <span className='text-[#e74c3c] mt-2 text-sm'>{error}</span>}
        </div>
    );
};

export default Input;
