import {ActionConstants} from '../constants';
// Agent List
export const getNotificationRequest = () => {
  return {
    type: ActionConstants.GET_NOTIFICATIONS_REQUEST,
    res: false,
  };
};
export const getNotificationSuccess = (data) => {
  return {
    type: ActionConstants.GET_NOTIFICATIONS_SUCCESS,
    data,
    res: true,
  };
};
export const getNotificationError = (error) => {
  return {
    type: ActionConstants.GET_NOTIFICATIONS_ERROR,
    error,
    res: false,
  };
};
export const deleteNotificationRequest = (payload) => {
  return {
    type: ActionConstants.DELETE_NOTIFICATIONS_REQUEST,
    payload,
    res: false,
  };
};
export const deleteNotificationSuccess = (data) => {
  return {
    type: ActionConstants.DELETE_NOTIFICATIONS_SUCCESS,
    data,
    res: true,
  };
};
export const deleteNotificationError = (error) => {
  return {
    type: ActionConstants.DELETE_NOTIFICATIONS_ERROR,
    error,
    res: false,
  };
};
