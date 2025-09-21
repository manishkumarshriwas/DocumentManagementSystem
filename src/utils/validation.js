export const validateMobileNumber = (mobileNumber) => {
  // Check if mobile number is exactly 10 digits
  return /^\d{10}$/.test(mobileNumber);
};

export const validateOtp = (otp) => {
  // Check if OTP is exactly 6 digits
  return /^\d{6}$/.test(otp);
};