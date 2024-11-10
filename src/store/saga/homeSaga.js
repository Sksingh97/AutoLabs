import { call, put, takeEvery } from 'redux-saga/effects';
import { HOME_REQUEST, homeSuccess, homeFailure } from '../actions/homeActions';

function* homeSaga() {
  try {
    const response = yield call(axios.get, 'https://api.example.com/home');
    yield put(homeSuccess(response.data));
  } catch (error) {
    yield put(homeFailure(error.message));
  }
}

export function* watchHomeSaga() {
  yield takeEvery(HOME_REQUEST, homeSaga);
}