/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {connect, useSelector} from 'react-redux';
import io from 'socket.io-client';
import {Block, Text} from '../../components';
import ActivityLoader from '../../components/activityLoader';
import Header from '../../components/common/header';
import EmptyFile from '../../components/emptyFile';
import ItemBox from '../../components/swipeable';
import NotificationItemBox from '../../components/swipeableCopy';
import {t1} from '../../components/theme/fontsize';
import {
  deleteNotificationRequest,
  getNotificationRequest,
} from '../../redux/notifications/action';
import {
  strictValidArrayWithLength,
  strictValidObjectWithKeys,
} from '../../utils/commonUtils';
import {config} from '../../utils/config';
import {useDoubleBackPressExit} from '../../utils/site-specific-common-utils';

const Notifications = ({
  callNotificationApi,
  notifications,
  isLoad,
  callDeleteNotificationApi,
}) => {
  const navigation = useNavigation();
  const languageMode = useSelector((state) => state.languageReducer.language);
  const [refreshing, setRefreshing] = useState(false);

  const {
    MostRecent,
    NotificationsLanguage,
    NoNotification,
    AreYouSure,
    RemoveNotification,
    Cancel,
    YesDoIt,
    type,
  } = languageMode;
  const socket = io(config.Api_Url);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // callNotificationApi();
      clearNotification();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const BackButton = BackHandler.addEventListener(
      'hardwareBackPress',
      useDoubleBackPressExit,
    );
    return () => BackButton.remove();
  }, []);

  const clearNotification = async () => {
    const token = await AsyncStorage.getItem('token');

    const data = {
      token: token,
      type: 'notification',
    };
    socket.emit('clear_badge', data);
  };

  const onhandleDelete = async (mission_id) => {
    callDeleteNotificationApi(mission_id.id);
  };

  const deleteItem = (id) => {
    Alert.alert(
      AreYouSure,
      RemoveNotification,
      [
        {
          text: Cancel,
        },
        {
          text: YesDoIt,
          onPress: () => onhandleDelete(id),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const _renderItem = ({item, index}) => {
    return (
      <NotificationItemBox
        type={type}
        handlePress={() => console.log('click')}
        data={item}
        handleDelete={(value) => deleteItem(value)}
      />
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    callNotificationApi();
  };
  return (
    <Block primary>
      <Header centerText={NotificationsLanguage} leftIcon />
      {isLoad && <ActivityLoader />}
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor="#000"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={{flexGrow: 1}}>
        {strictValidObjectWithKeys(notifications) &&
          strictValidArrayWithLength(notifications.recent) && (
            <Block margin={[t1]} flex={false}>
              <Text size={14} grey semibold>
                {MostRecent}
              </Text>
              <Block
                borderColorDeafult
                margin={[t1, 0, 0]}
                borderWidth={[0, 0, 1, 0]}
                flex={false}
              />
              <FlatList
                scrollEnabled={false}
                data={notifications.recent}
                renderItem={_renderItem}
              />
            </Block>
          )}
        {strictValidObjectWithKeys(notifications) &&
        strictValidArrayWithLength(notifications.all) ? (
          <Block padding={[0, t1, t1]} flex={false}>
            <Text margin={[t1, 0, 0]} size={14} grey semibold>
              {NotificationsLanguage}
            </Text>
            <Block
              borderColorDeafult
              margin={[t1, 0, 0]}
              borderWidth={[0, 0, 1, 0]}
              flex={false}
            />
            <FlatList
              scrollEnabled={false}
              data={notifications.all}
              renderItem={_renderItem}
            />
          </Block>
        ) : (
          <EmptyFile text={NoNotification} />
        )}
      </ScrollView>
    </Block>
  );
};
const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.notifications.data,
    isLoad: state.notifications.notifications.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    callNotificationApi: (...params) =>
      dispatch(getNotificationRequest(...params)),
    callDeleteNotificationApi: (...params) =>
      dispatch(deleteNotificationRequest(...params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
