import {ActionConstants} from '../constants';
import {
  getChatError,
  getChatSuccess,
  getChatByIdError,
  getChatByIdSuccess,
} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {chatApi, chatApiById, operatorChatApiById} from './api';
import {Alerts} from '../../utils/commonUtils';
import {light} from '../../components/theme/colors';
import {operatorChatError, operatorChatSuccess} from './action';

export function* request(action) {
  try {
    const response = yield call(chatApi, action.payload);
    if (response.data.status === 1) {
      yield put(getChatSuccess(response.data.data));
    } else {
      yield put(getChatError(response));
      Alerts('', response.data.message, light.danger);
    }
  } catch (err) {
    yield put(getChatError());
  }
}
export function* chatByIdRequest(action) {
  try {
    const response = yield call(chatApiById, action.payload);
    if (response.data.status === 1) {
      yield put(getChatByIdSuccess(response.data.data));
    } else {
      yield put(getChatByIdError(response));
      Alerts('', response.data.message, light.danger);
    }
  } catch (err) {
    yield put(getChatByIdError());
  }
}
export function* operatorRequest(action) {
  try {
    const response = yield call(operatorChatApiById, action.payload);
    if (response.data.status === 1) {
      yield put(operatorChatSuccess(response.data.data));
    } else {
      yield put(operatorChatError(response));
      Alerts('', response.data.message, light.danger);
    }
  } catch (err) {
    yield put(operatorChatError());
  }
}
export function* messageWatcher() {
  yield all([takeLatest(ActionConstants.GET_CHAT_REQUEST, request)]);
  yield all([
    takeLatest(ActionConstants.GET_CHAT_BY_ID_REQUEST, chatByIdRequest),
  ]);
  yield all([
    takeLatest(ActionConstants.OPERATOR_CHAT_REQUEST, operatorRequest),
  ]);
}
export default messageWatcher;
