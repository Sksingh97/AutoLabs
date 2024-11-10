import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { homeReducer } from './homeReducer';
import { loadingReducer } from './loadingReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  loader: loadingReducer
});