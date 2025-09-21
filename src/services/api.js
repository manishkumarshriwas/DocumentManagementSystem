import axios from 'axios';

const API_BASE_URL = 'https://apis.allsoft.co/api/documentManagement';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    if (error.response) {
      // Server responded with error status
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Error in request setup
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API functions
export const generateOtp = async (mobileNumber) => {
  try {
    console.log('Sending OTP request for:', mobileNumber);
    const response = await api.post('/generateOTP', { mobile_number: mobileNumber });
    console.log('OTP response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error generating OTP:', error);
    throw error;
  }
};

export const validateOtp = async (mobileNumber, otp) => {
  try {
    console.log('Validating OTP for:', mobileNumber);
    const response = await api.post('/validateOTP', { mobile_number: mobileNumber, otp });
    console.log('OTP validation response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error validating OTP:', error);
    throw error;
  }
};

export const uploadDocument = async (file, documentData) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('data', JSON.stringify(documentData));

  try {
    const response = await api.post('/saveDocumentEntry', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export const searchDocuments = async (searchParams) => {
  try {
    const response = await api.post('/searchDocumentEntry', searchParams);
    return response.data;
  } catch (error) {
    console.error('Error searching documents:', error);
    throw error;
  }
};

export const getDocumentTags = async (term) => {
  try {
    const response = await api.post('/documentTags', { term });
    return response.data;
  } catch (error) {
    console.error('Error getting document tags:', error);
    throw error;
  }
};