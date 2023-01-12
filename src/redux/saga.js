import {all} from 'redux-saga/effects';
import {loginWatcher} from './auth/login/saga';
import {profileWatcher} from './auth/profile/saga';
import {agentWatcher} from './agents/saga';
import {registerWatcher} from './auth/register/saga';
import {paymentWatcher} from './payments/saga';
import {missionWatcher} from './missions/saga';
import {notificationWatcher} from './notifications/saga';
import {messageWatcher} from './messages/saga';
export default function* rootSaga() {
  yield all([
    loginWatcher(),
    agentWatcher(),
    registerWatcher(),
    profileWatcher(),
    paymentWatcher(),
    missionWatcher(),
    notificationWatcher(),
    messageWatcher(),
  ]);
}
