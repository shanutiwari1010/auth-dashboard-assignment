import { GoogleOAuthProvider } from "@react-oauth/google";

// eslint-disable-next-line react/prop-types
const GoogleAuthProvider = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId="455334685417-3t7gi7l3h2jhj70tr0hbfrf57sb1k3he.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;
