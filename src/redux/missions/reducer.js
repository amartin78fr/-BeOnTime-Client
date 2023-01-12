import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';
const initialState = {
  loading: false,
  data: [],
  error: '',
  isSuccess: false,
};
export function missions(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.GET_MISSION_REQUEST:
      return {
        ...state,
        loading: true,
        isSuccess: false,
      };
    case ActionConstants.GET_MISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        isSuccess: true,
      };
    case ActionConstants.GET_MISSION_ERROR:
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
export function customMissions(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.CUSTOM_MISSION_REQUEST:
      return {
        ...state,
        loading: true,
        isSuccess: false,
      };
    case ActionConstants.CUSTOM_MISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        isSuccess: true,
      };
    case ActionConstants.CUSTOM_MISSION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        isSuccess: false,
      };
    case ActionConstants.CUSTOM_MISSION_FLUSH:
      return {
        ...state,
        loading: false,
        error: '',
        isSuccess: false,
        data: [],
      };

    default:
      return state;
  }
}

const mission = combineReducers({
  missions,
  customMissions,
});
export default mission;
