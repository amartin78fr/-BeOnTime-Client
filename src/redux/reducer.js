import {combineReducers} from 'redux';
import user from './auth/reducer';
import agents from './agents/reducer';
import common from './common/reducer';
import payment from './payments/reducer';
import socket from './socket/reducer';
import mission from './missions/reducer';
import notifications from './notifications/reducer';
import messages from './messages/reducer';
import {languageReducer} from './language/reducer';
import {ActionConstants} from './constants';

const appReducer = combineReducers({
  user,
  agents,
  common,
  payment,
  socket,
  mission,
  notifications,
  messages,
  languageReducer,
});

const rootReducer = (state, action) => {
  if (action.type === ActionConstants.RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
