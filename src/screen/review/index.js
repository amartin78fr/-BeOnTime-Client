import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {Block, Button, Checkbox, ImageComponent, Text} from '../../components';
import Header from '../../components/common/header';
import LoadingView from '../../components/LoadingView';
import Rating from '../../components/ratings';
import {light} from '../../components/theme/colors';
import {t1, t2, w3} from '../../components/theme/fontsize';
import {
  strictValidNumber,
  strictValidObjectWithKeys,
  strictValidString,
} from '../../utils/commonUtils';
import {divider} from '../../utils/commonView';
import {config} from '../../utils/config';
import {AgentType, MissionType} from '../../utils/data';
import {openUrl, viewFile} from '../../utils/site-specific-common-utils';
import CommonMap from '../common/Map';

const ReviewDetails = () => {
  const navigation = useNavigation();
  const languageMode = useSelector((state) => state.languageReducer.language);
  const [terms, setTerms] = useState(false);
  const [loading, setloading] = useState(false);
  const [withdrawls, setWithdrawls] = useState(false);
  const {
    type,
    AgentDetails,
    ReviewDetailsLanguage,
    MissionDetails,
    MissionTypeHeader,
    AgentTypeHeader,
    LocationHeader,
    Duration,
    MissionFinishedTime,
    TimeInterval,
    VehicleRequired,
    RepetitiveMission,
    PaymentDetails,
    TVA,
    AgentCost,
    TotalAmount,
    ProceedPayment,
    ReviewDetailsHeader,
    Iaccept,
    GeneralTermsAndConditions,
    OfSaleAnd,
    GeneralTermsOfUse,
    WithdrawlWaives,
    Save,
  } = languageMode;
  const mission = useSelector(
    (state) => state.agents.bookAgennts.bookAgents.data,
  );
  const {
    id,
    title,
    description,
    intervention,
    agent_type,
    total_hours,
    vehicle_required,
    agent,
    location,
    total_amount,
    tva,
    vat_percentage,
    total_mission_amount,
    mission_finish_time,
    repetitive_mission,
    time_intervel,
  } = strictValidObjectWithKeys(mission) && mission;

  const renderDetails = (header, content) => {
    return (
      <Block center margin={[hp(0.5), 0]} flex={false} row space={'between'}>
        <Text numberOfLines={1} size={16} regular>
          {header}
        </Text>
        <Text
          style={{width: widthPercentageToDP(40), alignSelf: 'flex-end'}}
          regular
          right
          grey
          size={16}>
          {content}
        </Text>
      </Block>
    );
  };

  const downloadFile = async () => {
    setloading(true);
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    };
    const res = await axios({
      method: 'get',
      url: `${config.Api_Url}/pdf/mission-detail/${id}`,
      headers,
    });
    setloading(false);
    console.log(res.data);
    viewFile(res.data.data, `${title}.pdf`);
  };

  const renderAgentDetails = () => {
    return (
      <Block flex={false}>
        <Text semibold size={18}>
          {AgentDetails}
        </Text>
        <Block space={'between'} margin={[t2, 0, t1]} flex={false} row>
          <Block flex={false} row>
            <ImageComponent name="blurAvatar_icon" height="60" width="60" />
            <Block margin={[0, w3]} flex={false}>
              <Block row center flex={false}>
                <Text semibold size={18} margin={[0, w3, 0, 0]}>
                  {agent.username}
                </Text>
                <ImageComponent name="vehicle_icon" height="25" width="25" />
              </Block>
              <Text margin={[hp(0.5), 0, 0]} size={16} grey>
                {AgentType(agent_type)}
              </Text>
            </Block>
          </Block>
          <Rating rating={agent.rating || 0} />
        </Block>
      </Block>
    );
  };
  return (
    <Block primary>
      <Header centerText={ReviewDetailsHeader} />
      {loading && <LoadingView />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, backgroundColor: light.primary}}>
        <Block padding={[t2, w3]}>
          <Text grey size={16}>
            {ReviewDetailsLanguage}
          </Text>
          <Block margin={[t2, 0, 0]} style={{height: hp(20)}} secondary>
            <CommonMap agent={strictValidObjectWithKeys(mission) && mission} />
          </Block>
          <Block flex={false} margin={[t2, 0, 0]}>
            <Text size={13} grey semibold>
              MISN0{id}
            </Text>
            <Text margin={[t1, 0, 0]} semibold size={20}>
              {title}
            </Text>
            <Text grey body margin={[t1, 0, 0]}>
              {description}
            </Text>
            {divider()}
            <Text semibold size={18}>
              {MissionDetails}
            </Text>
            <Block flex={false} margin={[t2, 0, 0]}>
              {renderDetails(MissionTypeHeader, MissionType(intervention))}
              {renderDetails(AgentTypeHeader, AgentType(agent_type))}
              {renderDetails(LocationHeader, location)}
              {renderDetails(Duration, `${total_hours} hours`)}
              {renderDetails(
                VehicleRequired,
                vehicle_required === 1 ? 'Yes' : 'No',
              )}
              {strictValidString(mission_finish_time) &&
                renderDetails(MissionFinishedTime, mission_finish_time)}
              {strictValidString(time_intervel) ||
                (strictValidNumber(time_intervel) &&
                  renderDetails(TimeInterval, time_intervel))}
              {strictValidString(repetitive_mission) &&
                renderDetails(RepetitiveMission, repetitive_mission)}
            </Block>
            {divider()}
            {strictValidObjectWithKeys(agent) && renderAgentDetails()}
            {divider()}
            <Text semibold size={18}>
              {PaymentDetails}
            </Text>
            <Block flex={false} margin={[t2, 0]}>
              {renderDetails(
                AgentCost,
                type === 'en' ? `€${total_amount}` : `${total_amount}€`,
              )}
              {renderDetails(
                `${TVA} (${vat_percentage}%)`,
                type === 'en' ? `€${tva}` : `${tva}€`,
              )}
              {renderDetails(
                TotalAmount,
                type === 'en'
                  ? `€${total_mission_amount}`
                  : `${total_mission_amount}€`,
              )}
            </Block>
            {/* I do accept General Terms and Conditions of sale and General Terms of use */}
            <Block margin={[t1, 0]} row center>
              <Checkbox
                onChange={() => setTerms(!terms)}
                checkboxStyle={{height: 25, width: 25}}
                label=""
                checked={terms}
              />
              <Text style={{width: widthPercentageToDP(84)}} size={16}>
                {Iaccept}{' '}
                <Text
                  onPress={() =>
                    openUrl('https://beontime.io/general-terms-and-conditions')
                  }
                  style={{textDecorationLine: 'underline'}}
                  size={16}>
                  {GeneralTermsAndConditions}{' '}
                </Text>
                <Text size={16}>{OfSaleAnd} </Text>
                <Text
                  onPress={() =>
                    openUrl('https://beontime.io/general-terms-of-use')
                  }
                  style={{textDecorationLine: 'underline'}}
                  size={16}>
                  {GeneralTermsOfUse}
                </Text>
              </Text>
            </Block>
            <Block margin={[t1, 0]} row center>
              <Checkbox
                onChange={() => setWithdrawls(!withdrawls)}
                checkboxStyle={{height: 25, width: 25}}
                label=""
                checked={withdrawls}
              />
              <Text style={{width: widthPercentageToDP(84)}} size={16}>
                {WithdrawlWaives}
              </Text>
            </Block>
            <Block row space="between" flex={false}>
              <Button
                style={{width: widthPercentageToDP(45)}}
                onPress={() => downloadFile()}
                color="secondary">
                {Save}
              </Button>
              <Button
                style={{width: widthPercentageToDP(45)}}
                disabled={!withdrawls || !terms}
                onPress={() => navigation.navigate('Payment')}
                color="secondary">
                {ProceedPayment}
              </Button>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default ReviewDetails;
