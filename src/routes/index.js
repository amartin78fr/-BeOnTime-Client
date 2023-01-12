/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screen/splash';
import {AuthStack, HomeStack} from './sub-routes';
import {navigationRef} from './NavigationService';
import CreateMission from '../screen/create-mission';
import ChooseType from '../screen/choose-type';
import ReviewDetails from '../screen/review';
import Payment from '../screen/payment';
import MissionDetails from '../screen/missions/details';
import MissionReport from '../screen/mission-report';
import NewSupport from '../screen/message-center/new-support';
import EditProfile from '../screen/profile/edit-profile';
import ChangePassword from '../screen/auth/change-password';
import Chat from '../screen/message-center/chat';
import Billing from '../screen/auth/billing';
import Language from '../screen/common/language/language';
import ChatOperator from '../screen/message-center/chat/chat-operator';
import {useDispatch, useSelector} from 'react-redux';
import {onDisplayNotification} from '../utils/site-specific-common-utils';
import {
  customMissionRequest,
  getChatByIdRequest,
  getChatRequest,
  getMissionsRequest,
  getNotificationRequest,
  socketConnection,
} from '../redux/action';
import {Alerts, strictValidObjectWithKeys} from '../utils/commonUtils';
import io from 'socket.io-client';
import {config} from '../utils/config';
import AgentLocation from '../screen/missions/agent_location';
import CustomRequestDetail from '../screen/missions/custom-request/details';
import messaging from '@react-native-firebase/messaging';
import {light} from '../components/theme/colors';
import {Alert} from 'react-native';
import CustomRequestPayment from '../screen/payment/custom-request-payment';
import CustomAgentLocation from '../screen/missions/custom-request/travel-mission';
import NetInfo from '@react-native-community/netinfo';

const Stack = createStackNavigator();

function Routes() {
  // const socket = useSelector((state) => state.socket.data);
  const userId = useSelector((state) => state.user.profile.user.data);
  const dispatch = useDispatch();
  const languageMode = useSelector((state) => state.languageReducer.language);

  const {ErrorText, YouAreOffline, OfflineInternet} = languageMode;
  // React.useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     console.log(remoteMessage);
  //     Alerts(
  //       remoteMessage.notification.title,
  //       remoteMessage.notification.body,
  //       light.secondary,
  //     );
  //   });
  //   return unsubscribe;

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      handleFirstConnectivityChange(state.isConnected);
    });

    // Unsubscribe
    return () => unsubscribe();
  }, []);

  const handleFirstConnectivityChange = (isConnected) => {
    if (isConnected === false) {
      Alerts(ErrorText, YouAreOffline, light.warning);
      Alert.alert(OfflineInternet);
    } else {
      // Alerts('Success', 'You are online!', light.success);
    }
  };

  React.useEffect(() => {
    const socket = io(config.Api_Url);
    socket.on('connect', (a) => {
      dispatch(socketConnection(socket));
    });
    if (strictValidObjectWithKeys(userId) && userId.id) {
      socket.on(`notification_${userId.id}`, (msg) => {
        console.log(msg, 'msg');
        onDisplayNotification(msg);
        dispatch(getNotificationRequest());
      });
      socket.on(`refresh_feed_${userId.id}`, (msg) => {
        dispatch(getMissionsRequest());
        dispatch(customMissionRequest());
      });
      socket.on(`message_center_${userId.id}`, (msg) => {
        dispatch(getChatByIdRequest(userId.id));
        dispatch(getChatRequest());
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Home" component={HomeStack} />
        <Stack.Screen name="CreateMission" component={CreateMission} />
        <Stack.Screen name="ChooseType" component={ChooseType} />
        <Stack.Screen name="ReviewDetails" component={ReviewDetails} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="MissionDetails" component={MissionDetails} />
        <Stack.Screen name="MissionReport" component={MissionReport} />
        <Stack.Screen name="NewSupport" component={NewSupport} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Billing" component={Billing} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="ChatOperator" component={ChatOperator} />
        <Stack.Screen name="AgentLocation" component={AgentLocation} />
        <Stack.Screen
          name="CustomRequestPayment"
          component={CustomRequestPayment}
        />
        <Stack.Screen
          name="CustomRequestDetail"
          component={CustomRequestDetail}
        />
        <Stack.Screen
          name="CustomAgentLocation"
          component={CustomAgentLocation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
