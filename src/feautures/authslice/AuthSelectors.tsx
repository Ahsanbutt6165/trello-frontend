import { RootState } from "../store/store";

export const selectUser = (state: RootState) => state.auth.user;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuth;

export const selectLoading = (state: RootState) => state.auth.loading;

export const selectBtnLoading = (state: RootState) => state.auth.btnLoading;

export const selectAuthError = (state: RootState) => state.auth.error;
