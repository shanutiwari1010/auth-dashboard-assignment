// auth0-provider.js
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
// import { useHistory } from "react-router-dom";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "@/config/vars";

const Auth0ProviderWithHistory = ({ children }) => {
//   const history = useHistory();

  //   const onRedirectCallback = (appState) => {
  //     history.push(appState?.returnTo || window.location.pathname);
  //   };

  return (
    <Auth0Provider
      domain="dev-thvfze5s138uvi5n.us.auth0.com"
      clientId="yxCCDk7LyUq5JRn2o7gXdPeADYVEJALC"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
