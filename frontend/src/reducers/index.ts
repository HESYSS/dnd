import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import modalReducer from '../slices/modalSlice';
import userReducer from '../slices/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  modal: modalReducer,
  user: userReducer,
});

export default rootReducer;
