import { all } from 'redux-saga/effects';
import { watchAuthSaga } from './authSaga';
import { watchHomeSaga } from './homeSaga';

export default function* rootSaga() {
  yield all([watchAuthSaga(), watchHomeSaga()]);
}