import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../utils/config';
export const Api = async (data) => {
  const {agent_type, isvehicle} = data;
  const token = await AsyncStorage.getItem('token');
  const language = await AsyncStorage.getItem('language');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${token}`,
    language: language,
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/customer/available-agents`,
    headers,
    data: {
      agent_type: agent_type,
      is_vehicle: isvehicle,
    },
  });
};

export const SearchApi = async (data) => {
  const token = await AsyncStorage.getItem('token');
  const language = await AsyncStorage.getItem('language');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${token}`,
    language: language,
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/customer/quick-create-mission`,
    headers,
    data: data,
  });
};
export const MissionAgentsApi = async (data) => {
  const {mission_id} = data;
  const token = await AsyncStorage.getItem('token');
  const language = await AsyncStorage.getItem('language');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${token}`,
    language: language,
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/customer/available-agents`,
    headers,
    data: {
      mission_id: mission_id,
    },
  });
};
export const BookAgentsApi = async (data) => {
  const {agent_id, mission_id} = data;
  const token = await AsyncStorage.getItem('token');
  const language = await AsyncStorage.getItem('language');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${token}`,
    language: language,
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/customer/book-now`,
    headers,
    data: {
      agent_id: agent_id,
      mission_id: mission_id,
    },
  });
};
