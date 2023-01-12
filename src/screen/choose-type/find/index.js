/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import {
  Block,
  Button,
  CustomButton,
  ImageComponent,
  Text,
} from '../../../components';
import StarRating from '../../../components/ratings';
import {t1, t2, t3, w2, w3, w5} from '../../../components/theme/fontsize';
import {bookAgentRequest} from '../../../redux/action';
import {
  strictValidArrayWithLength,
  strictValidObjectWithKeys,
  strictValidString,
} from '../../../utils/commonUtils';
import {config} from '../../../utils/config';
import {checkValue} from '../../../utils/data';
import {viewFile} from '../../../utils/site-specific-common-utils';

const AgentList = ({data}) => {
  console.log(data, 'mission');
  const [details, setdetails] = useState({});
  const [id, setId] = useState(null);
  const [user, setuser] = useState({});
  const mission = useSelector(
    (state) => state.agents.searchAgentList.searchList.data,
  );
  const isLoading = useSelector(
    (state) => state.agents.agentMissionList.loading,
  );

  const isLoad = useSelector((state) => state.agents.bookAgennts.loading);
  const languageMode = useSelector((state) => state.languageReducer.language);

  const {
    ChooseAgent,
    Type,
    Rating,
    Details,
    PleaseChooseDifferentAgent,
    Found,
    SelectAppropriateAgent,
    AgentNearby,
    CompletedMission,
    HourClocked,
    HasVehicle,
    Documents,
    SendMyRequestOperator,
  } = languageMode;

  const dispatch = useDispatch();

  useEffect(() => {
    if (strictValidObjectWithKeys(details)) {
      getAgents();
    }
  }, [details, details.id]);

  const getAgents = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    };
    const res = await axios({
      method: 'get',
      url: `${config.Api_Url}/customer/agents-details/${details.id}`,
      headers,
    });
    setuser(res.data.data);
  };

  const bookAgents = (agent_id) => {
    setId(agent_id);
    const newData = {
      agent_id: agent_id,
      mission_id: mission.id,
    };
    dispatch(bookAgentRequest(newData));
  };

  const _renderItem = ({item}) => {
    return (
      <Block
        borderWidth={1}
        borderColorDeafult
        shadow
        primary
        margin={[t2, w3, t2, w2]}
        padding={[t2]}
        style={{width: wp(70)}}
        flex={false}>
        <Block center row>
          <ImageComponent name="blurAvatar_icon" height="60" width="60" />
          <Block margin={[0, w3]} flex={false}>
            <Block row center flex={false}>
              <Text
                style={{maxWidth: wp(30)}}
                semibold
                size={18}
                margin={[0, w3, 0, 0]}>
                {item.username}
              </Text>
              <ImageComponent name="vehicle_icon" height="25" width="25" />
            </Block>
            <Text margin={[hp(0.5), 0, 0]} size={16} grey>
              {item.distance.toFixed(1)} km
            </Text>
          </Block>
        </Block>
        <Block
          flex={false}
          margin={[t1, 0, t1, 0]}
          borderWidth={[0, 0, 1, 0]}
          borderColorDeafult
        />
        <Block margin={[hp(0.5), 0]} space="between" row flex={false}>
          <Text size={16} regular>
            {Type}
          </Text>
          <FlatList
            data={checkValue(item.agent_type)}
            contentContainerStyle={flatlistContainerStyle}
            renderItem={({item, index}) => {
              return (
                <Text grey size={16}>
                  {item.name}
                </Text>
              );
            }}
          />
        </Block>
        <Block margin={[hp(0.5), 0]} space="between" row flex={false}>
          <Text size={16} regular>
            {Rating}
          </Text>
          <StarRating rating={item.rating || 0} />
        </Block>
        <Block row space={'around'} flex={false} center>
          <Text onPress={() => setdetails(item)} size={18} semibold>
            {Details}
          </Text>
          <Button
            isLoading={isLoad && item.id === id}
            onPress={() => bookAgents(item.id)}
            style={{width: wp(44)}}
            color="secondary">
            {ChooseAgent}
          </Button>
        </Block>
      </Block>
    );
  };
  const _renderAgents = () => {
    return (
      <Block flex={false}>
        {strictValidArrayWithLength(data) ? (
          <>
            <Text color="#000" semibold>
              {Found} {data.length} {AgentNearby}
            </Text>
            <Text regular size={18} grey height={30}>
              {SelectAppropriateAgent}
            </Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
              horizontal>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={data}
                horizontal
                scrollEnabled={false}
                renderItem={_renderItem}
              />
            </ScrollView>
          </>
        ) : !isLoading &&
          strictValidObjectWithKeys(mission) &&
          mission.quick_book === 0 ? (
          <Button onPress={() => bookAgents(0)} color="secondary">
            {SendMyRequestOperator}
          </Button>
        ) : (
          <>
            {!isLoading && (
              <Text size={16} semibold errorColor>
                {PleaseChooseDifferentAgent}
              </Text>
            )}
          </>
        )}
      </Block>
    );
  };
  const _renderAgentDetails = () => {
    const {username, id, distance, agent_type, is_vehicle, rating} =
      strictValidObjectWithKeys(details) && details;
    const doc1 = strictValidString(details.identity_card) && 1;
    const doc2 = strictValidString(details.social_security_number) && 1;
    const doc3 = strictValidString(details.cv) && 1;
    return (
      <Block flex={false}>
        {/* {loading && <ActivityLoader />} */}
        <Block row>
          <CustomButton
            onPress={() => {
              setdetails(false);
              setuser({});
            }}
            flex={false}
            margin={[0, w5, 0, 0]}>
            <ImageComponent name="back_arrow_icon" height="20" width="20" />
          </CustomButton>
          <ImageComponent name="blurAvatar_icon" height="60" width="60" />
          <Block margin={[0, w3]} flex={false}>
            <Block row center flex={false}>
              <Text
                style={{maxWidth: wp(30)}}
                semibold
                size={18}
                margin={[0, w3, 0, 0]}>
                {username}
              </Text>
              <ImageComponent name="vehicle_icon" height="25" width="25" />
            </Block>
            <Text margin={[hp(0.5), 0, 0]} size={16} grey>
              {distance.toFixed(1)} km
            </Text>
          </Block>
        </Block>
        <Block
          flex={false}
          margin={[t1, 0, t1, 0]}
          borderWidth={[0, 0, 1, 0]}
          borderColorDeafult
        />
        <Block margin={[hp(0.5), 0]} space="between" row flex={false}>
          <Text size={16} regular>
            {CompletedMission}
          </Text>
          <Text grey size={16}>
            {strictValidObjectWithKeys(user) ? user.mission_completed : ''}
          </Text>
        </Block>
        <Block margin={[hp(0.5), 0]} space="between" row flex={false}>
          <Text size={16} regular>
            {HourClocked}
          </Text>
          <Text grey size={16}>
            {strictValidObjectWithKeys(user) ? user.mission_time : ''}
          </Text>
        </Block>
        <Block margin={[hp(0.5), 0]} space="between" row flex={false}>
          <Text size={16} regular>
            {HasVehicle}
          </Text>
          <Text grey size={16}>
            {is_vehicle === 1 ? 'Yes' : 'No'}
          </Text>
        </Block>
        <Block margin={[hp(0.5), 0]} space="between" row flex={false}>
          <Text size={16} regular>
            {Type}
          </Text>
          <FlatList
            data={checkValue(agent_type)}
            contentContainerStyle={flatlistDetailsStyle}
            renderItem={({item, index}) => {
              return (
                <Text grey size={16}>
                  {' '}
                  {item.name}
                </Text>
              );
            }}
          />
        </Block>
        <Block margin={[hp(0.5), 0]} space="between" row flex={false}>
          <Text size={16} regular>
            {Rating}
          </Text>
          <StarRating rating={rating || 0} />
        </Block>
        {Number(doc1) + Number(doc2) + Number(doc3) > 0 && (
          <Block center margin={[hp(0.5), 0]} space="between" row flex={false}>
            <Block>
              <Text size={16} regular>
                {Documents}
              </Text>
              <Text grey size={14} regular>
                {Number(doc1) + Number(doc2) + Number(doc3)} files uploaded
              </Text>
            </Block>
            <Block row flex={false}>
              <TouchableOpacity
                onPress={() =>
                  viewFile(details.identity_card, 'Identity Card.jpg')
                }>
                <ImageComponent name="doc_icon" height="40" width="40" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginHorizontal: wp(2)}}
                onPress={() =>
                  viewFile(details.social_security_number, 'Identity Card.jpg')
                }>
                <ImageComponent name="doc_icon" height="40" width="40" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => viewFile(details.cv, 'Identity Card.jpg')}>
                <ImageComponent name="doc_icon" height="40" width="40" />
              </TouchableOpacity>
            </Block>
          </Block>
        )}

        <Button
          isLoading={isLoad}
          onPress={() => bookAgents(id)}
          color="secondary">
          {ChooseAgent}
        </Button>
      </Block>
    );
  };
  return (
    <Block flex={false} padding={[t3, w5]}>
      {strictValidObjectWithKeys(details) ? (
        <>{_renderAgentDetails()}</>
      ) : (
        <>{_renderAgents()}</>
      )}
    </Block>
  );
};

const flatlistContainerStyle = {
  flexDirection: 'row-reverse',
  flexWrap: 'wrap',
  alignSelf: 'flex-end',
};
const flatlistDetailsStyle = {
  flexDirection: 'row-reverse',
  flexWrap: 'wrap',
  alignSelf: 'flex-end',
  width: wp(65),
};

export default AgentList;
