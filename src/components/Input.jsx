import React from 'react';
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
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full h-14 border border-[#121212] rounded-md font-light text-base leading-6 text-[#12121280] p-4 outline-none focus:border-[#347CC6] focus:ring-2 focus:ring-[#347CC6] ${inputStyle}`}
                {...inputProps}
            />
            {error && <span className='text-[#e74c3c] mt-2 text-sm'>{error}</span>}
        </div>
    );
};

export default Input;
