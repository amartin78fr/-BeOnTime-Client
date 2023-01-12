/* eslint-disable no-shadow */
import React, {useRef, useEffect} from 'react';
import {Block, Button, ImageComponent, Text} from '../../../../components';
import Header from '../../../../components/common/header';
import CommonMap from '../../../common/Map';
import {Modalize} from 'react-native-modalize';
import {t1, t2, w3} from '../../../../components/theme/fontsize';
import {
  AgentType,
  checkValue,
  MissionType,
  PaymentStatus,
} from '../../../../utils/data';
import Rating from '../../../../components/ratings';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {divider} from '../../../../utils/commonView';
import moment from 'moment';
import {
  strictValidNumber,
  strictValidString,
} from '../../../../utils/commonUtils';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';

const CustomRequestDetail = ({
  route: {
    params: {item},
  },
}) => {
  const navigation = useNavigation();
  const languageMode = useSelector((state) => state.languageReducer.language);
  const {
    MissionDate,
    MissionDetails,
    MissionTypeHeader,
    AgentTypeHeader,
    LocationHeader,
    type,
    RepetitiveMission,
    Duration,
    VehicleRequired,
    MissionFinishedTime,
    TimeInterval,
    Hours,
    PaymentDetails,
    Amount,
    Status,
    Due,
    InReview,
    NotificationSoon,
    ProceedPayment,
    StartDateTime,
    EndDateTime,
    MakeProcessedMission,
    RequestInProgress,
    CustomMissionCompleted,
    MissionConfirmed,
  } = languageMode;

  const modalizeRef = useRef(null);
  useEffect(() => {
    modalizeRef.current?.open();
  }, []);
  const {
    id,
    title,
    location,
    created_at,
    agent_type,
    description,
    vehicle_required,
    total_hours,
    amount,
    payment_status,
    status,
    intervention,
    start_date_time,
    mission_finish_time,
    time_intervel,
    repetitive_mission,
    end_date_time,
  } = item;

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  };
  const renderAgentDetails = ({item}) => {
    return (
      <Block flex={false}>
        <Block space={'between'} margin={[0, 0, t1]} flex={false} row>
          <Block center flex={false} row>
            <ImageComponent name="blurAvatar_icon" height="60" width="60" />
            <Block margin={[0, w3]} flex={false}>
              <Block row center flex={false}>
                <Text semibold size={18} margin={[0, w3, 0, 0]}>
                  {item.username}
                </Text>
                <ImageComponent name="vehicle_icon" height="25" width="25" />
              </Block>
              <Block flex={false} margin={[hp(0.3), 0]}>
                <Rating rating={item.rating || 0} />
              </Block>
              {strictValidString(item.agent_type) && (
                <FlatList
                  data={checkValue(item.agent_type)}
                  contentContainerStyle={flatlistContainerStyle}
                  horizontal
                  renderItem={({item, index}) => {
                    return (
                      <Text margin={[hp(0.5), 0]} grey size={16}>
                        {' '}
                        {item.name}
                      </Text>
                    );
                  }}
                />
              )}
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };
  const renderRequestReview = () => {
    return (
      <Block margin={[t1, w3, t1]} flex={false} row center>
        <Block
          color={'#F7F8FA'}
          flex={false}
          center
          middle
          style={circle}
          borderRadius={30}>
          <Text bold margin={[-t1, 0, 0, 0]}>
            ...
          </Text>
        </Block>
        <Block margin={[0, w3]} flex={false}>
          <Block flex={false}>
            {status === 0 && (
              <>
                <Text semibold size={16} margin={[0, w3, 0, 0]}>
                  {InReview}
                </Text>
                <Text
                  style={{width: widthPercentageToDP(70)}}
                  margin={[hp(0.5), 0, 0]}
                  size={14}
                  grey>
                  {NotificationSoon}
                </Text>
              </>
            )}
            {status === 1 && (
              <>
                <Text semibold size={16} margin={[0, w3, 0, 0]}>
                  {'Custom Request Accepted'}
                </Text>
                <Text
                  style={{width: widthPercentageToDP(70)}}
                  margin={[hp(0.5), 0, 0]}
                  size={14}
                  grey>
                  {MakeProcessedMission}
                </Text>
              </>
            )}
            {(status === 2 || status === 3) && (
              <>
                <Text semibold size={16} margin={[0, w3, 0, 0]}>
                  {RequestInProgress}
                </Text>
              </>
            )}
            {status === 4 && (
              <>
                <Text semibold size={16} margin={[0, w3, 0, 0]}>
                  {CustomMissionCompleted}
                </Text>
                <Text
                  style={{width: widthPercentageToDP(70)}}
                  margin={[hp(0.5), 0, 0]}
                  size={14}
                  grey>
                  {MissionConfirmed}
                </Text>
              </>
            )}
          </Block>
        </Block>
      </Block>
    );
  };

  const MissionDetail = () => {
    return (
      <Block flex={false}>
        <Text semibold size={18}>
          {MissionDetails}
        </Text>
        <Text margin={[t1, 0, 0]} color="#8A8E99" size={14}>
          {description}
        </Text>
      </Block>
    );
  };
  const renderDetails = (header, content) => {
    return (
      <Block center margin={[hp(0.5), 0]} flex={false} row space={'between'}>
        <Text size={16} regular>
          {header}
        </Text>
        <Text regular grey size={16}>
          {content}
        </Text>
      </Block>
    );
  };

  const formatDateType = (d) => {
    return moment(d).format('DD MMMM YYYY');
  };

  const renderHeader = () => (
    <Block padding={[t2]} flex={false}>
      <Text size={13} grey semibold>
        MISN0{id}
      </Text>
      <Text margin={[t1, 0, t1]} semibold size={20}>
        {title}
      </Text>
      {divider()}
      {/* {renderAgentDetails()} */}
      <FlatList
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={item.agents}
        renderItem={renderAgentDetails}
      />
      {renderRequestReview()}
      {divider()}
      {MissionDetail()}
      <Block flex={false} margin={[t2, 0, 0]}>
        {renderDetails(MissionDate, formatDateType(created_at))}

        {renderDetails(MissionTypeHeader, MissionType(intervention))}
        {renderDetails(AgentTypeHeader, AgentType(agent_type))}
        {renderDetails(LocationHeader, location)}
        {renderDetails(Duration, `${total_hours} ` + Hours)}
        {renderDetails(VehicleRequired, vehicle_required === 1 ? 'Yes' : 'No')}
        {strictValidString(mission_finish_time) &&
          renderDetails(MissionFinishedTime, mission_finish_time)}
        {strictValidString(time_intervel) ||
          (strictValidNumber(time_intervel) &&
            renderDetails(TimeInterval, time_intervel))}
        {strictValidString(repetitive_mission) &&
          renderDetails(RepetitiveMission, repetitive_mission)}
        {strictValidString(start_date_time) &&
          renderDetails(StartDateTime, start_date_time)}
        {strictValidString(end_date_time) &&
          renderDetails(EndDateTime, end_date_time)}
      </Block>
      {divider()}

      {item.status !== 0 && (
        <>
          <Text semibold size={18}>
            {PaymentDetails}
          </Text>
          <Block flex={false} margin={[t1, 0, 0]}>
            {renderDetails(Amount, type === 'en' ? `€${amount}` : `${amount}€`)}
            {renderDetails(Status, PaymentStatus(payment_status))}
            {renderDetails(Due, formatDate(start_date_time))}
          </Block>
        </>
      )}
      {item.status === 1 && payment_status === 0 && (
        <Button
          onPress={() =>
            navigation.navigate('CustomRequestPayment', {
              id: item.id,
              total_mission_amount: amount,
            })
          }
          style={{marginTop: hp(2)}}
          color="primary">
          {ProceedPayment}
        </Button>
      )}
    </Block>
  );
  return (
    <Block primary>
      <Header centerText="Mission-Details" />
      <Block flex={1}>
        <CommonMap agent={item} />
      </Block>
      <Modalize
        ref={modalizeRef}
        // contentRef={contentRef}
        handlePosition="inside"
        alwaysOpen={350}
        snapPoint={350}>
        {renderHeader()}
      </Modalize>
    </Block>
  );
};
const flatlistContainerStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap',
};
const circle = {height: 50, width: 50};

export default CustomRequestDetail;
