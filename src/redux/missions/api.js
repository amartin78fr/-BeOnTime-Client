import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../utils/config';
export const Api = async (data) => {
  const {page, type} = data;
  const token = await AsyncStorage.getItem('token');
  const language = await AsyncStorage.getItem('language');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${token}`,
    language: language,
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/customer/my-mission-list?page=${page}&type=${type}`,
    headers,
  });
};
export const customApi = async (data) => {
  const {page, type} = data;
  const token = await AsyncStorage.getItem('token');
  const language = await AsyncStorage.getItem('language');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${token}`,
    language: language,
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/customer/custom-mission-list`,
    headers,
  });
};
