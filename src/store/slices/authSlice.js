import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorageUserData, clearLocalStorageData } from "@/utils";

const initialState = {
  isAuthenticated: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.userData = action.payload;
      state.isAuthenticated = true;
      setLocalStorageUserData({
        userData: action.payload,
        isAuthenticated: true,
      });
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userData = null;
      clearLocalStorageData();
      // console.log("logout");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
