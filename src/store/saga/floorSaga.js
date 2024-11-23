import { call, put, takeEvery } from 'redux-saga/effects';
import { INCREMENT_LOADING, DECREMENT_LOADING } from '../actions/loadingAction';
import { navigate } from '../../navigation/navigationService';
import {  } from '../actions/floorAction'

function* createFloorSaga(action) {
  try {
    yield put({type: INCREMENT_LOADING, payload:{title: "Create Homes..."}})
    const response = yield call(CreateHome, action.payload.data);
    yield put(createHomeSuccess(response));
    navigate('CreateFloor', {noOfSteps:action.payload.noOfSteps, currentStep:1+action.payload.currentStep, parentId: response.id})
  } catch (error) {
    yield put(createHomeFailure(error.message));
  } finally {
    yield put({type: DECREMENT_LOADING})
  }
}

function* getFloorSaga(action) {
  try {
    yield put({type: INCREMENT_LOADING, payload:{title: "Fetching Homes..."}})
    const response = yield call(GetAllHomes, action.payload.data);
    yield put(getHomeSuccess(response));
  } catch (error) {
    yield put(getHomeFailure(error.message));
  } finally {
    yield put({type: DECREMENT_LOADING})
  }
}

export function* watchHomeSaga() {
  yield takeEvery(CREATE_FLOOR_REQUEST, createFloorSaga);
  yield takeEvery(GET_FLOOR_REQUEST, getFloorSaga);
}