import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { homeReducer } from './homeReducer';
import { loadingReducer } from './loadingReducer';
import { floorReducer } from './floorReducer';
import { roomReducer } from './roomReducer';
import { addDeviceReducer } from './addDeviceReducer';
import { applianceReducer } from './applianceReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  loader: loadingReducer,
  floor: floorReducer,
  room: roomReducer,
  addDevice: addDeviceReducer,
  appliance: applianceReducer
});