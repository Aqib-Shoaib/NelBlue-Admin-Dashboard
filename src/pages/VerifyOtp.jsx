import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [email] = useState('victorokeke43@gmail.com'); // Replace with actual email if available
  const [resendLoading, setResendLoading] = useState(false);

  function handleOtpChange(e) {
    setOtp(e.target.value);
  }

  function handleVerify(e) {
    e.preventDefault();
    console.log('Verify OTP submit:', { email, otp });
  }

  function handleResend() {
    setResendLoading(true);
    // Add resend OTP logic here
    setTimeout(() => setResendLoading(false), 2000);
  }

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
        <form onSubmit={handleVerify} className="w-full max-w-[720px] mx-auto flex flex-col items-center gap-6 p-6 sm:p-8">
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
              inputStyle="h-14"
              inputProps={{ maxLength: 6, autoComplete: 'one-time-code', inputMode: 'numeric' }}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2 w-full max-w-[720px]">
            <Button
              type="button"
              style='secondary'
              onClick={handleResend}
              disabled={resendLoading}
            >
              {resendLoading ? 'Sending...' : 'Send again'}
            </Button>
            <Button
              type="submit"
            >
              Check email box
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;