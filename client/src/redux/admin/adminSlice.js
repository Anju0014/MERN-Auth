import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null, 
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.admin = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    LogOut: (state) => {
      state.admin = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, LogOut } = adminSlice.actions;
export default adminSlice.reducer;
