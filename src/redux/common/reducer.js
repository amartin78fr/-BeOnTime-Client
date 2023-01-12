import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';
const initialState = {
  loading: false,
  data: {},
  error: '',
};
export function location(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ActionConstants.LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

const common = combineReducers({
  location,
});
export default common;
