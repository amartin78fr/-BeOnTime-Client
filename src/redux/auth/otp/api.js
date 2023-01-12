import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../../utils/config';
export const Api = async (data) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return axios({
    method: 'post',
    url: `${config.Api_Url}/V1/sendotp`,
    headers,
    data: {
      resend: data.resend,
      storeId: 1,
      mobile: data.mobile,
      eventType: 'customer_signup_otp',
    },
  });
};
