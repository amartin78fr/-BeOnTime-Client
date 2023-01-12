import {ActionConstants} from '../constants';
// Agent List
export const agentslistRequest = (payload) => {
  return {
    type: ActionConstants.AGENTS_LIST_REQUEST,
    payload,
    res: false,
  };
};
export const agentslistSuccess = (data) => {
  return {
    type: ActionConstants.AGENTS_LIST_SUCCESS,
    data,
    res: true,
  };
};
export const agentslistError = (error) => {
  return {
    type: ActionConstants.AGENTS_LIST_ERROR,
    error,
    res: false,
  };
};
// Search Agents List
export const searchAgentsRequest = (payload) => {
  return {
    type: ActionConstants.SEARCH_AGENTS_REQUEST,
    payload,
    res: false,
  };
};
export const searchAgentsSuccess = (data) => {
  return {
    type: ActionConstants.SEARCH_AGENTS_SUCCESS,
    data,
    res: true,
  };
};
export const searchAgentsError = (error) => {
  return {
    type: ActionConstants.SEARCH_AGENTS_ERROR,
    error,
    res: false,
  };
};

export const missionsAgentRequest = (payload) => {
  return {
    type: ActionConstants.MISSION_AGENTS_REQUEST,
    payload,
    res: false,
  };
};
export const missionsAgentSuccess = (data) => {
  return {
    type: ActionConstants.MISSION_AGENTS_SUCCESS,
    data,
    res: true,
  };
};
export const missionsAgentError = (error) => {
  return {
    type: ActionConstants.MISSION_AGENTS_ERROR,
    error,
    res: false,
  };
};
export const flushMissionAgents = () => {
  return {
    type: ActionConstants.MISSION_AGENTS_FLUSH,
  };
};
//Book Agents

export const bookAgentRequest = (payload) => {
  return {
    type: ActionConstants.BOOK_AGENTS_REQUEST,
    payload,
    res: false,
  };
};
export const bookAgentSuccess = (data) => {
  return {
    type: ActionConstants.BOOK_AGENTS_SUCCESS,
    data,
    res: true,
  };
};
export const bookAgentError = (error) => {
  return {
    type: ActionConstants.BOOK_AGENTS_ERROR,
    error,
    res: false,
  };
};
