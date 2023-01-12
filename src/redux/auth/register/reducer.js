import {ActionConstants} from '../../constants';
const initialState = {
  loading: false,
  data: {},
  error: '',
  isSuccess: false,
};
export function register(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        isSuccess: false,
      };
    case ActionConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.success,
        isSuccess: true,
      };
    case ActionConstants.REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        isSuccess: false,
      };
    case ActionConstants.REGISTER_FLUSH:
      return {
        ...state,
        loading: false,
        error: '',
        isSuccess: false,
      };

    default:
      return state;
  }
}
export default register;
