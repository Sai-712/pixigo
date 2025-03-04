import React from 'react';
import { GoogleLogin as GoogleLoginButton } from '@react-oauth/google';

interface GoogleLoginProps {
  onSuccess: (credentialResponse: any) => void;
  onError: () => void;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ onSuccess, onError }) => {
  return (
    <div className="flex justify-center">
      <GoogleLoginButton
        onSuccess={onSuccess}
        onError={onError}
        useOneTap={false}
        type="standard"
        theme="outline"
        text="signin_with"
        shape="rectangular"
        logo_alignment="left"
      />
    </div>
  );
};

export default GoogleLogin;