import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {Block, CustomButton, ImageComponent, Text} from '../../../components';
import ActivityLoader from '../../../components/activityLoader';
import Header from '../../../components/common/header';
import EmptyFile from '../../../components/emptyFile';
import LoadingView from '../../../components/LoadingView';
import {light} from '../../../components/theme/colors';
import {t1, t4, w2} from '../../../components/theme/fontsize';
import {getBillingRequest} from '../../../redux/action';
import {strictValidArrayWithLength} from '../../../utils/commonUtils';
import {config} from '../../../utils/config';
import {viewFile} from '../../../utils/site-specific-common-utils';

const Billing = () => {
  const dispatch = useDispatch();
  const BillingPayments = useSelector((state) => state.payment.billing.data);
  const isLoad = useSelector((state) => state.payment.billing.loading);
  const languageMode = useSelector((state) => state.languageReducer.language);
  const [loading, setloading] = useState(false);
  const {
    BillingLanguage,
    DateLanguage,
    Status,
    type,
    Title,
    Amount,
  } = languageMode;
  useEffect(() => {
    dispatch(getBillingRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDateTime = (v) => {
    return moment(v).format('DD/MM/YYYY  hh:mm a');
  };

  const downloadFile = async (id, title) => {
    setloading(true);
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    };
    const res = await axios({
      method: 'get',
      url: `${config.Api_Url}/pdf/mission/${id}`,
      headers,
    });
    setloading(false);
    console.log(res.data);
    viewFile(res.data.data, `${title}.pdf`);
  };

  const _renderItem = ({item}) => {
    return (
      <Block
        margin={[t1, 0, 0]}
        padding={[t1]}
        borderWidth={[0, 0, 1, 0]}
        borderColorDeafult
        flex={false}>
        <Block flex={false} padding={[0, w2]}>
          <Block flex={false} row center space="between">
            <Text grey size={12}>
              MISN0{item.mission_id}
            </Text>
            <CustomButton
              onPress={() => downloadFile(item.mission_id, item.title)}>
              <ImageComponent
                color={light.subtitleColor}
                name="download_icon"
                height={30}
                width={30}
              />
            </CustomButton>
          </Block>
          <Block
            margin={[heightPercentageToDP(0.5), 0, 0]}
            flex={false}
            row
            center
            space="between">
            <Text regular size={16}>
              {Title}
            </Text>
            <Text regular size={16}>
              {item.title}
            </Text>
          </Block>
          <Block
            margin={[heightPercentageToDP(0.5), 0, 0]}
            flex={false}
            row
            center
            space="between">
            <Text regular size={16}>
              {Amount}
            </Text>
            <Text regular size={16}>
              {type === 'en' ? `€${item.amount}` : `${item.amount}€`}
            </Text>
          </Block>
          <Block
            margin={[heightPercentageToDP(0.5), 0, 0]}
            flex={false}
            row
            space={'between'}
            center>
            <Text size={16}>{Status}</Text>
            <Text capitalize grey size={16}>
              {item.status}
            </Text>
          </Block>
          <Block
            margin={[heightPercentageToDP(0.5), 0, 0]}
            flex={false}
            row
            space={'between'}
            center>
            <Text size={16}>{DateLanguage}</Text>
            <Text right grey size={16}>
              {formatDateTime(item.created_at)}
            </Text>
          </Block>
        </Block>
      </Block>
    );
  };
  return (
    <Block white>
      <Header centerText={BillingLanguage} />
      {isLoad && <ActivityLoader />}
      {loading && <LoadingView />}
      {strictValidArrayWithLength(BillingPayments) ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{paddingBottom: t4}}
          data={BillingPayments}
          renderItem={_renderItem}
        />
      ) : (
        <EmptyFile text="Purchase history not found" />
      )}
    </Block>
  );
};

export default Billing;
