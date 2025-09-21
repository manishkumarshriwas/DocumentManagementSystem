import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { generateOtp, validateOtp } from '../services/api';
import { validateMobileNumber, validateOtp as validateOtpUtil } from '../utils/validation';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [resendLoading, setResendLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(true); // Assume number is registered by default

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const from = location.state?.from?.pathname || "/dashboard";

  const otpInputRefs = useRef([]);

  // Handle mobile number change
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    setMobileNumber(value);
    if (error) setError('');
    setIsRegistered(true); // Reset registration status when mobile number changes
  };

  // Clear mobile number
  const handleClearMobile = () => {
    setMobileNumber('');
  };

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (value === '' || /^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus to next input
      if (value !== '' && index < 5) {
        otpInputRefs.current[index + 1].focus();
      }
    }
    if (error) setError('');
  };

  // Handle OTP key down (for backspace)
  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  // Send OTP
  const handleSendOtp = async () => {
    setError('');
    setSuccess('');
    setApiError(null);

    if (!validateMobileNumber(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      const response = await generateOtp(mobileNumber);
      console.log('OTP generation response:', response);
      
      // Check if response has status property (API returns status instead of success)
      if (response.status === true || response.success === true) {
        setSuccess('OTP sent successfully!');
        setShowOtpSection(true);
        setTimer(120); // Reset timer
        setIsRegistered(true);
      } else {
        // Handle error message from response
        const errorMessage = response.data || response.message || 'Failed to send OTP';
        
        // Check if the error is about mobile number not being registered
        if (errorMessage.includes('not yet Registered') || errorMessage.includes('not registered')) {
          setIsRegistered(false);
          setError('This mobile number is not registered in our system.');
        } else {
          setError(errorMessage);
        }
      }
    } catch (err) {
      console.error('OTP generation error:', err);
      setApiError(err);
      
      // Handle different error scenarios
      if (err.response) {
        // Server responded with error status
        const status = err.response.status;
        const data = err.response.data;
        
        if (status === 400) {
          setError(data.message || 'Invalid mobile number');
        } else if (status === 429) {
          setError('Too many requests. Please try again later.');
        } else if (status >= 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(data.message || 'Failed to send OTP');
        }
      } else if (err.request) {
        // Request was made but no response received
        setError('Network error. Please check your connection.');
      } else {
        // Error in request setup
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    setError('');
    setSuccess('');
    setApiError(null);

    const otpValue = otp.join('');
    if (!validateOtpUtil(otpValue)) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await validateOtp(mobileNumber, otpValue);
      console.log('OTP validation response:', response);
      
      // Check if response has status property (API returns status instead of success)
      if (response.status === true || response.success === true) {
        if (response.token) {
          login(response.token);
          navigate(from, { replace: true });
        } else {
          setError('Authentication successful but no token received');
        }
      } else {
        // Handle error message from response
        const errorMessage = response.data || response.message || 'Invalid OTP';
        setError(errorMessage);
      }
    } catch (err) {
      console.error('OTP validation error:', err);
      setApiError(err);
      
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data;
        
        if (status === 400) {
          setError(data.message || 'Invalid OTP');
        } else if (status === 429) {
          setError('Too many attempts. Please try again later.');
        } else if (status >= 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(data.message || 'Failed to verify OTP');
        }
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setError('');
    setSuccess('');
    setApiError(null);
    setResendLoading(true);

    try {
      const response = await generateOtp(mobileNumber);
      console.log('OTP resend response:', response);
      
      // Check if response has status property (API returns status instead of success)
      if (response.status === true || response.success === true) {
        setSuccess('OTP resent successfully!');
        setOtp(['', '', '', '', '', '']);
        setTimer(120); // Reset timer
        setIsRegistered(true);
        // Focus first OTP input
        if (otpInputRefs.current[0]) {
          otpInputRefs.current[0].focus();
        }
      } else {
        // Handle error message from response
        const errorMessage = response.data || response.message || 'Failed to resend OTP';
        
        // Check if the error is about mobile number not being registered
        if (errorMessage.includes('not yet Registered') || errorMessage.includes('not registered')) {
          setIsRegistered(false);
          setError('This mobile number is not registered in our system.');
        } else {
          setError(errorMessage);
        }
      }
    } catch (err) {
      console.error('OTP resend error:', err);
      setApiError(err);
      
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data;
        
        if (status === 400) {
          setError(data.message || 'Invalid mobile number');
        } else if (status === 429) {
          setError('Too many requests. Please try again later.');
        } else if (status >= 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(data.message || 'Failed to resend OTP');
        }
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setResendLoading(false);
    }
  };

  // Timer countdown
  useEffect(() => {
    let interval;
    if (showOtpSection && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [showOtpSection, timer]);

  // Format timer as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle registration
  const handleRegister = () => {
    // For now, just show a message that registration is not available
    setError('Registration is not available at this time. Please use a registered mobile number.');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements from the design */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-80"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
        <div className="absolute top-36 -left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80')] bg-cover opacity-10"></div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We'll send a one-time password to your mobile phone
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 backdrop-blur-sm bg-white/80 border border-white/20">
          <div className="space-y-6">
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">+91</span>
                </div>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                  placeholder="9876543210"
                  maxLength="10"
                  value={mobileNumber}
                  onChange={handleMobileChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button 
                    type="button" 
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 ease-in-out transform hover:scale-105 mr-2"
                    onClick={handleClearMobile}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">Enter a 10-digit mobile number</p>
            </div>

            {showOtpSection && (
              <div id="otpSection">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  One-Time Password
                </label>
                <div className="mt-1 flex justify-between space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="w-12 h-12 text-center text-xl border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      ref={(ref) => (otpInputRefs.current[index] = ref)}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-600">Didn't receive code?</p>
                  <button 
                    className="text-sm text-primary-600 hover:text-primary-500 font-medium transition-colors duration-200 ease-in-out"
                    onClick={handleResendOtp}
                    disabled={resendLoading || timer > 0}
                  >
                    {resendLoading ? 'Sending...' : timer > 0 ? `Resend in ${formatTime(timer)}` : 'Resend OTP'}
                  </button>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <span className="text-gray-500 text-sm countdown">Code expires in {formatTime(timer)}</span>
                </div>
              </div>
            )}

            <div>
              {!showOtpSection ? (
                <button
                  type="button"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:-translate-y-1"
                  id="sendOtpBtn"
                  onClick={handleSendOtp}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              ) : (
                <button
                  type="button"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:-translate-y-1"
                  id="verifyOtpBtn"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              )}
            </div>

            {!isRegistered && (
              <div className="bg-blue-50 border border-blue-400 text-blue-700 px-4 py-3 rounded-md" role="alert">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined mr-2">info</span>
                    <span className="block sm:inline font-medium">Mobile number not registered</span>
                  </div>
                  <p className="mt-2 text-sm">This mobile number is not registered in our system. Please contact your administrator to register your number.</p>
                  <button
                    onClick={handleRegister}
                    className="mt-3 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Request Registration
                  </button>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded-md" role="alert">
                <div className="flex items-center">
                  <span className="material-symbols-outlined mr-2">check_circle</span>
                  <span className="block sm:inline">{success}</span>
                </div>
              </div>
            )}

            {error && !error.includes('not registered') && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert">
                <div className="flex items-center">
                  <span className="material-symbols-outlined mr-2">error</span>
                  <span className="block sm:inline">{error}</span>
                </div>
              </div>
            )}

            {/* Debug information - remove in production */}
            {process.env.NODE_ENV === 'development' && apiError && (
              <div className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-md text-xs">
                <details>
                  <summary className="cursor-pointer font-medium">Debug Information</summary>
                  <pre className="mt-2 whitespace-pre-wrap break-words">
                    {JSON.stringify(apiError, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300">
                  <i className="fa-brands fa-google text-lg"></i>
                </a>
              </div>
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300">
                  <i className="fa-brands fa-facebook text-lg"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 30px) scale(1.1); }
        }
        .animate-blob {
          animation: blob 10s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-white {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        }
      `}} />
    </div>
  );
};

export default Login;