import React, { useState } from 'react';
import axios from 'axios';
import './EmailVerification.js.css';

const EmailVerification = ({ onVerify }) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post('https://todoApp-backend.cloud-stacks.com/api/v1/verifyEmail', {
        email,
        verificationCode,
      });

      if (response.data.success) {
        setIsVerified(true);
        onVerify(email);
      } else {
        setErrorMessage('Invalid verification code');
      }
    } catch (error) {
      setErrorMessage('An error occurred during email verification');
    }
  };

  return (
    <div className="email-verification">
      {!isVerified ? (
        <>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="verification-code">Verification Code</label>
            <input
              id="verification-code"
              type="text"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
            />
          </div>
          <button onClick={handleVerifyEmail}>Verify Email</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </>
      ) : (
        <div className="verified-message">Email Verified Successfully</div>
      )}
    </div>
  );
};

export default EmailVerification;
