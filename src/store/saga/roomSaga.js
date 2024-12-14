import { call, put, takeEvery } from 'redux-saga/effects';
import { INCREMENT_LOADING, DECREMENT_LOADING } from '../actions/loadingAction';
import { CREATE_ROOM_REQUEST, GET_ROOM_REQUEST, createRoomSuccess, createRoomFailure, getRoomSuccess, getRoomFailure } from '../actions/roomAction'
import { CreateRoom, GetAllRooms } from '../../api/service/roomService';

function* createRoomSaga(action) {
  try {
    yield put({type: INCREMENT_LOADING, payload:{title: "Create Room..."}})
    const response = yield call(CreateRoom, action.payload.data);
    yield put(createRoomSuccess(response));
  } catch (error) {
    yield put(createRoomFailure(error.message));
  } finally {
    yield put({type: DECREMENT_LOADING})
  }
}

function* getRoomSaga(action) {
  try {
    yield put({type: INCREMENT_LOADING, payload:{title: "Fetching Rooms..."}})
    console.log("GET FLORS : ::  :", action.payload)
    const response = yield call(GetAllRooms, action.payload);
    yield put(getRoomSuccess(response));
  } catch (error) {
    yield put(getRoomFailure(error.message));
  } finally {
    yield put({type: DECREMENT_LOADING})
  }
}

export function* watchRoomSaga() {
  yield takeEvery(CREATE_ROOM_REQUEST, createRoomSaga);
  yield takeEvery(GET_ROOM_REQUEST, getRoomSaga);
}