import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';
const initialState = {
  loading: false,
  agents: [],
  error: '',
};
export function list(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.AGENTS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.AGENTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        agents: action.data,
      };
    case ActionConstants.AGENTS_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

const initialSearchState = {
  loading: false,
  searchList: [],
  error: '',
};
export function searchAgentList(state = initialSearchState, action) {
  switch (action.type) {
    case ActionConstants.SEARCH_AGENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.SEARCH_AGENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        searchList: action.data,
      };
    case ActionConstants.SEARCH_AGENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

const initialMissionsState = {
  loading: false,
  searchList: [],
  error: '',
};
export function agentMissionList(state = initialMissionsState, action) {
  switch (action.type) {
    case ActionConstants.MISSION_AGENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.MISSION_AGENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        searchList: action.data,
      };
    case ActionConstants.MISSION_AGENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ActionConstants.MISSION_AGENTS_FLUSH:
      return {
        ...state,
        searchList: [],
        loading: false,
        error: '',
      };

    default:
      return state;
  }
}

const initialBookAgentState = {
  loading: false,
  bookAgents: [],
  error: '',
};
export function bookAgennts(state = initialBookAgentState, action) {
  switch (action.type) {
    case ActionConstants.BOOK_AGENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.BOOK_AGENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookAgents: action.data,
      };
    case ActionConstants.BOOK_AGENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

const agents = combineReducers({
  list,
  searchAgentList,
  agentMissionList,
  bookAgennts,
});
export default agents;
