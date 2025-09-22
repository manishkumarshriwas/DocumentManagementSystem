import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { generateOtp, validateOtp, emailLogin } from '../services/api';
import { validateMobileNumber, validateOtp as validateOtpUtil, validateEmail } from '../utils/validation';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [loginMethod, setLoginMethod] = useState('mobile'); // 'mobile' or 'email'
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  // Handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError('');
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

  // Send OTP (for mobile login)
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
      
      if (response.status === true || response.success === true) {
        setSuccess('OTP sent successfully!');
        setShowOtpSection(true);
        setTimer(120); // Reset timer
        setIsRegistered(true);
      } else {
        const errorMessage = response.data || response.message || 'Failed to send OTP';
        
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
          setError(data.message || 'Failed to send OTP');
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

  // Verify OTP (for mobile login)
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
      
      if (response.status === true || response.success === true) {
        if (response.token) {
          login(response.token);
          navigate(from, { replace: true });
        } else {
          setError('Authentication successful but no token received');
        }
      } else {
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

  // Email login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setApiError(null);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);
    try {
      const response = await emailLogin(email, password);
      console.log('Email login response:', response);
      
      if (response.status === true || response.success === true) {
        if (response.token) {
          login(response.token);
          navigate(from, { replace: true });
        } else {
          setError('Authentication successful but no token received');
        }
      } else {
        const errorMessage = response.data || response.message || 'Login failed';
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Email login error:', err);
      setApiError(err);
      
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data;
        
        if (status === 400) {
          setError(data.message || 'Invalid email or password');
        } else if (status === 401) {
          setError('Incorrect email or password');
        } else if (status === 429) {
          setError('Too many attempts. Please try again later.');
        } else if (status >= 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(data.message || 'Login failed');
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
        const errorMessage = response.data || response.message || 'Failed to resend OTP';
        
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
    navigate('/register');
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
          {loginMethod === 'mobile' 
            ? "We'll send a one-time password to your mobile phone" 
            : "Enter your email and password to sign in"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 backdrop-blur-sm bg-white/80 border border-white/20">
          <div className="space-y-6">
            {/* Login method toggle */}
            <div className="flex border-b border-gray-200">
              <button
                className={`py-2 px-4 text-center font-medium text-sm w-1/2 ${
                  loginMethod === 'mobile'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setLoginMethod('mobile')}
              >
                Mobile Login
              </button>
              <button
                className={`py-2 px-4 text-center font-medium text-sm w-1/2 ${
                  loginMethod === 'email'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setLoginMethod('email')}
              >
                Email Login
              </button>
            </div>

            {loginMethod === 'mobile' ? (
              // Mobile login form
              <>
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
              </>
            ) : (
              // Email login form
              <form onSubmit={handleEmailLogin}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-3"
                      placeholder="you@example.com"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md py-3 px-3"
                      placeholder="••••••••"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:-translate-y-1"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </form>
            )}

            {!isRegistered && loginMethod === 'mobile' && (
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

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="/register"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300"
              >
                Create an account
              </a>
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