/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {Block, Button, ImageComponent, Text} from '../../../components';
import EmptyFile from '../../../components/emptyFile';
import {t1, t2, w3, w5} from '../../../components/theme/fontsize';
import {getMissionsRequest} from '../../../redux/action';
import {
  strictValidObject,
  strictValidObjectWithKeys,
} from '../../../utils/commonUtils';
import {divider} from '../../../utils/commonView';
import {AgentType} from '../../../utils/data';
import ActivityLoader from '../../../components/activityLoader';
import {missionType} from '../../../utils/constants';
import Pagination from '../../../components/pagination';

const InProgress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const MissionData = useSelector((state) => state.mission.missions.data);
  const isLoading = useSelector((state) => state.mission.missions.loading);
  const [pageSize, setPageSize] = useState(1);
  const {missionInProgress_count} =
    strictValidObjectWithKeys(MissionData) && MissionData;
  const [refreshing, setRefreshing] = useState(false);

  const languageMode = useSelector((state) => state.languageReducer.language);

  const {
    TrackAgentLocation,
    MissionAccepted,
    MissionDetails,
    ReachingFewMins,
  } = languageMode;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    setPageSize(1);
    dispatch(getMissionsRequest({page: 1, type: missionType.MissionPending}));
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getMissionsRequest({
          page: pageSize,
          type: missionType.MissionInProgress,
        }),
      );
    }, [pageSize]),
  );

  const renderCards = ({item, index}) => {
    return (
      <Block
        shadow
        primary
        margin={[hp(1), w5, t2]}
        padding={[0, 0, t2, 0]}
        borderRadius={10}>
        <Block padding={[hp(2), w3, 0]}>
          <Text semibold grey size={14}>
            MISN0{item.id}
          </Text>
          <Text margin={[hp(0.5), 0]} size={16} semibold>
            {item.title}
          </Text>
        </Block>
        {divider()}
        {renderAgentDetails(item)}
        {renderRequestReview(item)}
        <Block space={'around'} flex={false} center>
          <Button
            onPress={() =>
              navigation.navigate('AgentLocation', {
                item: item,
              })
            }
            style={{width: wp(80)}}
            color="primary">
            {TrackAgentLocation}
          </Button>

          <Button
            onPress={() =>
              navigation.navigate('MissionDetails', {
                item: item,
              })
            }
            style={{width: wp(80)}}
            color="secondary">
            {MissionDetails}
          </Button>
        </Block>
      </Block>
    );
  };
  const renderAgentDetails = (item) => {
    return (
      <Block margin={[0, w3, t1]} flex={false} row center>
        <ImageComponent name="blurAvatar_icon" height="50" width="50" />
        <Block margin={[0, w3]} flex={false}>
          <Text semibold size={18} margin={[0, w3, 0, 0]}>
            {item.username}
          </Text>
          <Text margin={[hp(0.5), 0, 0]} size={16} grey>
            {AgentType(item.agent_type)}
          </Text>
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
          <Text size={12} bold>
            0%
          </Text>
        </Block>
        <Block margin={[0, w3]} flex={false}>
          <Block flex={false}>
            <>
              <Text semibold size={16} margin={[0, w3, 0, 0]}>
                {MissionAccepted}
              </Text>
              <Text margin={[hp(0.5), 0, 0]} size={14} grey>
                {ReachingFewMins}
              </Text>
            </>
          </Block>
        </Block>
      </Block>
    );
  };
  return (
    <Block primary>
      <Block padding={[t2, 0]}>
        {!refreshing && isLoading && <ActivityLoader />}
        {strictValidObject(MissionData) && (
          <FlatList
            refreshControl={
              <RefreshControl
                tintColor="#000"
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            contentContainerStyle={{flexGrow: 1}}
            ListEmptyComponent={<EmptyFile />}
            data={MissionData.missionInProgress}
            renderItem={renderCards}
          />
        )}
      </Block>
      {missionInProgress_count > 1 && (
        <Pagination
          pageSize={pageSize}
          setPageSize={(v) => setPageSize(v)}
          dataPerPage={missionInProgress_count}
        />
      )}
    </Block>
  );
};
const circle = {height: 50, width: 50};

export default InProgress;
