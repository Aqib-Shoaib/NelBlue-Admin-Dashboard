import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    password: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Signup form submit:', form);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-[820px] h-full py-4 bg-[#F4F4F4] rounded-2xl flex flex-col items-center shadow-md">
        <div className="absolute left-6 sm:left-8 top-8 sm:top-12">
          <span className="font-inter font-bold text-[24px] leading-[29px] text-[#023AA2]">NELAUTOS</span>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-[600px] mx-auto flex flex-col gap-6 pt-[110px] sm:pt-[125px] px-4 sm:px-6">
          <h2 className="font-poppins font-medium text-2xl sm:text-[28px] leading-[28px] text-[#121212] text-center mb-2">Sign up as Admin</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              placeholder="Enter firstname"
              value={form.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Enter lastname"
              value={form.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>
          <Input
            label="Email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <div className="relative">
            <Input
              label="Country"
              name="country"
              placeholder="Select country"
              value={form.country}
              onChange={handleChange}
              error={errors.country}
              inputProps={{ list: 'country-list' }}
            />
            <datalist id="country-list">
              <option value="Nigeria" />
              <option value="Ghana" />
              <option value="Kenya" />
              <option value="South Africa" />
              <option value="Other" />
            </datalist>
            {/* Optionally add a dropdown icon here */}
          </div>
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            inputStyle="h-14"
          />
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
              className="w-[15px] h-[16px] border border-[#121212] rounded mr-2 cursor-pointer"
              id="terms"
            />
            <label htmlFor="terms" className="font-poppins font-normal text-[13px] leading-5 text-black/50 cursor-pointer">
              Accept the <span className="underline">Terms</span> and <span className="underline">Privacy Policy</span>
            </label>
          </div>
          <Button type="submit">
            Sign Up
          </Button>
          <div className="flex justify-center items-center gap-1 mt-4">
            <span className="font-poppins font-medium text-[13px] leading-5 text-black/70">
              Already have an account?
            </span>
            <Link
              to="/login"
              className="font-poppins font-medium text-[13px] leading-5 text-[#023AA2] hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;