import {ActionConstants} from '../../constants';
import {generateOtpError, generateOtpSuccess} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(generateOtpSuccess(response.data));
    } else {
      yield put(generateOtpError(response));
    }
  } catch (err) {
    yield put(generateOtpError(err));
  }
}

export function* otpWatcher() {
  yield all([takeLatest(ActionConstants.GENERATE_OTP_REQUEST, request)]);
}
export default otpWatcher;
