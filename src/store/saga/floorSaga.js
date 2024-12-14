import { call, put, takeEvery } from 'redux-saga/effects';
import { INCREMENT_LOADING, DECREMENT_LOADING } from '../actions/loadingAction';
import { navigate } from '../../navigation/navigationService';
import { CREATE_FLOOR_REQUEST, GET_FLOOR_REQUEST, createFloorSuccess, createFloorFailure, getFloorSuccess, getFloorFailure } from '../actions/floorAction'
import { CreateFloor, GetAllFloors } from '../../api/service/floorService';

function* createFloorSaga(action) {
  try {
    yield put({type: INCREMENT_LOADING, payload:{title: "Create Floor..."}})
    const response = yield call(CreateFloor, action.payload.data);
    yield put(createFloorSuccess(response));
  } catch (error) {
    yield put(createFloorFailure(error.message));
  } finally {
    yield put({type: DECREMENT_LOADING})
  }
}

function* getFloorSaga(action) {
  try {
    yield put({type: INCREMENT_LOADING, payload:{title: "Fetching Floors..."}})
    console.log("GET FLORS : ::  :", action.payload)
    const response = yield call(GetAllFloors, action.payload);
    yield put(getFloorSuccess(response));
  } catch (error) {
    yield put(getFloorFailure(error.message));
  } finally {
    yield put({type: DECREMENT_LOADING})
  }
}

export function* watchFloorSaga() {
  yield takeEvery(CREATE_FLOOR_REQUEST, createFloorSaga);
  yield takeEvery(GET_FLOOR_REQUEST, getFloorSaga);
}