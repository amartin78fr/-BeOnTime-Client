import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';
const initialState = {
  loading: false,
  data: [],
  error: '',
};
export function socket(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.SOCKET_CONNECTION:
      return {
        ...state,
        loading: true,
        data: action.payload,
      };
    case ActionConstants.SOCKET_DISCONNECT:
      return {
        ...state,
        loading: false,
        data: [],
      };
    case ActionConstants.SOCKET_FLUSH:
      return {
        ...state,
        loading: false,
        data: [],
      };

    default:
      return state;
  }
}
export default socket;
