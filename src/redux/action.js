import {ActionConstants} from './constants';

export {
  loginError,
  loginRequest,
  loginSuccess,
  changePasswordError,
  changePasswordRequest,
  changePasswordSuccess,
} from './auth/login/action';
export {
  registerError,
  registerRequest,
  registerSuccess,
  registerFlush,
} from './auth/register/action';
export {
  profileError,
  profileRequest,
  profileSuccess,
  profileFlush,
} from './auth/profile/action';
export {
  generateOtpError,
  generateOtpRequest,
  generateOtpSuccess,
} from './auth/otp/action';
export {
  agentslistError,
  agentslistRequest,
  agentslistSuccess,
  searchAgentsError,
  searchAgentsRequest,
  searchAgentsSuccess,
  missionsAgentError,
  missionsAgentRequest,
  missionsAgentSuccess,
  bookAgentError,
  bookAgentRequest,
  bookAgentSuccess,
  flushMissionAgents,
} from './agents/action';
export {locationError, locationSuccess} from './common/action';
export {
  getMissionsError,
  getMissionsRequest,
  getMissionsSuccess,
  customMissionError,
  customMissionFlush,
  customMissionRequest,
  customMissionSuccess,
} from './missions/action';
export {
  makePaymentError,
  makePaymentRequest,
  makePaymentSuccess,
  getCardsError,
  getCardsRequest,
  getCardsSuccess,
  getBillingRequest,
  getBillingError,
  getBillingSuccess,
} from './payments/action';
export {socketConnection, socketDisconnect, socketFlush} from './socket/action';
export {
  getNotificationRequest,
  getNotificationError,
  getNotificationSuccess,
  deleteNotificationError,
  deleteNotificationRequest,
  deleteNotificationSuccess,
} from './notifications/action';
export {
  getChatRequest,
  getChatError,
  getChatSuccess,
  getChatByIdError,
  getChatByIdRequest,
  getChatByIdSuccess,
  operatorChatError,
  operatorChatFlush,
  operatorChatRequest,
  operatorChatSuccess,
} from './messages/action';
export {languageError, languageSuccess} from './language/action';

export const resetStore = () => {
  return {
    type: ActionConstants.RESET_STORE,
  };
};
