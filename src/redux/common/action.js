import {ActionConstants} from '../constants';

export const locationSuccess = (data) => {
  return {
    type: ActionConstants.LOCATION_SUCCESS,
    data,
    res: true,
  };
};
export const locationError = (error) => {
  return {
    type: ActionConstants.LOCATION_ERROR,
    error,
    res: false,
  };
};
