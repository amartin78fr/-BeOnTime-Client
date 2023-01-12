import {ActionConstants} from '../../constants';
import {profileError, profileSuccess} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api, updateApi} from './api';
import {
  profileRequest,
  updateProfileError,
  updateProfileSuccess,
} from './action';
import {Alerts} from '../../../utils/commonUtils';
import {light} from '../../../components/theme/colors';
import * as navigation from '../../../routes/NavigationService';

export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response) {
      yield put(profileSuccess(response.data));
      Alerts('', response.data.message, light.success);
    } else {
      yield put(profileError(response));
      Alerts('', response.data.message, light.danger);
    }
  } catch (err) {
    yield put(profileError(err));
    Alerts('', err.response.data.message, light.danger);
  }
}
export function* updateRequest(action) {
  try {
    const response = yield call(updateApi, action.payload);
    if (response) {
      yield put(profileRequest());
      yield put(updateProfileSuccess(response.data));
      Alerts('', response.data.message, light.success);
      navigation.navigate('Home');
    } else {
      yield put(profileError(response));
      yield put(updateProfileError(response));
      Alerts('', response.data.message, light.danger);
    }
  } catch (err) {
    yield put(profileError(err));
    yield put(updateProfileError(err));
    Alerts('', err.response.data.message, light.danger);
  }
}

export function* profileWatcher() {
  yield all([takeLatest(ActionConstants.PROFILE_REQUEST, request)]);
  yield all([
    takeLatest(ActionConstants.UPDATE_PROFILE_REQUEST, updateRequest),
  ]);
}
export default profileWatcher;
