import { call, put, takeEvery } from 'redux-saga/effects';
import { createHomeSuccess, createHomeFailure, CREATE_HOME_REQUEST, getHomeSuccess, getHomeFailure, GET_HOME_REQUEST, getHomeDetailsSuccess, getHomeDetailsFail, GET_HOME_DETAILS_FAILURE, GET_HOME_DETAILS_REQUEST } from '../actions/homeActions';
import { CreateHome, GetAllHomes, GetHomeDetails } from '../../api/service/homeService';
import { INCREMENT_LOADING, DECREMENT_LOADING } from '../actions/loadingAction';
import { navigate } from '../../navigation/navigationService';
import { USER_HOME_DETAILS_KEY, USER_HOMES_LIST_KEY } from '../../utils/constants';
import StorageService from '../../services/localStorageService';
function* createHomeSaga(action) {
  try {
    yield put({ type: INCREMENT_LOADING, payload: { title: "Create Homes..." } })
    const response = yield call(CreateHome, action.payload.data);
    yield put(createHomeSuccess(response));
    navigate('CreateFloor', { noOfSteps: action.payload.noOfSteps, currentStep: 1 + action.payload.currentStep, parentId: response.id })
  } catch (error) {
    yield put(createHomeFailure(error.message));
  } finally {
    yield put({ type: DECREMENT_LOADING })
  }
}

function* getHomeSaga(action) {
  try {
    if (action.payload?.showLoader) {
      yield put({ type: INCREMENT_LOADING, payload: { title: "Fetching Homes..." } })
    }
    const response = yield call(GetAllHomes, action.payload.data);
    StorageService.storeData(USER_HOMES_LIST_KEY, response);
    yield put(getHomeSuccess(response));
  } catch (error) {
    if (error.status == 401) {
      console.log("Retry")
      // dispatchService.dispatch({type: GET_HOME_REQUEST, payload: action.payload})
    }
    yield put(getHomeFailure(error.message));
  } finally {
    if (action.payload?.showLoader) {
      yield put({ type: DECREMENT_LOADING })
    }
  }
}

function* getHomeDetials(action) {
  try {
    if (action.payload?.showLoader) {
      yield put({ type: INCREMENT_LOADING, payload: { title: "Getting Home Details..." } })
    }
    const response = yield call(GetHomeDetails, action.payload.id);
    StorageService.storeData(USER_HOME_DETAILS_KEY, response);
    yield put(getHomeDetailsSuccess(response));

  } catch (error) {
    yield put(getHomeDetailsFail(error.message));
  } finally {
    if (action.payload?.showLoader) {
      yield put({ type: DECREMENT_LOADING })
    }
  }
}

export function* watchHomeSaga() {
  yield takeEvery(CREATE_HOME_REQUEST, createHomeSaga);
  yield takeEvery(GET_HOME_REQUEST, getHomeSaga);
  yield takeEvery(GET_HOME_DETAILS_REQUEST, getHomeDetials);
}