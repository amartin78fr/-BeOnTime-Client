import {ActionConstants} from '../../constants';
const initialState = {
  loading: false,
  data: '',
  error: '',
};
export function Otp(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.GENERATE_OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.GENERATE_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    case ActionConstants.GENERATE_OTP_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
export default Otp;
