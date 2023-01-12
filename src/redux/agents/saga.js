import {ActionConstants} from '../constants';
import {
  agentslistError,
  agentslistSuccess,
  searchAgentsSuccess,
  searchAgentsError,
  missionsAgentError,
  missionsAgentSuccess,
} from '../action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {Api, SearchApi, MissionAgentsApi, BookAgentsApi} from './api';
import * as navigation from '../../routes/NavigationService';
import {bookAgentError, bookAgentSuccess} from './action';

export function* agentsListRequest(action) {
  try {
    const response = yield call(Api, action.payload);
    if (response.data.status === 1) {
      yield put(agentslistSuccess(response.data));
    } else {
      yield put(agentslistError(response));
    }
  } catch (err) {
    yield put(agentslistError());
  }
}
export function* searchAgentsRequest(action) {
  try {
    const response = yield call(SearchApi, action.payload);
    if (response.data.status === 1) {
      yield put(searchAgentsSuccess(response.data));
      navigation.navigate('ChooseType');
    } else {
      yield put(searchAgentsError(response));
    }
  } catch (err) {
    yield put(searchAgentsError());
  }
}
export function* missionAgentsRequest(action) {
  try {
    const response = yield call(MissionAgentsApi, action.payload);
    if (response.data.status === 1) {
      yield put(missionsAgentSuccess(response.data));
    } else {
      yield put(missionsAgentError(response));
    }
  } catch (err) {
    yield put(missionsAgentError());
  }
}
export function* bookAgentsRequest(action) {
  try {
    const response = yield call(BookAgentsApi, action.payload);
    if (response.data.status === 1) {
      yield put(bookAgentSuccess(response.data));
      navigation.navigate('ReviewDetails');
    } else {
      yield put(bookAgentError(response));
    }
  } catch (err) {
    yield put(bookAgentError());
  }
}

export function* agentWatcher() {
  yield all([
    takeLatest(ActionConstants.AGENTS_LIST_REQUEST, agentsListRequest),
    takeLatest(ActionConstants.SEARCH_AGENTS_REQUEST, searchAgentsRequest),
    takeLatest(ActionConstants.MISSION_AGENTS_REQUEST, missionAgentsRequest),
    takeLatest(ActionConstants.BOOK_AGENTS_REQUEST, bookAgentsRequest),
  ]);
}
export default agentWatcher;
