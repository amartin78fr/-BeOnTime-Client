import {ActionConstants} from '../../constants';
import {registerError, registerSuccess} from '../../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api} from './api';
import {light} from '../../../components/theme/colors';
import {Alerts} from '../../../utils/commonUtils';

export function* request(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response.data.status === 1) {
      yield put(registerSuccess(response.data));
      Alerts('', response.data.message, light.success);
    } else {
      yield put(registerError(response));
      Alerts('', response.data.message, light.danger);
    }
  } catch (err) {
    yield put(registerError(err));
    Alerts('', err.response.data.message, light.danger);
  }
}

export function* registerWatcher() {
  yield all([takeLatest(ActionConstants.REGISTER_REQUEST, request)]);
}
export default registerWatcher;
