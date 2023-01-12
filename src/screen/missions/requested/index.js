/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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
  strictValidArrayWithLength,
  strictValidObjectWithKeys,
} from '../../../utils/commonUtils';
import {divider} from '../../../utils/commonView';
import {AgentType} from '../../../utils/data';
import ActivityLoader from '../../../components/activityLoader';
import InfiniteScroll from '../../../components/Flatlist';
import {missionType} from '../../../utils/constants';
import Pagination from '../../../components/pagination';
import {config} from '../../../utils/config';
import io from 'socket.io-client';

const Requested = () => {
  const navigation = useNavigation();
  const MissionData = useSelector((state) => state.mission.missions.data);
  const isLoading = useSelector((state) => state.mission.missions.loading);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const {missionPending, missionPending_count} =
    strictValidObjectWithKeys(MissionData) && MissionData;
  const [pageSize, setPageSize] = useState(1);
  const languageMode = useSelector((state) => state.languageReducer.language);

  const {
    NotificationSoon,
    InReview,
    MissionDetails,
    Cancel,
    AreYouSure,
    CancelledRequest,
    YesDoIt,
  } = languageMode;
  const socket = io(config.Api_Url);

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
        getMissionsRequest({page: pageSize, type: missionType.MissionPending}),
      );
    }, []),
  );

  const onhandleDelete = async (mission_id) => {
    const token = await AsyncStorage.getItem('token');
    socket.emit('ontime_customer_mission_request', {mission_id, token});
    socket.on(`refresh_feed_${mission_id}`, (msg) => {
      dispatch(
        getMissionsRequest({page: pageSize, type: missionType.MissionPending}),
      );
    });
    dispatch(
      getMissionsRequest({page: pageSize, type: missionType.MissionPending}),
    );
  };
  const handleAlerts = (id) => {
    Alert.alert(
      AreYouSure,
      CancelledRequest,
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
  const renderCards = ({item, index}) => {
    return (
      <Block
        shadow
        primary
        margin={[hp(1), w5, t2]}
        padding={[0, 0, t2, 0]}
        borderRadius={10}>
        {/* <Block margin={[0, 0, t2]} style={{height: hp(15)}} secondary>
          <CommonMap liteMode={true} />
        </Block> */}
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

        <Block row space={'around'} flex={false} center>
          <Text onPress={() => handleAlerts(item.id)} size={18} semibold>
            {Cancel}
          </Text>
          <Button
            onPress={() =>
              navigation.navigate('MissionDetails', {
                item: item,
              })
            }
            style={{width: wp(60)}}
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
          <Text bold margin={[-t1, 0, 0, 0]}>
            ...
          </Text>
        </Block>
        <Block margin={[0, w3]} flex={false}>
          <Block flex={false}>
            <>
              <Text semibold size={16} margin={[0, w3, 0, 0]}>
                {InReview}
              </Text>
              <Text margin={[hp(0.5), 0, 0]} size={14} grey>
                {NotificationSoon}
              </Text>
            </>
          </Block>
        </Block>
      </Block>
    );
  };

  const loadMore = async () => {
    if (pageSize <= missionPending_count) {
      await setPageSize(pageSize + 1);
      await dispatch(
        getMissionsRequest({page: pageSize, type: missionType.MissionPending}),
      );
    }
  };

  return (
    <Block primary>
      <Block padding={[t2, 0]}>
        {!refreshing && isLoading && <ActivityLoader />}
        {strictValidArrayWithLength(missionPending) && (
          <InfiniteScroll
            refreshControl={
              <RefreshControl
                tintColor="#000"
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            contentContainerStyle={{flexGrow: 1}}
            ListEmptyComponent={<EmptyFile />}
            data={missionPending}
            renderItem={renderCards}
            loadingText="Loading"
            onLoadMore={loadMore}
          />
        )}
      </Block>
      {/* {missionPending_count > 1 && (
        <Pagination
          pageSize={pageSize}
          setPageSize={(v) => setPageSize(v)}
          dataPerPage={missionPending_count}
        />
      )} */}
    </Block>
  );
};
const circle = {height: 50, width: 50};

export default Requested;
