import {ActionConstants} from '../../constants';

const profileRequest = (payload) => {
  return {
    type: ActionConstants.PROFILE_REQUEST,
    payload,
    res: false,
  };
};
const profileSuccess = (data) => {
  return {
    type: ActionConstants.PROFILE_SUCCESS,
    data,
    res: true,
  };
};
const profileError = (error) => {
  return {
    type: ActionConstants.PROFILE_ERROR,
    error,
    res: false,
  };
};
const updateProfileRequest = (payload) => {
  return {
    type: ActionConstants.UPDATE_PROFILE_REQUEST,
    payload,
    res: false,
  };
};
const updateProfileSuccess = (data) => {
  return {
    type: ActionConstants.UPDATE_PROFILE_SUCCESS,
    data,
    res: true,
  };
};
const updateProfileError = (error) => {
  return {
    type: ActionConstants.UPDATE_PROFILE_ERROR,
    error,
    res: false,
  };
};
const profileFlush = (error) => {
  return {
    type: ActionConstants.PROFILE_FLUSH,
  };
};

export {
  profileRequest,
  profileError,
  profileSuccess,
  profileFlush,
  updateProfileError,
  updateProfileRequest,
  updateProfileSuccess,
};
