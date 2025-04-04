import { all } from 'redux-saga/effects';
import { watchAuthSaga } from './authSaga';
import { watchHomeSaga } from './homeSaga';
import { watchFloorSaga } from './floorSaga';
import { watchRoomSaga } from './roomSaga';
import { watchAddDeviceSaga } from './addDeviceSaga';
import { watchApplianceSaga } from './applianceSaga';

export default function* rootSaga() {
  yield all([watchAuthSaga(), watchHomeSaga(), watchFloorSaga(), watchRoomSaga(), watchAddDeviceSaga(), watchApplianceSaga()]);
}