/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
import {customMissionRequest} from '../../../redux/action';
import {strictValidArrayWithLength} from '../../../utils/commonUtils';
import {AgentType} from '../../../utils/data';
import ActivityLoader from '../../../components/activityLoader';
import InfiniteScroll from '../../../components/Flatlist';
import {missionType} from '../../../utils/constants';
import {config} from '../../../utils/config';
import io from 'socket.io-client';

const CustomRequest = () => {
  const navigation = useNavigation();
  const [state, setState] = useState([]);
  const MissionData = useSelector((v) => v.mission.customMissions.data);
  const isLoading = useSelector((v) => v.mission.customMissions.loading);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(1);
  const languageMode = useSelector((v) => v.languageReducer.language);

  const {
    NotificationSoon,
    InReview,
    MissionDetails,
    TrackAgentLocation,
    CustomRequestAccepted,
    MakeProcessedMission,
    RequestInProgress,
    CustomMissionCompleted,
    MissionConfirmed,
  } = languageMode;
  const socket = io(config.Api_Url);

  // useEffect(() => {
  //   if (strictValidObjectWithKeys(MissionData)) {
  //     let updatedData = state.concat(missionPending);
  //     setState(updatedData);
  //   }
  // }, []);
  useEffect(() => {
    if (strictValidArrayWithLength(MissionData)) {
      let updatedData = state.concat(MissionData);
      setState(updatedData);
    }
  }, [MissionData]);

  // const loadMore = async () => {
  //   if (pageSize <= missionPending_count) {
  //     await setPageSize(pageSize + 1);
  //   }
  // };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    setPageSize(1);
    setState([]);
    dispatch(customMissionRequest({page: 1, type: missionType.MissionPending}));
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        customMissionRequest({
          page: pageSize,
          type: missionType.MissionPending,
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
          <Block flex={false} row space="between">
            <Text semibold grey size={14}>
              MISN0{item.id}
            </Text>
          </Block>
          <Text margin={[hp(0.5), 0]} size={16} semibold>
            {item.title}
          </Text>
        </Block>
        <Block
          flex={false}
          borderWidth={[0, 0, 1, 0]}
          borderColorDeafult
          margin={[t1, 0]}
        />
        {renderRequestReview(item)}
        <Block space={'around'} flex={false} center>
          {item.status === 3 && (
            <Button
              onPress={() =>
                navigation.navigate('CustomAgentLocation', {
                  item: item,
                })
              }
              style={{width: wp(80)}}
              color="primary">
              {TrackAgentLocation}
            </Button>
          )}

          <Button
            onPress={() =>
              navigation.navigate('CustomRequestDetail', {
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
  const renderRequestReview = (item) => {
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
            {item.status === 0 && (
              <>
                <Text semibold size={16} margin={[0, w3, 0, 0]}>
                  {InReview}
                </Text>
                <Text
                  style={{width: wp(70)}}
                  margin={[hp(0.5), 0, 0]}
                  size={14}
                  grey>
                  {NotificationSoon}
                </Text>
              </>
            )}
            {item.status === 1 && (
              <>
                <Text semibold size={16} margin={[0, w3, 0, 0]}>
                  {CustomRequestAccepted}
                </Text>
                <Text
                  style={{width: wp(70)}}
                  margin={[hp(0.5), 0, 0]}
                  size={14}
                  grey>
                  {MakeProcessedMission}
                </Text>
              </>
            )}
            {(item.status === 2 || item.status === 3) && (
              <>
                <Text semibold size={16} margin={[0, w3, 0, 0]}>
                  {RequestInProgress}
                </Text>
              </>
            )}
            {item.status === 4 && (
              <>
                <Text semibold size={16} margin={[0, w3, 0, 0]}>
                  {CustomMissionCompleted}
                </Text>
                <Text
                  style={{width: wp(70)}}
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

  return (
    <Block primary>
      <Block padding={[t2, 0]}>
        {!refreshing && isLoading && <ActivityLoader />}
        {strictValidArrayWithLength(MissionData) && (
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
            data={MissionData}
            renderItem={renderCards}
            // onLoadMore={loadMore}
          />
        )}
      </Block>
      {/* {!refreshing && !isLoading && (
        <FlatList
          data={[1, 2, 3]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={() => (
            <Block center flex={false} margin={[t1, 0]}>
              <SkeletonComponent
                white
                style={{
                  height: hp(25),
                  width: wp(90),
                }}
              />
            </Block>
          )}
        />
      )} */}
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

export default CustomRequest;
