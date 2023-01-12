import AsyncStorage from '@react-native-community/async-storage';
import {config} from '../utils/config';

const CommonApi = {
  fetchAppCommon: async function (url, method, bodyData) {
    var header = {};
    var urlIs = config.Api_Url + url;
    const token = await AsyncStorage.getItem('token');
    if (token) {
      header = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token,
      };
    } else {
      header = {
        Accept: 'application/json',
      };
    }
    return fetch(urlIs, {
      method: method,
      body: bodyData,
      headers: header,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          response.json().then((body) => {
            if (body.message == '426') {
            }
          });
        }
      })
      .catch((error) => {
        console.log(
          'Internet not available, Cross check your internet connectivity and try again',
        );
        console.log('catch Eroor-->' + error);
      });
  },
};
export default CommonApi;
