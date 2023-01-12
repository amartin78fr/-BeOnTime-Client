import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
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
import {
  getChatByIdFlush,
  getChatByIdRequest,
  getChatRequest,
} from '../../../redux/messages/action';
import AsyncStorage from '@react-native-community/async-storage';
import {strictValidString} from '../../../utils/commonUtils';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import {config} from '../../../utils/config';
import io from 'socket.io-client';

const Chat = ({
  route: {params: {id, name} = {}} = {},
  callGetChatByIdApi,
  chatMessages,
}) => {
  const flatlistRef = useRef();
  const [messages, setMessages] = useState('');
  const [loader, setloader] = useState(false);
  const dispatch = useDispatch();
  const socket = io(config.Api_Url);
  const languageMode = useSelector((state) => state.languageReducer.language);

  const {TypeMessage} = languageMode;

  useEffect(() => {
    dispatch(getChatByIdRequest(id));
    return () => {
      dispatch(getChatByIdFlush());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on(`message_center_${id}`, (msg) => {
      dispatch(getChatByIdRequest(id));
      dispatch(getChatRequest());
    });
    clearBadge();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearBadge = async () => {
    const token = await AsyncStorage.getItem('token');

    const data = {
      mission_id: id,
      token: token,
    };
    socket.emit('clear_message_badge', data);
  };

  const sendMessage = async () => {
    setloader(true);
    const token = await AsyncStorage.getItem('token');
    const data = {
      mission_id: id,
      token: token,
      message: messages,
      type: 'send_by_cus',
    };
    socket.emit('message_center', data);
    setMessages('');
    setTimeout(() => {
      dispatch(getChatByIdRequest(id));
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
    <>
      <Header centerText={name} bottomText={`Misn0${id}`} />
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : t4}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flexGrow: 1, backgroundColor: '#fff'}}>
        <Block primary>
          <AutoScrollFlatList
            ref={flatlistRef}
            showsVerticalScrollIndicator={false}
            threshold={20}
            keyExtractor={(item) => item.id}
            data={chatMessages}
            renderItem={_renderItem}
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
            style={buttonStyle}>
            {loader ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <ImageComponent name="message_send_icon" height="22" width="22" />
            )}
          </CustomButton>
        </Block>
      </KeyboardAvoidingView>
    </>
  );
};
const buttonStyle = {
  height: 40,
  width: 40,
};
const mapStateToProps = (state) => {
  return {
    chatMessages: state.messages.chatById.data,
    isLoad: state.messages.chatById.loading,
    socket: state.socket.data,
  };
};

export default connect(mapStateToProps)(Chat);
