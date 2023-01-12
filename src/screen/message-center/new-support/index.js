import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {Block, CustomButton, ImageComponent, Text} from '../../../components';
import ActivityLoader from '../../../components/activityLoader';
import Header from '../../../components/common/header';
import {t1, t2, w1} from '../../../components/theme/fontsize';
import CommonApi from '../../../utils/CommonApi';
import {strictValidArrayWithLength} from '../../../utils/commonUtils';

const initialState = {
  loading: false,
  newChat: [],
};
const NewSupport = () => {
  const [state, setstate] = useState(initialState);
  const {loading, newChat} = state;
  const navigation = useNavigation();
  const languageMode = useSelector((v) => v.languageReducer.language);

  const {
    NewSupportChat,
    OthersHelps,
    NeedSupportWithOperator,
    SupportHelp,
  } = languageMode;

  useEffect(() => {
    setstate({
      ...state,
      loading: true,
    });
    CommonApi.fetchAppCommon('/customer/support-chat', 'get')
      .then((response) => {
        if (response.status === 1) {
          setstate({
            loading: false,
            newChat: response.data,
          });
        }
      })
      .catch((err) => {});
  }, []);
  const _renderItem = ({item, index}) => {
    return (
      <CustomButton
        onPress={() =>
          navigation.navigate('Chat', {
            id: item.id,
            name: item.title,
          })
        }
        row
        space="between"
        borderColorDeafult
        borderWidth={[0, 0, 1, 0]}
        margin={[0, 0, 0]}
        padding={[hp(1.5), w1]}
        flex={false}>
        <Text size={16} semibold>
          {item.title}
        </Text>
        <ImageComponent name="right_arrow_icon" height={20} width={20} />
      </CustomButton>
    );
  };
  return (
    <Block primary>
      <Header centerText={NewSupportChat} />

      <Block margin={[t1]} flex={false}>
        <Text size={14} grey semibold>
          {OthersHelps}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block
            borderColorDeafult
            margin={[t1, 0, 0]}
            borderWidth={[0, 0, 1, 0]}
            flex={false}
          />
          <FlatList
            scrollEnabled={false}
            data={[
              {
                title: NeedSupportWithOperator,
              },
            ]}
            renderItem={({item}) => {
              return (
                <CustomButton
                  onPress={() =>
                    navigation.navigate('ChatOperator', {
                      name: item.title,
                    })
                  }
                  row
                  space="between"
                  borderColorDeafult
                  borderWidth={[0, 0, 1, 0]}
                  margin={[0, 0, 0]}
                  padding={[hp(1.5), w1]}
                  flex={false}>
                  <Text size={16} semibold>
                    {item.title}
                  </Text>
                  <ImageComponent
                    name="right_arrow_icon"
                    height={20}
                    width={20}
                  />
                </CustomButton>
              );
            }}
          />
        </ScrollView>
      </Block>
      {loading && <ActivityLoader />}
      {strictValidArrayWithLength(newChat) && (
        <Block margin={[t1]} flex={1}>
          <Text size={14} grey semibold>
            {SupportHelp}
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: t2}}>
            <Block
              borderColorDeafult
              margin={[t1, 0, 0]}
              borderWidth={[0, 0, 1, 0]}
              flex={false}
            />
            <FlatList
              scrollEnabled={false}
              data={newChat}
              renderItem={_renderItem}
            />
          </ScrollView>
        </Block>
      )}
    </Block>
  );
};

export default NewSupport;
