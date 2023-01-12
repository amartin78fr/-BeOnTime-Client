import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../utils/config';

export const Api = async (data) => {
  const token = await AsyncStorage.getItem('token');
  const language = await AsyncStorage.getItem('language');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${token}`,
    language: language,
  };
  return axios({
    method: 'get',
    url: `${config.Api_Url}/customer/notification`,
    headers,
  });
};

export const deleteApi = async (id) => {
  const token = await AsyncStorage.getItem('token');
  const language = await AsyncStorage.getItem('language');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${token}`,
    language: language,
  };
  return axios({
    method: 'delete',
    url: `${config.Api_Url}/customer/notification/${id}`,
    headers,
  });
};
