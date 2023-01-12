import {ActionConstants} from '../constants';
import {en} from '../../screen/common/language';

const initialState = {
  language: {...en},
};

export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionConstants.LANGUAGE_SUCCESS:
      let newState = {
        ...state,
        language: {...state.language, ...action.payload},
      };
      return newState;
    default:
      return state;
  }
};

export default languageReducer;
