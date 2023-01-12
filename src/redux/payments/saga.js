import {ActionConstants} from '../constants';
import {
  makePaymentError,
  makePaymentSuccess,
  getCardsError,
  getCardsSuccess,
} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {billingApi, cardsApi, paymentApi} from './api';
import {Alerts} from '../../utils/commonUtils';
import {light} from '../../components/theme/colors';
import {getBillingError, getBillingSuccess} from './action';

export function* request(action) {
  try {
    const response = yield call(paymentApi, action.payload);
    if (response.data.status === 1) {
      yield put(makePaymentSuccess(response.data));
    } else {
      yield put(makePaymentError(response));
      Alerts('', response.data.data.code, light.danger);
    }
  } catch (err) {
    yield put(makePaymentError());
  }
}
export function* cardRequest(action) {
  try {
    const response = yield call(cardsApi, action.payload);
    if (response.data.status === 1) {
      yield put(getCardsSuccess(response.data.data));
    } else {
      yield put(getCardsError(response));
    }
  } catch (err) {
    yield put(getCardsError());
  }
}
export function* billingRequest(action) {
  try {
    const response = yield call(billingApi);
    if (response.data.status === 1) {
      yield put(getBillingSuccess(response.data.data));
    } else {
      yield put(getBillingError(response));
    }
  } catch (err) {
    yield put(getBillingError());
  }
}
export function* paymentWatcher() {
  yield all([takeLatest(ActionConstants.MAKE_PAYMENT_REQUEST, request)]);
  yield all([takeLatest(ActionConstants.GET_CARDS_REQUEST, cardRequest)]);
  yield all([
    takeLatest(ActionConstants.GET_BILLIG_DETAILS_REQUEST, billingRequest),
  ]);
}
export default paymentWatcher;
