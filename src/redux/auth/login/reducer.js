import {ActionConstants} from '../../constants';
const initialState = {
  loading: false,
  user: '',
  error: '',
};
export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    case ActionConstants.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ActionConstants.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    case ActionConstants.CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export default loginReducer;
