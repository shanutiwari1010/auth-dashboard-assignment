import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import {
  getLocalStorageUserData,
  getLocalStorageIsAuthenticated,
} from "@/utils";

const reducers = {
  auth: authReducer,
};

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState: {
    auth: {
      userData: getLocalStorageUserData(),
      isAuthenticated: getLocalStorageIsAuthenticated(),
    },
  },
  devTools: true,
});
