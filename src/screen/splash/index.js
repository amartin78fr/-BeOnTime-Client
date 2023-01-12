/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Block, ImageComponent, Text} from '../../components';
import {
  languageSuccess,
  locationSuccess,
  loginSuccess,
  profileRequest,
  socketConnection,
} from '../../redux/action';
import {strictValidString} from '../../utils/commonUtils';
import Geolocation from '@react-native-community/geolocation';
import {t4} from '../../components/theme/fontsize';
import {en, fr} from '../common/language';
import messaging from '@react-native-firebase/messaging';
import io from 'socket.io-client';
import {config} from '../../utils/config';

const Splash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const watchId = Geolocation.getCurrentPosition(
      (position) => {
        dispatch(locationSuccess(position.coords));
      },
      (error) => {},
      {
        enableHighAccuracy: true,
        timeout: 15000,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const socket = io(config.Api_Url);
      socket.on('connect', (a) => {
        dispatch(socketConnection(socket));
      });
    }, []),
  );

  const callAuthApi = async () => {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    if (strictValidString(token)) {
      dispatch(loginSuccess(parsedUser));
      dispatch(profileRequest());

      setTimeout(() => {
        navigation.reset({
          routes: [{name: 'Home'}],
        });
      }, 3000);
    } else {
      setTimeout(() => {
        navigation.reset({
          routes: [{name: 'Auth'}],
        });
      }, 3000);
    }
  };

  async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
    } else {
    }
  }

  useEffect(() => {
    checkApplicationPermission();
  }, []);

  useEffect(() => {
    requestUserPermission();

    callAuthApi();
    getlanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getlanguage = async () => {
    let value = '';
    try {
      value = (await AsyncStorage.getItem('language')) || 'none';
    } catch (error) {
      // Error retrieving data
    }
    if (value === 'en') {
      await AsyncStorage.setItem('language', 'en');
      return dispatch(languageSuccess(en));
    } else {
      await AsyncStorage.setItem('language', 'fr');

      return dispatch(languageSuccess(fr));
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken();
    }
  };
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();

    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  return (
    <Block primary center middle>
      <ImageComponent name="logo" height={170} width={170} />
      <Text size={28} margin={[t4, 0, 0]} bold>
        BE ON TIME
      </Text>
    </Block>
  );
};

export default Splash;
