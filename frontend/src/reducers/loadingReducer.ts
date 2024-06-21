import { SET_LOADING, AuthActionTypes } from '../actions/authActions';

const initialState = false;

const loadingReducer = (state = initialState, action: AuthActionTypes): boolean => {
  switch (action.type) {
    case SET_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export default loadingReducer;
