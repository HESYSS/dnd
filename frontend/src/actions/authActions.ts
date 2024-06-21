import { AuthState } from '../types';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SET_LOADING = 'SET_LOADING';

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: AuthState;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export type AuthActionTypes = LoginSuccessAction | LogoutAction | SetLoadingAction;

export const loginSuccess = (data: AuthState): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});

export const setLoading = (isLoading: boolean): SetLoadingAction => ({
  type: SET_LOADING,
  payload: isLoading,
});

export type { AuthState };
