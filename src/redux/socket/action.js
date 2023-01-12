import {ActionConstants} from '../constants';

export const socketConnection = (payload) => {
  return {
    type: ActionConstants.SOCKET_CONNECTION,
    payload,
    res: false,
  };
};
export const socketDisconnect = (data) => {
  return {
    type: ActionConstants.SOCKET_DISCONNECT,
    data,
    res: true,
  };
};
export const socketFlush = (error) => {
  return {
    type: ActionConstants.SOCKET_FLUSH,
    error,
    res: false,
  };
};
