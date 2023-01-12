import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeLogin from '../screen/auth/welcome';
import Login from '../screen/auth/login';
import Forgot from '../screen/auth/forgot';
import Signup from '../screen/auth/signup';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screen/home';
import MessageCenter from '../screen/message-center';
import Missions from '../screen/missions/index';
import Notifications from '../screen/notifications';
import Profile from '../screen/profile';
import BottomTab from '../components/bottom-tab';
import MissionDetails from '../screen/missions/details';
import Requested from '../screen/missions/requested';
import InProgress from '../screen/missions/in_progress';
import Finished from '../screen/missions/completed';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomRequest from '../screen/missions/custom-request';

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="WelcomeLogin" headerMode="none">
      <Stack.Screen name="WelcomeLogin" component={WelcomeLogin} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};
const MapStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
const MyTabs = () => {
  return (
    <TopTab.Navigator
      initialRouteName="Requested"
      tabBar={(props) => <Missions {...props} />}>
      <TopTab.Screen name="Requested" component={Requested} />
      <TopTab.Screen name="CustomRequest" component={CustomRequest} />
      <TopTab.Screen name="InProgress" component={InProgress} />
      <TopTab.Screen name="Finished" component={Finished} />
    </TopTab.Navigator>
  );
};

// const MissionStack = () => {
//   return (
//     <Stack.Navigator initialRouteName="Missions" headerMode="none">
//       <Stack.Screen name="Missions" component={Missions} />
//     </Stack.Navigator>
//   );
// };

export const HomeStack = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTab {...props} />}>
      <Tab.Screen name="Map" component={MapStack} />
      <Tab.Screen name="Message" component={MessageCenter} />
      <Tab.Screen name="Missions" component={MyTabs} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
