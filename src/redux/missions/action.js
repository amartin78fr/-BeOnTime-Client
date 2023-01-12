import {ActionConstants} from '../constants';
// Agent List
export const getMissionsRequest = (payload) => {
  return {
    type: ActionConstants.GET_MISSION_REQUEST,
    payload,
    res: false,
  };
};
export const getMissionsSuccess = (data) => {
  return {
    type: ActionConstants.GET_MISSION_SUCCESS,
    data,
    res: true,
  };
};
export const getMissionsError = (error) => {
  return {
    type: ActionConstants.GET_MISSION_ERROR,
    error,
    res: false,
  };
};
export const customMissionRequest = (payload) => {
  return {
    type: ActionConstants.CUSTOM_MISSION_REQUEST,
    payload,
    res: false,
  };
};
export const customMissionSuccess = (data) => {
  return {
    type: ActionConstants.CUSTOM_MISSION_SUCCESS,
    data,
    res: true,
  };
};
export const customMissionError = (error) => {
  return {
    type: ActionConstants.CUSTOM_MISSION_ERROR,
    error,
    res: false,
  };
};
export const customMissionFlush = (error) => {
  return {
    type: ActionConstants.CUSTOM_MISSION_FLUSH,
    error,
    res: false,
  };
};
