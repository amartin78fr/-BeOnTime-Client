import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Modalize} from 'react-native-modalize';
import ResponsiveImage from 'react-native-responsive-image';
import {useDispatch, useSelector} from 'react-redux';
import {images} from '../../assets';
import {Block, ImageComponent, Text} from '../../components';
import ActivityLoader from '../../components/activityLoader';
import Header from '../../components/common/header';
import {flushMissionAgents, missionsAgentRequest} from '../../redux/action';
import {
  strictValidArray,
  strictValidObjectWithKeys,
} from '../../utils/commonUtils';
import AgentList from './find';
import MapViewDirections from 'react-native-maps-directions';
import {googleKey} from '../../utils/constants';

const ChooseType = () => {
  const dispatch = useDispatch();
  const modalizeRef = useRef();
  const mapRef = useRef();
  const toggle = true;
  const [location, setlocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00922 * 1.5,
    longitudeDelta: 0.00421 * 1.5,
  });
  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00922 * 1.5,
    longitudeDelta: 0.00421 * 1.5,
  });

  // Reducers

  const mission = useSelector(
    (state) => state.agents.searchAgentList.searchList.data,
  );
  const isLoad = useSelector((state) => state.agents.agentMissionList.loading);
  const agentsData = useSelector(
    (state) => state.agents.agentMissionList.searchList.data,
  );
  const languageMode = useSelector((state) => state.languageReducer.language);

  const {ChooseAgent} = languageMode;

  useEffect(() => {
    const data = {
      mission_id: mission.id,
    };
    dispatch(missionsAgentRequest(data));
    return () => {
      dispatch(flushMissionAgents());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    onOpen();
  }, [agentsData]);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const getDefaultCoords = () => {
    return {
      latitude: 48.864716,
      longitude: 2.349014,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5,
    };
  };
  const isMapRegionSydney = (coords) => {
    return (
      coords.latitude >= 44.9333 &&
      coords.latitude <= 48.9044 &&
      coords.longitude >= 0.16 &&
      coords.longitude <= 4.8917
    );
  };
  useEffect(() => {
    const watchId = Geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5,
          // angle: position.coords.heading,
        };

        setlocation(region);
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 15000,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  const renderItem = (item) => (
    <Block>
      <Text>{item.username}</Text>
    </Block>
  );
  return (
    <Block primary>
      <Header centerText={ChooseAgent} />
      {isLoad && <ActivityLoader />}
      <Block flex={1}>
        <MapView
          ref={mapRef}
          style={{...StyleSheet.absoluteFillObject}}
          region={location}
          onRegionChangeComplete={async (coords) => {
            if (!isMapRegionSydney(coords)) {
              if (isMapRegionSydney(location)) {
                mapRef.current?.animateCamera(location);
              } else {
                setlocation(getDefaultCoords());
                mapRef.current?.animateCamera(getDefaultCoords());
              }
              return;
            }
          }}>
          {destination.latitude > 0 && (
            <MapViewDirections
              origin={location}
              destination={destination}
              apikey={googleKey}
              strokeWidth={3}
            />
          )}
          <Marker coordinate={location}>
            <TouchableOpacity>
              <ResponsiveImage
                style={{
                  transform: [{rotate: '120deg'}],
                }}
                source={images.currentlocation_icon}
                initHeight="60"
                initWidth="60"
              />
            </TouchableOpacity>
          </Marker>
          {agentsData &&
            agentsData.map((item, index) => {
              const marker = {
                latitude: JSON.parse(item.work_location_latitude),
                longitude: JSON.parse(item.work_location_longitude),
              };
              return (
                <Marker
                  onPress={() => {
                    onOpen();
                    setDestination({
                      latitude: JSON.parse(item.work_location_latitude),
                      longitude: JSON.parse(item.work_location_longitude),
                      latitudeDelta: 0.00922 * 1.5,
                      longitudeDelta: 0.00421 * 1.5,
                    });
                  }}
                  title={item.first_name}
                  coordinate={marker}>
                  <ImageComponent
                    name={
                      item.agent_type === 7
                        ? 'hostess_icon_selected'
                        : 'agent_icon_selected'
                    }
                    height="60"
                    width="60"
                  />
                </Marker>
              );
            })}
        </MapView>
      </Block>
      <Modalize
        overlayStyle={modalizeStyle}
        adjustToContentHeight={toggle}
        tapGestureEnabled={false}
        scrollViewProps={{
          scrollEnabled: false,
        }}
        handlePosition="inside"
        ref={modalizeRef}>
        <AgentList
          mission={strictValidObjectWithKeys(mission) && mission}
          data={strictValidArray(agentsData) && agentsData}
        />
      </Modalize>
    </Block>
  );
};
const modalizeStyle = {backgroundColor: 'transparent'};
export default ChooseType;
