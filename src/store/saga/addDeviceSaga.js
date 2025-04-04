import { call, put, takeEvery } from 'redux-saga/effects';
import { INCREMENT_LOADING, DECREMENT_LOADING } from '../actions/loadingAction';
import { CreateDevice, GetAllDeviceType, SendDeviceConfig } from '../../api/service/addDeviceService';
import { CREATE_DEVICE_REQUEST, createDeviceFail, createDeviceSuccess, GET_DEVICE_TYPE_REQUEST, getDeviceTypeFail, getDeviceTypeSuccess, SEND_DEVICE_CONFIG_REQUEST, sendDeviceConfigFail, sendDeviceConfigSuccess } from '../actions/addDeviceAction';

function* getAllDeviceTypeSaga(action) {
  try {
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

function* createDeviceSaga(action) {
  try {
    const response = yield call(CreateDevice, action.payload.data);
    yield put(createDeviceSuccess(response, action.payload.nextStep));
  } catch (error) {
    if(error.status == 401) {
      console.log("Retry");
    }
    yield put(createDeviceFail(error.message));
  }
}

function* sendDeviceConfigSage(action) {
  try {
    const response = yield call(SendDeviceConfig, action.payload.data);
    yield put(sendDeviceConfigSuccess());
  } catch (error) {
    if(error.status == 401) {
      console.log("Retry");
    }
    yield put(sendDeviceConfigFail(error.message));
  }
}


export function* watchAddDeviceSaga() {
  yield takeEvery(GET_DEVICE_TYPE_REQUEST, getAllDeviceTypeSaga);
  yield takeEvery(CREATE_DEVICE_REQUEST, createDeviceSaga);
  yield takeEvery(SEND_DEVICE_CONFIG_REQUEST, sendDeviceConfigSage);
}