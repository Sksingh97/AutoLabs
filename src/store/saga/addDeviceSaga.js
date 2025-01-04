import { call, put, takeEvery } from 'redux-saga/effects';
import { INCREMENT_LOADING, DECREMENT_LOADING } from '../actions/loadingAction';
import { GetAllDeviceType } from '../../api/service/addDeviceService';
import { GET_DEVICE_TYPE_REQUEST, getDeviceTypeFail, getDeviceTypeSuccess } from '../actions/addDeviceAction';

function* getAllDeviceTypeSaga(action) {
  try {
    console.log("Fetching device type ;;;;;;;;;")
    yield put({type: INCREMENT_LOADING, payload:{title: "Fetching Device Types..."}})
    const response = yield call(GetAllDeviceType);
    yield put(getDeviceTypeSuccess(response));
  } catch (error) {
    if(error.status == 401) {
      console.log("Retry");
    }
    yield put(getDeviceTypeFail(error.message));
  } finally {
    yield put({type: DECREMENT_LOADING})
  }
}


export function* watchAddDeviceSaga() {
  yield takeEvery(GET_DEVICE_TYPE_REQUEST, getAllDeviceTypeSaga);
}