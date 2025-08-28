import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupInitiate } from '../store/useAuth';

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
  const [touched, setTouched] = useState({});
  const signupMutation = useSignupInitiate();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, form[name]);
  }

  function validateField(name, value) {
    let error = '';
    
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          error = 'First name is required';
        } else if (value.trim().length < 2) {
          error = 'First name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = 'First name can only contain letters and spaces';
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          error = 'Last name is required';
        } else if (value.trim().length < 2) {
          error = 'Last name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = 'Last name can only contain letters and spaces';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'country':
        if (!value.trim()) {
          error = 'Country is required';
        }
        break;
      case 'password':
        if (!value.trim()) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])/.test(value)) {
          error = 'Password must contain at least one lowercase letter';
        } else if (!/(?=.*[A-Z])/.test(value)) {
          error = 'Password must contain at least one uppercase letter';
        } else if (!/(?=.*\d)/.test(value)) {
          error = 'Password must contain at least one number';
        }
        break;
      default:
        break;
    }
    
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    return error;
  }

  function validateForm() {
    const newErrors = {};
    
    // Validate all fields
    Object.keys(form).forEach(key => {
      if (key !== 'terms') {
        const error = validateField(key, form[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    });
    
    // Check terms acceptance
    if (!form.terms) {
      newErrors.terms = 'Please accept the terms and privacy policy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Mark fields as touched so errors show immediately
    setTouched(prev => ({ 
      ...prev, 
      firstName: true, 
      lastName: true, 
      email: true, 
      country: true, 
      password: true,
      terms: true 
    }));
    
    if (!validateForm()) {
      return;
    }

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      country: form.country,
      password: form.password,
    };
    try {
      const data = await signupMutation.mutateAsync(payload);
      console.log('Signup initiated:', data);
      // Save email for OTP verification step and navigate
      localStorage.setItem('signupEmail', form.email);
      navigate('/otp');
    } catch (err) {
      console.error('Signup error:', err?.message || err);
    }
  }

  // Disable submit if required fields are empty or there are known errors
  const isFormFilled = 
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&
    form.country.trim() &&
    form.password.trim() &&
    form.terms;
  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <div className="min-h-screen flex items-center justify-center p-3">
      <div className="relative w-full max-w-[820px] h-full py-4 bg-[#F4F4F4] rounded-2xl flex flex-col items-center shadow-md">
        <div className="absolute left-6 sm:left-8 top-8 sm:top-12">
          <span className="font-inter font-bold text-[24px] leading-[29px] text-[#023AA2]">NELAUTOS</span>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-[600px] mx-auto flex flex-col gap-3 pt-[110px] sm:pt-[90px] px-4 sm:px-6" noValidate>
          <h2 className="font-medium text-[28px] sm:text-[28px] leading-[28px] text-[#121212] text-center mb-2">Sign up as Admin</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Input
              label="First Name"
              name="firstName"
              placeholder="Enter firstname"
              value={form.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && errors.firstName}
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Enter lastname"
              value={form.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && errors.lastName}
            />
          </div>
          <Input
            label="Email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
          />
          <div className="relative">
            <Input
              label="Country"
              name="country"
              placeholder="Select country"
              value={form.country}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.country && errors.country}
              inputProps={{ list: 'country-list' }}
            />
            <datalist id="country-list">
              <option value="Nigeria" />
              <option value="Ghana" />
              <option value="Kenya" />
              <option value="South Africa" />
              <option value="Other" />
            </datalist>
          </div>
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
            inputStyle="h-14"
          />
          <div className="flex items-center gap-2 h-6 my-4">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
              className="w-[15px] h-[16px] border border-[#121212] rounded mr-2 cursor-pointer mt-1"
              id="terms"
            />
            <label htmlFor="terms" className="font-normal text-[13px] leading-5 text-black/50 cursor-pointer">
              Accept the <span className="text-[#023AA2] font-semibold">Terms</span> and <span className="text-[#023AA2] font-semibold">Privacy Policy</span>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-600 text-sm -mt-4">{errors.terms}</p>
          )}
          {signupMutation.isError && (
            <p className="text-red-600 text-sm">{signupMutation.error?.message}</p>
          )}
          <Button 
            type="submit" 
            disabled={signupMutation.isPending || !isFormFilled || hasErrors}
          >
            {signupMutation.isPending ? 'Creating account...' : 'Sign Up'}
          </Button>
          <div className="flex justify-center items-center gap-1 mt-2">
            <span className="font-medium text-[13px] leading-5 text-[#121212]/66">
              Already have an account?
            </span>
            <Link
              to="/login"
              className="font-medium text-[13px] leading-5 text-[#023AA2] hover:underline"
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