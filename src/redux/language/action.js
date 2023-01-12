import {ActionConstants} from '../constants';

const languageSuccess = (payload) => {
  return {
    type: ActionConstants.LANGUAGE_SUCCESS,
    payload,
  };
};
const languageError = () => {
  return {
    type: ActionConstants.LANGUAGE_ERROR,
  };
};
export {languageError, languageSuccess};
