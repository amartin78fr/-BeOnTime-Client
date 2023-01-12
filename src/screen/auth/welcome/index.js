/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Platform, ScrollView} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Block, Button, ImageComponent, Text} from '../../../components';
import {t1, t2, t3} from '../../../components/theme/fontsize';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {loginRequest} from '../../../redux/action';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

const WelcomeLogin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const languageMode = useSelector((state) => state.languageReducer.language);
  const {
    RequestSecurity,
    Afewsimple,
    WelcomeDescription,
    WegotCover,
    Getstarted,
    Alreadyaccount,
    LoginHeader,
    ContinueFacebook,
  } = languageMode;

  const fbLogin = async () => {
    const fcmToken = await messaging().getToken();
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]).then(
      function (result) {
        if (result.isCancelled) {
        } else {
          const _responseInfoCallback = async (error, result) => {
            if (error) {
            } else {
              const data = {
                social_type: 'F',
                social_token: result.id,
                first_name: result.first_name || '',
                last_name: result.last_name || '',
                email: result.email,
                password: '',
                role_id: 1,
                image: result.picture.data.url || null,
                device_token: fcmToken,
              };
              dispatch(loginRequest(data));
              await LoginManager.logOut();
            }
          };
          // Create a graph request asking for user information with a callback to handle the response.
          const infoRequest = new GraphRequest(
            '/me',
            {
              parameters: {
                fields: {
                  string:
                    'email,name,first_name,middle_name,last_name,picture.type(large)',
                },
              },
            },
            _responseInfoCallback,
          );
          // Start the graph request.
          const res = new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      function (error) {},
    );
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageComponent
        name="welcomeMap"
        height="350"
        width={Dimensions.get('screen').width}
      />
      <Block margin={[t3, widthPercentageToDP(10)]} flex={false}>
        <Text semibold size={26}>
          {RequestSecurity}
        </Text>
        <Text semibold size={26}>
          {Afewsimple}
        </Text>
        <Text height={18} margin={[t1, 0]} grey size={16}>
          {WelcomeDescription}
        </Text>
        <Text margin={[t1, 0]} grey size={16}>
          {WegotCover}
        </Text>
        <Block flex={false} margin={[t2, 0]}>
          <Button onPress={() => fbLogin()} color="primary">
            {ContinueFacebook}
          </Button>
          <Button
            onPress={() => navigation.navigate('Signup')}
            color="secondary">
            {Getstarted}
          </Button>
          <Block flex={false} margin={[t2, 0]}>
            <Text regular height={20} size={18} center>
              {Alreadyaccount}
              <Text
                onPress={() => navigation.navigate('Login')}
                size={18}
                semibold>
                {' '}
                {LoginHeader}
              </Text>
            </Text>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
};

export default WelcomeLogin;
