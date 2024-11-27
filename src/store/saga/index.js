import { all } from 'redux-saga/effects';
import { watchAuthSaga } from './authSaga';
import { watchHomeSaga } from './homeSaga';
import { watchFloorSaga } from './floorSaga';
import { watchRoomSaga } from './roomSaga';

export default function* rootSaga() {
  yield all([watchAuthSaga(), watchHomeSaga(), watchFloorSaga(), watchRoomSaga()]);
}