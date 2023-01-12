import {ActionConstants} from '../constants';
// Agent List
export const getChatRequest = (payload) => {
  return {
    type: ActionConstants.GET_CHAT_REQUEST,
    payload,
    res: false,
  };
};
export const getChatSuccess = (data) => {
  return {
    type: ActionConstants.GET_CHAT_SUCCESS,
    data,
    res: true,
  };
};
export const getChatError = (error) => {
  return {
    type: ActionConstants.GET_CHAT_ERROR,
    error,
    res: false,
  };
};

export const getChatByIdRequest = (payload) => {
  return {
    type: ActionConstants.GET_CHAT_BY_ID_REQUEST,
    res: false,
    payload,
  };
};
export const getChatByIdSuccess = (data) => {
  return {
    type: ActionConstants.GET_CHAT_BY_ID_SUCCESS,
    data,
    res: true,
  };
};
export const getChatByIdError = (error) => {
  return {
    type: ActionConstants.GET_CHAT_BY_ID_ERROR,
    error,
    res: false,
  };
};
export const getChatByIdFlush = () => {
  return {
    type: ActionConstants.GET_CHAT_BY_ID_FLUSH,
  };
};

export const operatorChatRequest = (payload) => {
  return {
    type: ActionConstants.OPERATOR_CHAT_REQUEST,
    res: false,
    payload,
  };
};
export const operatorChatSuccess = (data) => {
  return {
    type: ActionConstants.OPERATOR_CHAT_SUCCESS,
    data,
    res: true,
  };
};
export const operatorChatError = (error) => {
  return {
    type: ActionConstants.OPERATOR_CHAT_ERROR,
    error,
    res: false,
  };
};
export const operatorChatFlush = () => {
  return {
    type: ActionConstants.OPERATOR_CHAT_FLUSH,
  };
};
