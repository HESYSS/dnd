export interface Adventure {
  id: number;
  name: string;
  description: string;
  image: {
    data: Uint8Array;
  } 
  customMonsters: any; 
  battlefieldMaps: {
    data: Uint8Array[];
  }
  gmId: number;
}

export interface Monster {
  id: number;
  data: any; 
  adventureId: number;
}

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface Friend {
  friend: {
    id: number;
    username: string;
  };
}

export interface FriendRequest {
  id: number;
  sender: {
    id: number;
    username: string;
  };
}

export interface AuthState {
  userId: number | null;
  userIsRegistered: boolean;
  adventures: {
    isInAdventure: number[];
    adventure: Adventure;
  }[];
  monsters: Monster[];
  friends: Friend[];
  friendRequests: FriendRequest[];
  loading: boolean;
}

export interface RootState {
  auth: AuthState;
}

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
