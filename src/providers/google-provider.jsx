import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AUTH_GOOGLE_CLIENT_ID } from "@/config/vars";

const GoogleAuthProvider = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId="455334685417-3t7gi7l3h2jhj70tr0hbfrf57sb1k3he.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;
