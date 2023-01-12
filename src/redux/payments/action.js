import {ActionConstants} from '../constants';
// Agent List
export const makePaymentRequest = (payload) => {
  return {
    type: ActionConstants.MAKE_PAYMENT_REQUEST,
    payload,
    res: false,
  };
};
export const makePaymentSuccess = (data) => {
  return {
    type: ActionConstants.MAKE_PAYMENT_SUCCESS,
    data,
    res: true,
  };
};
export const makePaymentError = (error) => {
  return {
    type: ActionConstants.MAKE_PAYMENT_ERROR,
    error,
    res: false,
  };
};
export const makePaymentFlush = () => {
  return {
    type: ActionConstants.MAKE_PAYMENT_FLUSH,
  };
};

export const getCardsRequest = () => {
  return {
    type: ActionConstants.GET_CARDS_REQUEST,
    res: false,
  };
};
export const getCardsSuccess = (data) => {
  return {
    type: ActionConstants.GET_CARDS_SUCCESS,
    data,
    res: true,
  };
};
export const getCardsError = (error) => {
  return {
    type: ActionConstants.GET_CARDS_ERROR,
    error,
    res: false,
  };
};

export const getBillingRequest = () => {
  return {
    type: ActionConstants.GET_BILLIG_DETAILS_REQUEST,
    res: false,
  };
};
export const getBillingSuccess = (data) => {
  return {
    type: ActionConstants.GET_BILLIG_DETAILS_SUCCESS,
    data,
    res: true,
  };
};
export const getBillingError = (error) => {
  return {
    type: ActionConstants.GET_BILLIG_DETAILS_ERROR,
    error,
    res: false,
  };
};
