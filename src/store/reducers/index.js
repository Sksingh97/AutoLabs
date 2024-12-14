import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { homeReducer } from './homeReducer';
import { loadingReducer } from './loadingReducer';
import { floorReducer } from './floorReducer';
import { roomReducer } from './roomReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  loader: loadingReducer,
  floor: floorReducer,
  room: roomReducer,
});