import { call, put, takeEvery } from 'redux-saga/effects';
import { AUTH_REQUEST, authSuccess, authFailure, otpSuccess, otpFailure, OTP_REQUEST, RESEND_OTP, otpVerifySuccess, otpVerifyFailure, OTP_VERIFY_REQUEST, loadUserDetails, loadUserDetailsSuccess, loadUserDetailsFailure, LOAD_USER_DETAILS_REQUEST } from '../actions/authAction';
import axios from 'axios';
import { SIGN_UP } from '../../api/constants';
import { CreateAccount, VerifyOTP, SendOTP } from '../../api/service/authentication'; 
import { INCREMENT_LOADING, DECREMENT_LOADING } from '../actions/loadingAction';
import { navigate } from '../../navigation/navigationService';
import StorageService from '../../services/localStorageService';
import { USER_DETAILS_KEY } from '../../utils/constants';
import BootSplash from 'react-native-bootsplash';


function* otpSaga(action) {
  try{
    yield put({type: INCREMENT_LOADING})
    const response = yield call(SendOTP, action.payload);
    yield put(otpSuccess(response))

    console.log("IN SUCCESS ACESSING DATA", JSON.stringify(response))
    navigate('OTP', {mobile_number:action.payload.mobile_number, name: response.data.name, is_login: true});
  } catch (error) {
    console.log("ERROR: : : :", error)
    yield put(otpFailure(error.message));
  } finally {
    yield put({type: DECREMENT_LOADING})
  }
}

function* authSaga(action) {
  try {
    yield put({type: INCREMENT_LOADING})
    const response = yield call(CreateAccount, action.payload);
    yield put(authSuccess(response));
    navigate('OTP', {...action.payload, is_login: false});
  } catch (error) {
    yield put(authFailure(error.message));
  } finally {
    yield put({ type: DECREMENT_LOADING });
  }
}

function* resendOtpSaga(action) {
  try {
    yield put({type: INCREMENT_LOADING})
    const response = yield call(CreateAccount, action.payload);
    yield put(otpVerifySuccess(response));
  } catch (error) {
    yield put(otpVerifyFailure(error.message));
  } finally {
    yield put({ type: DECREMENT_LOADING });
  }
}

function* verifyOtp(action) {
  try {
    yield put({type: INCREMENT_LOADING})
    const response = yield call(VerifyOTP, action.payload);
    //store token in local storage
    StorageService.storeData(
      USER_DETAILS_KEY, 
      {
        name: action.payload.name, 
        mobile_number: action.payload.mobile_number,
        token: response.data.access_token,
        ref_token: response.data.refresh_token
      })
    yield put(otpVerifySuccess(response.data));
  } catch (error) {
    yield put(otpVerifyFailure(error.message));
  } finally {
    yield put({ type: DECREMENT_LOADING });
  }
}

function* loadDataFromStoreSaga(action) {
  try {
    const response = yield call(StorageService.getData, USER_DETAILS_KEY);
    console.log("STORE SUCCESS : :", response)
    yield put (loadUserDetailsSuccess(response))
  } catch (error) {
    console.log("STORE FAILURE : :", error)
    yield put (loadUserDetailsFailure);
  } finally {
    BootSplash.hide();
  }
}



export function* watchAuthSaga() {
  yield takeEvery(AUTH_REQUEST, authSaga);
  yield takeEvery( RESEND_OTP, resendOtpSaga);
  yield takeEvery( OTP_REQUEST, otpSaga);
  yield takeEvery( OTP_VERIFY_REQUEST, verifyOtp);
  yield takeEvery ( LOAD_USER_DETAILS_REQUEST, loadDataFromStoreSaga);
}