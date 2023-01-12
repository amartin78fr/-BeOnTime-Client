import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Block, ImageComponent, Text} from '../../components';
import Header from '../../components/common/header';
import {t1, t2, w3} from '../../components/theme/fontsize';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import ItemBox from '../../components/swipeable';
import {connect, useSelector} from 'react-redux';
import {getChatRequest} from '../../redux/messages/action';
import {
  strictValidArrayWithLength,
  strictValidArrayWithMinLength,
  strictValidObjectWithKeys,
} from '../../utils/commonUtils';
import ActivityLoader from '../../components/activityLoader';
import {useDoubleBackPressExit} from '../../utils/site-specific-common-utils';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../utils/config';
import io from 'socket.io-client';
import EmptyFile from '../../components/emptyFile';

const MessageCenter = ({callGetChatApi, chat, isLoad}) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  // const socket = useSelector((v) => v.socket.data);
  const userId = useSelector((v) => v.user.profile.user.data);
  const socket = io(config.Api_Url);
  const languageMode = useSelector((state) => state.languageReducer.language);

  const {MessageCenterHeader, Active, Finished} = languageMode;

  useFocusEffect(
    React.useCallback(() => {
      if (strictValidObjectWithKeys(userId) && userId.id) {
        callGetChatApi();
        socket.on(`my_message_center_${userId.id}`, (msg) => {
          callGetChatApi();
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    const BackButton = BackHandler.addEventListener(
      'hardwareBackPress',
      useDoubleBackPressExit,
    );
    return () => BackButton.remove();
  }, []);

  const onhandleDelete = async (mission_id) => {
    //customer/message-center/311
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };
    const response = await axios({
      method: 'delete',
      url: `${config.Api_Url}/customer/message-center/${mission_id}`,
      headers,
    });
    if (response.data.status === 1) {
      callGetChatApi();
    }
  };

  const deleteItem = (id) => {
    Alert.alert(
      'Are you sure?',
      'You want to remove this chat',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes, do it',
          onPress: () => onhandleDelete(id),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  const _renderItem = ({item, index}) => {
    const id = item.mission_id !== 0 ? item.mission_id : 0;
    return (
      <ItemBox
        badge={true}
        handlePress={() => {
          item.mission_id !== 0
            ? navigation.navigate('Chat', {
                id: item.mission_id,
                name: item.title,
              })
            : navigation.navigate('ChatOperator', {
                name: 'Need Support with Operator',
              });
        }}
        data={item}
        handleDelete={() => deleteItem(id)}
      />
    );
  };
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    callGetChatApi();
    wait(2000).then(() => setRefreshing(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Block primary>
      <Header leftIcon centerText={MessageCenterHeader} />
      {isLoad && <ActivityLoader />}
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {strictValidObjectWithKeys(chat) &&
        strictValidArrayWithLength(chat.active) ? (
          <Block margin={[t1]} flex={false}>
            <Text size={14} grey semibold>
              {Active}
            </Text>
            <Block
              borderColorDeafult
              margin={[t1, 0, 0]}
              borderWidth={[0, 0, 1, 0]}
              flex={false}
            />
            <FlatList
              scrollEnabled={false}
              data={chat.active}
              renderItem={_renderItem}
            />
          </Block>
        ) : (
          <EmptyFile />
        )}
        {strictValidObjectWithKeys(chat) &&
        strictValidArrayWithMinLength(chat.finish) ? (
          <Block padding={[0, t1, t1]} flex={false}>
            <Text margin={[t1, 0, 0]} size={14} grey semibold>
              {Finished}
            </Text>
            <Block
              borderColorDeafult
              margin={[t1, 0, 0]}
              borderWidth={[0, 0, 1, 0]}
              flex={false}
            />
            <FlatList
              scrollEnabled={false}
              data={chat.finish}
              renderItem={_renderItem}
            />
          </Block>
        ) : null}
      </ScrollView>
      <TouchableOpacity
        style={plusIcon}
        onPress={() => navigation.navigate('NewSupport')}>
        <ImageComponent name="plus_icon" height="60" width="70" />
      </TouchableOpacity>
    </Block>
  );
};
const plusIcon = {
  position: 'absolute',
  bottom: t2,
  right: w3,
};

const mapStateToProps = (state) => {
  return {
    chat: state.messages.chat.data,
    isLoad: state.messages.chat.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callGetChatApi: (...params) => dispatch(getChatRequest(...params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MessageCenter);
