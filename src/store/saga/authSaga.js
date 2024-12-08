import { call, put, takeEvery } from 'redux-saga/effects';
import { CREATE_TEMP_USER_REQUEST, 
  LOGIN_OTP_REQUEST, 
  SIGNUP_RESEND_OTP, 
  SIGNUP_VERIFY_REQUEST, 
  LOGIN_VERIFY_REQUEST,
  GET_USER_DETAILS_REQUEST,
  createTempUserFailure, 
  createTempUserSuccess, 
  signupVerifyFailure, 
  signupVerifySuccess,
  loginOtpFailure,
  loginOtpSuccess, 
  loginVerifyFailure, 
  loginVerifySuccess, 
  getUserDetailsFailure, 
  getUserDetailsSuccess,
  REFRESH_TOKEN_REQUEST,
  refreshTokenSuccess,
  refreshTokenFailure,
  UPDATE_LOGIN_STEP_REQUEST,
  updateAuthLoginStepSuccess,
  updateAuthLoginStepFailure} from '../actions/authAction';
import axios from 'axios';
import { SIGN_UP } from '../../api/constants';
import { SignupVerifyOTP, SendLoginOTP, CreateTempUser, LoginVerifyOTP, RefreshToken, UpdateLoginStepReq } from '../../api/service/authentication'; 
import { GetUserDetails } from '../../api/service/userService'
import { INCREMENT_LOADING, DECREMENT_LOADING } from '../actions/loadingAction';
import { navigate } from '../../navigation/navigationService';
import StorageService from '../../services/localStorageService';
import { USER_DETAILS_KEY } from '../../utils/constants';
import BootSplash from 'react-native-bootsplash';
import { act } from 'react';


function* loginSendOtpSaga(action) {
  try{
    yield put({type: INCREMENT_LOADING, payload:{title: "Sending OTP..."}})
    const response = yield call(SendLoginOTP, action.payload);
    yield put(loginOtpSuccess(response))
    console.log(response.data)
    navigate('OTP', {mobile_number:action.payload.mobile_number, name: response.name, is_login: true});
  } catch (error) {
    yield put(loginOtpFailure(error.message));
  } finally {
    yield put({type: DECREMENT_LOADING})
  }
}

function* createTempUserSaga(action) {
  try {
    yield put({type: INCREMENT_LOADING, payload:{title: "Sign Up..."}})
    const response = yield call(CreateTempUser, action.payload);
    yield put(createTempUserSuccess(response));
    navigate('OTP', {...action.payload, is_login: false});
  } catch (error) {
    yield put(createTempUserFailure(error.message));
  } finally {
    yield put({ type: DECREMENT_LOADING });
  }
}

function* signupResendOtpSaga(action) {
  try {
    yield put({type: INCREMENT_LOADING, payload:{title: "Resend OTP..."}})
    const response = yield call(CreateTempUser, action.payload);
    yield put(createTempUserSuccess(response));
  } catch (error) {
    yield put(createTempUserFailure(error.message));
  } finally {
    yield put({ type: DECREMENT_LOADING });
  }
}

function* signupVerifyOtpSaga(action) {
  try {
    yield put({type: INCREMENT_LOADING, payload:{title: "Verifying OTP..."}})
    const response = yield call(SignupVerifyOTP, action.payload);
    StorageService.storeData(
      USER_DETAILS_KEY, 
      {
        name: action.payload.name, 
        mobile_number: action.payload.mobile_number,
        token: response.access_token,
        ref_token: response.refresh_token
      })
    yield put(signupVerifySuccess(response));
    try{
      const userResp = yield call(GetUserDetails);
      yield put(getUserDetailsSuccess(userResp.data))
    } catch(error) {
      yield put(getUserDetailsFailure(error.message));
    }
  } catch (error) {
    yield put(signupVerifyFailure(error.message));
  } finally {
    yield put({ type: DECREMENT_LOADING });
  }
}

function* loginVerifyOtpSaga(action) {
  try {
    yield put({type: INCREMENT_LOADING, payload:{title: "Verifying OTP..."}})
    const response = yield call(LoginVerifyOTP, action.payload);
    StorageService.storeData(
      USER_DETAILS_KEY, 
      {
        name: action.payload.name, 
        mobile_number: action.payload.mobile_number,
        token: response.access_token,
        ref_token: response.refresh_token
      })
    yield put(loginVerifySuccess(response));
    console.log("LOGIN VERIFY: ", response)
    try{
      const userResp = yield call(GetUserDetails);
      yield put(getUserDetailsSuccess(userResp.data))
      console.log("LOGIN VERIFY: ", userResp)
    } catch(error) {
      yield put(getUserDetailsFailure(error.message));
    }
  } catch (error) {
    yield put(loginVerifyFailure(error.message));
  } finally {
    yield put({ type: DECREMENT_LOADING });
  }
}

function* getUserDetailsSaga(action) {
  try {
    yield put({type: INCREMENT_LOADING, payload:{title: "Verifying OTP..."}})
    const response = yield call(GetUserDetails);
    yield put(getUserDetailsSuccess(response));
  } catch (error) {
    yield put(getUserDetailsFailure(error.message));
  } finally {
    yield put({ type: DECREMENT_LOADING });
  }
}


function* refreshTokenSaga(action) {
  try {
    yield put({type: INCREMENT_LOADING, payload:{title: "Authenticating..."}})
    const response = yield call(RefreshToken, {refresh_token:action.payload.ref_token});
    StorageService.storeData(
      USER_DETAILS_KEY, 
      {
        name: action.payload.name, 
        mobile_number: action.payload.mobile_number,
        token: response.access_token,
        ref_token: response.refresh_token
      })
    yield put(refreshTokenSuccess(response));
  } catch (error) {
    yield put(refreshTokenFailure(error.message));
  } finally {
    yield put({ type: DECREMENT_LOADING });
  }
}

function* updateLoginStepSaga(action) {
  try {
    console.log("INSIDE SAGA: :: : ")
    yield put({type: INCREMENT_LOADING, payload:{title: "Processing..."}})
    const response = yield call(UpdateLoginStepReq, action.payload);
    console.log("response : :", response)
    yield put(updateAuthLoginStepSuccess(action.payload));
  } catch (error) {
    console.log(error)
    yield put(updateAuthLoginStepFailure(error.message));
  } finally {
    yield put({ type: DECREMENT_LOADING });
  }
}



export function* watchAuthSaga() {
  yield takeEvery(CREATE_TEMP_USER_REQUEST, createTempUserSaga);
  yield takeEvery( SIGNUP_RESEND_OTP, signupResendOtpSaga);
  yield takeEvery( LOGIN_OTP_REQUEST, loginSendOtpSaga);
  yield takeEvery( SIGNUP_VERIFY_REQUEST, signupVerifyOtpSaga);
  yield takeEvery( LOGIN_VERIFY_REQUEST, loginVerifyOtpSaga);
  yield takeEvery( GET_USER_DETAILS_REQUEST, getUserDetailsSaga);
  yield takeEvery( REFRESH_TOKEN_REQUEST, refreshTokenSaga);
  yield takeEvery( UPDATE_LOGIN_STEP_REQUEST, updateLoginStepSaga);
}