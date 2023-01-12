import {ActionConstants} from '../../constants';
import {
  loginError,
  loginSuccess,
  changePasswordError,
  changePasswordSuccess,
} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api, updatePasswordApi} from './api';
import AsyncStorage from '@react-native-community/async-storage';
import * as navigation from '../../../routes/NavigationService';
import {Alerts} from '../../../utils/commonUtils';
import {light} from '../../../components/theme/colors';
const SaveToken = async (token) => {
  return await AsyncStorage.setItem('token', token.data.accessToken);
};

const SaveData = async (data) => {
  return await AsyncStorage.setItem('user', JSON.stringify(data));
};

export function* loginRequest(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response.data.status === 1) {
      yield call(SaveToken, response.data);
      yield call(SaveData, response.data);
      yield put(loginSuccess(response.data));
      Alerts('', response.data.message, light.success);
      navigation.resetNav('Home');
    } else {
      yield put(loginError(response.data.message));
      Alerts('', response.data.message, light.danger);
    }
  } catch (err) {
    yield put(loginError(err.response.data.message));
    Alerts('', err.response.data.message, light.danger);
  }
}
export function* changePasswordRequest(action) {
  try {
    const response = yield call(updatePasswordApi, action.payload);
    if (response.data.status === 1) {
      yield put(changePasswordSuccess(response.data));
      Alerts('', response.data.message, light.success);
      navigation.goBack();
    } else {
      yield put(changePasswordError(response.data.message));
      Alerts('', response.data.message, light.danger);
    }
  } catch (err) {
    yield put(changePasswordError(err.response.data.message));
    Alerts('', err.response.data.message, light.danger);
  }
}

export function* loginWatcher() {
  yield all([takeLatest(ActionConstants.LOGIN_REQUEST, loginRequest)]);
  yield all([
    takeLatest(ActionConstants.CHANGE_PASSWORD_REQUEST, changePasswordRequest),
  ]);
}
export default loginWatcher;
