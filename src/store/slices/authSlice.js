import { SERVICES, STORAGE_KEY_USER } from "@/utils/constant";
import { deleteLocalStorage, getLocalStorage, setLocalStorage } from "@/utils/storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: getLocalStorage(STORAGE_KEY_USER),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      setLocalStorage(STORAGE_KEY_USER, action.payload);
      if (action.payload?.accessToken) {
        setLocalStorage(SERVICES.ACCESS_TOKEN, action.payload.accessToken);
      }
    },
    clearUser: (state) => {
      state.userInfo = null;
      deleteLocalStorage(STORAGE_KEY_USER);
      deleteLocalStorage(SERVICES.ACCESS_TOKEN);
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const selectUserInfo = (state) => state.auth.userInfo;
export const selectIsLoggedIn = (state) => Boolean(state.auth.userInfo);

export const authReducer = authSlice.reducer;
