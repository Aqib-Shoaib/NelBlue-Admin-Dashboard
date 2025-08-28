import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useSignupVerify, useResendOtp } from '../store/useAuth';
import { useNavigate } from 'react-router-dom';

function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [email] = useState(() => localStorage.getItem('signupEmail') || '');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const verifyMutation = useSignupVerify();
  const resendMutation = useResendOtp();
  const navigate = useNavigate();

  function handleOtpChange(e) {
    const value = e.target.value;
    // Only allow numeric input
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      
      // Clear error when user starts typing
      if (errors.otp) {
        setErrors(prev => ({ ...prev, otp: '' }));
      }
    }
  }

  function handleOtpBlur(e) {
    setTouched(prev => ({ ...prev, otp: true }));
    validateOtp(otp);
  }

  function validateOtp(value) {
    let error = '';
    
    if (!value.trim()) {
      error = 'OTP is required';
    } else if (value.length !== 6) {
      error = 'OTP must be exactly 6 digits';
    } else if (!/^\d{6}$/.test(value)) {
      error = 'OTP must contain only numbers';
    }
    
    if (error) {
      setErrors(prev => ({ ...prev, otp: error }));
    } else {
      setErrors(prev => ({ ...prev, otp: '' }));
    }
    
    return error;
  }

  function validateForm() {
    const error = validateOtp(otp);
    return !error;
  }

  async function handleVerify(e) {
    e.preventDefault();
    
    // Mark field as touched so errors show immediately
    setTouched(prev => ({ ...prev, otp: true }));
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const data = await verifyMutation.mutateAsync({ email, otp });
      console.log('OTP verified:', data);
      // Clear saved email and navigate to login
      localStorage.removeItem('signupEmail');
      navigate('/login');
    } catch (err) {
      // React Query surfaces error via verifyMutation.error as well
      console.error('Verify error:', err?.message || err);
    }
  }

  async function handleResend() {
    try {
      await resendMutation.mutateAsync({ email });
    } catch (err) {
      console.error('Resend error:', err?.message || err);
    }
  }

  // Disable submit if required fields are empty or there are known errors
  const isFormFilled = otp.trim().length === 6;
  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="relative w-full max-w-[820px] bg-[#F4F4F4] rounded-2xl flex flex-col items-center shadow-md">
        <div className="w-full flex">
          <div className="p-6 sm:p-8">
            <span className="font-inter font-bold text-[20px] sm:text-[24px] leading-[29px] text-[#023AA2]">NELAUTOS</span>
          </div>
        </div>
        {/* Envelope illustration placeholder */}
        <div className="mt-6">
          <div className="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center">
            <span className="text-4xl sm:text-5xl text-gray-400">📧</span>
          </div>
        </div>
        <form onSubmit={handleVerify} className="w-full max-w-[720px] mx-auto flex flex-col items-center gap-6 p-6 sm:p-8" noValidate>
          <h2 className="font-poppins font-bold text-2xl sm:text-[30px] leading-[30px] text-black text-center">Verify your email to continue</h2>
          <p className="font-poppins font-normal text-base sm:text-[20px] leading-[25px] text-center text-black/60 max-w-[675px]">
            We just sent a 6-digit OTP code to the address: <span className="font-semibold text-black/80">{email}</span>.<br />
            Please enter the code below to verify your address.
          </p>
          <div className="w-full max-w-[420px]">
            <Input
              label="Enter OTP"
              name="otp"
              placeholder="6-digit code"
              value={otp}
              onChange={handleOtpChange}
              onBlur={handleOtpBlur}
              error={touched.otp && errors.otp}
              inputStyle="h-14"
              inputProps={{ 
                maxLength: 6, 
                autoComplete: 'one-time-code', 
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2 w-full max-w-[720px]">
            <Button
              type="button"
              style='secondary'
              onClick={handleResend}
              disabled={resendMutation.isPending}
            >
              {resendMutation.isPending ? 'Sending...' : 'Send again'}
            </Button>
            <Button
              type="submit"
              disabled={verifyMutation.isPending || !isFormFilled || hasErrors}
            >
              {verifyMutation.isPending ? 'Verifying...' : 'Verify'}
            </Button>
          </div>
          {(verifyMutation.isError || resendMutation.isError) && (
            <p className="text-red-600 text-sm">
              {verifyMutation.error?.message || resendMutation.error?.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;