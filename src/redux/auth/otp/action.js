import {ActionConstants} from '../../constants';

const generateOtpRequest = (payload) => {
  return {
    type: ActionConstants.GENERATE_OTP_REQUEST,
    payload,
    res: false,
  };
};
const generateOtpSuccess = (data) => {
  return {
    type: ActionConstants.GENERATE_OTP_SUCCESS,
    data,
    res: true,
  };
};
const generateOtpError = (error) => {
  return {
    type: ActionConstants.GENERATE_OTP_ERROR,
    error,
    res: false,
  };
};

export {generateOtpRequest, generateOtpError, generateOtpSuccess};
