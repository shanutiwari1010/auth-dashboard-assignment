import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import App from "./App";
import { store } from "./store";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GoogleAuthProvider from "./providers/google-provider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleAuthProvider>
        <Provider store={store}>
          <App />
          <Toaster />
        </Provider>
      </GoogleAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
