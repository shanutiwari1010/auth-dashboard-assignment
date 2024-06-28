import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AUTH_GOOGLE_CLIENT_ID } from "@/config/vars";

const GoogleAuthProvider = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={AUTH_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;
