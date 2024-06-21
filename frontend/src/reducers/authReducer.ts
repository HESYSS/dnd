import { AuthState, AuthActionTypes, LOGIN_SUCCESS, LOGOUT, SET_LOADING } from '../actions/authActions';

const initialState: AuthState = {
  userId: null,
  userIsRegistered: false,
  loading: false,
  adventures: [],
  monsters: [], 
  friends: [],
  friendRequests: [],
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case LOGIN_SUCCESS: {
      const { userId, userIsRegistered, adventures, friends, friendRequests } = action.payload;
      if (userId !== null) {
        localStorage.setItem('id', userId.toString()); 
      }
      return {
        ...state,
        userId,
        userIsRegistered,
        adventures,
        friends,
        friendRequests,
        loading: false,
      };
    }
    case LOGOUT: {
      localStorage.removeItem('id'); 
      return {
        ...state,
        userId: null,
        userIsRegistered: false,
        adventures: [],
        friends: [],
        friendRequests: [],
      };
    }
    default:
      return state;
  }
};

export default authReducer;
