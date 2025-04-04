import { call, put, takeEvery, select } from 'redux-saga/effects';
import { UPDATE_APPLIANCE_REQUEST, updateApplianceSuccess, updateApplianceFailure } from '../actions/applianceAction';
import { getHomeDetailsRequest } from '../actions/homeActions';
import { INCREMENT_LOADING, DECREMENT_LOADING } from '../actions/loadingAction';
import { publishApplianceOperation } from '../../api/service/applianceService';
import dispatchService from '../dispatcherService';
import { updateApplianceValue } from '../actions/homeActions';

function* updateApplianceSaga(action) {
  try {
    // yield put({type: INCREMENT_LOADING, payload:{title: "Updating Device..."}});
    
    const requestBody = {
      appliance_id: action.payload.appliance_id,
      value: action.payload.value
    };
    yield put(updateApplianceValue(action.payload.appliance_id, action.payload.value));
    const response = yield call(publishApplianceOperation, requestBody);
    yield put(updateApplianceSuccess(response));
    
    const state = yield select(state => state.home);
    if (state.homes.length > 0) {
        yield put(updateApplianceValue(action.payload.appliance_id, action.payload.value));
    }
  } catch (error) {
    yield put(updateApplianceFailure(error.message));
    yield put(updateApplianceValue(action.payload.appliance_id, action.payload.value == "ON"? "OFF" : "ON"));
  } finally {
    // yield put({type: DECREMENT_LOADING});
  }
}

export function* watchApplianceSaga() {
  yield takeEvery(UPDATE_APPLIANCE_REQUEST, updateApplianceSaga);
}
