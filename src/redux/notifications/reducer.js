import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';
const initialState = {
  loading: false,
  data: [],
  error: '',
  isSuccess: false,
};
export function notifications(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.GET_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        isSuccess: false,
      };
    case ActionConstants.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        isSuccess: true,
      };
    case ActionConstants.GET_NOTIFICATIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
      };
    default:
      return state;
  }
}

const initialDeleteState = {
  loading: false,
  data: [],
  error: '',
  isSuccess: false,
};
export function delNotfications(state = initialDeleteState, action) {
  switch (action.type) {
    case ActionConstants.DELETE_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        isSuccess: false,
      };
    case ActionConstants.DELETE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        isSuccess: true,
      };
    case ActionConstants.DELETE_NOTIFICATIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
      };
    default:
      return state;
  }
}

const reducer = combineReducers({
  notifications,
  delNotfications,
});
export default reducer;
