/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Header from '../../../components/common/header';
import {
  Block,
  CustomButton,
  ImageComponent,
  Input,
  Text,
} from '../../../components';
import {t1, t2, t4, w3} from '../../../components/theme/fontsize';
import {connect, useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  strictValidObjectWithKeys,
  strictValidString,
} from '../../../utils/commonUtils';
import axios from 'axios';
import {config} from '../../../utils/config';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import io from 'socket.io-client';
import {getChatRequest, operatorChatRequest} from '../../../redux/action';
const initialState = {
  loading: false,
  newChat: [],
};
const ChatOperator = ({
  route: {params: {id, name} = {}} = {},
  userId,
  chatMessages,
}) => {
  const flatlistRef = useRef();
  const [messages, setMessages] = useState('');
  const [loader, setloader] = useState(false);
  const [state, setstate] = useState(initialState);
  const {newChat} = state;
  const dispatch = useDispatch();
  const socket = io(config.Api_Url);
  const languageMode = useSelector((v) => v.languageReducer.language);

  const {TypeMessage} = languageMode;

  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {
    dispatch(operatorChatRequest());
  };

  useEffect(() => {
    if (strictValidObjectWithKeys(userId) && userId.id) {
      socket.on(`refresh_feed_${userId.id}`, (msg) => {
        callApi();
        dispatch(getChatRequest());
        clearBadge();
      });
      clearBadge();
    }
  }, []);
  const clearBadge = async () => {
    const token = await AsyncStorage.getItem('token');

    const data = {
      mission_id: 0,
      token: token,
    };
    socket.emit('clear_message_badge', data);
  };

  const sendMessage = async () => {
    setloader(true);
    const token = await AsyncStorage.getItem('token');
    const data = {
      token: token,
      message: messages,
      // type: 'send_by_cus',
    };
    socket.emit('operator_message', data);
    setMessages('');
    setTimeout(() => {
      callApi();
      setloader(false);
    }, 2000);
  };

  const _renderItem = ({item}) => {
    return (
      <Block
        alignSelf={item.message_type === 'send_by_cus' && 'flex-end'}
        style={{width: wp(60)}}
        borderRadius={10}
        shadow
        color={item.message_type === 'send_by_cus' ? '#000' : '#F7F8FA'}
        padding={[t2]}
        margin={[t1, w3]}
        flex={false}>
        <Text
          regular
          color={item.message_type === 'send_by_cus' ? '#fff' : '#8A8E99'}
          size={14}>
          {item.message}
        </Text>
      </Block>
    );
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : t4}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Header centerText={name} />
      <Block primary>
        <AutoScrollFlatList
          ref={flatlistRef}
          showsVerticalScrollIndicator={false}
          data={chatMessages}
          threshold={20}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id}
        />
      </Block>
      <Block
        shadow
        space={'between'}
        center
        row
        white
        flex={false}
        padding={[t1, t1]}>
        <Input
          transparent
          style={{width: wp(75)}}
          placeholder={TypeMessage}
          value={messages}
          onChangeText={(v) => setMessages(v)}
        />
        <CustomButton
          flex={false}
          disabled={!strictValidString(messages)}
          onPress={() => sendMessage()}
          borderRadius={40}
          center
          middle
          secondary
          style={styles.buttonStyle}>
          {loader ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <ImageComponent name="message_send_icon" height="22" width="22" />
          )}
        </CustomButton>
      </Block>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  buttonStyle: {
    height: 40,
    width: 40,
  },
});

const mapStateToProps = (state) => {
  return {
    chatMessages: state.messages.operator.data,
    socket: state.socket.data,
    userId: state.user.profile.user.data,
  };
};

export default connect(mapStateToProps)(ChatOperator);
