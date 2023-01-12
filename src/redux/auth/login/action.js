import {ActionConstants} from '../../constants';

export const loginRequest = (payload) => {
  return {
    type: ActionConstants.LOGIN_REQUEST,
    payload,
    res: false,
  };
};
export const loginSuccess = (data) => {
  return {
    type: ActionConstants.LOGIN_SUCCESS,
    data,
    res: true,
  };
};
export const loginError = (error) => {
  return {
    type: ActionConstants.LOGIN_ERROR,
    error,
    res: false,
  };
};
export const changePasswordRequest = (payload) => {
  return {
    type: ActionConstants.CHANGE_PASSWORD_REQUEST,
    payload,
    res: false,
  };
};
export const changePasswordSuccess = (data) => {
  return {
    type: ActionConstants.CHANGE_PASSWORD_SUCCESS,
    data,
    res: true,
  };
};
export const changePasswordError = (error) => {
  return {
    type: ActionConstants.CHANGE_PASSWORD_ERROR,
    error,
    res: false,
  };
};
