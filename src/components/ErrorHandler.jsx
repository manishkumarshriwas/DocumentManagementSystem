import React from 'react';
import { Alert, AlertTitle, Collapse } from '@mui/material';

const ErrorHandler = ({ error, onClose }) => {
  if (!error) return null;

  let errorMessage = 'An unknown error occurred';
  let errorTitle = 'Error';

  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error.message) {
    errorMessage = error.message;
  } else if (error.response && error.response.data) {
    errorMessage = error.response.data.message || 'Server error';
    errorTitle = error.response.data.error || 'Error';
  }

  return (
    <Collapse in={!!error}>
      <Alert severity="error" onClose={onClose} sx={{ mb: 2 }}>
        <AlertTitle>{errorTitle}</AlertTitle>
        {errorMessage}
      </Alert>
    </Collapse>
  );
};

export default ErrorHandler;