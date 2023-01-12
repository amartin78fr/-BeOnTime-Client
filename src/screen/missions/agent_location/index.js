/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
import {Block, ImageComponent} from '../../../components';
import Header from '../../../components/common/header';
import {View, StyleSheet} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import ResponsiveImage from 'react-native-responsive-image';
import MapView, {Marker} from 'react-native-maps';
import {images} from '../../../assets';
import {googleKey} from '../../../utils/constants';
import {io} from 'socket.io-client';
import {config} from '../../../utils/config';

const AgentLocation = ({
  route: {
    params: {item},
  },
}) => {
  const mapRef = useRef();
  const [location, setlocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00922 * 1.5,
    longitudeDelta: 0.00421 * 1.5,
    angle: 120,
  });
  const [agentLocation, setAgentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00922 * 1.5,
    longitudeDelta: 0.00421 * 1.5,
    angle: 120,
  });

  useEffect(() => {
    setAgentLocation({
      latitude: JSON.parse(item.current_latitude),
      longitude: JSON.parse(item.current_longitude),
      latitudeDelta: JSON.parse(item.current_latitudeDelta),
      longitudeDelta: JSON.parse(item.current_longitudeDelta),
      angle: JSON.parse(item.current_angle),
    });
  }, []);
  const {id, username, title, latitude, longitude, agent_type, agent_id} = item;

  useEffect(() => {
    const socket = io(config.Api_Url);
    socket.on(`agent_location_${id}`, (msg) => {
      setAgentLocation({
        latitude: JSON.parse(msg.latitude),
        longitude: JSON.parse(msg.longitude),
        latitudeDelta: JSON.parse(msg.latitudeDelta),
        longitudeDelta: JSON.parse(msg.longitudeDelta),
        angle: JSON.parse(msg.angle),
      });
    });
  }, []);

  useEffect(() => {
    setlocation({
      latitude: JSON.parse(latitude),
      longitude: JSON.parse(longitude),
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5,
      angle: 120,
    });
  }, []);

  return (
    <Block primary>
      <Header centerText={username} bottomText={`MISN0${item.id}`} />
      <Block flex={1}>
        {location.latitude > 0 && (
          <MapView
            ref={mapRef}
            scrollEnabled
            style={styles.map}
            initialRegion={location}>
            <Marker coordinate={agentLocation}>
              <View>
                <ResponsiveImage
                  style={{
                    transform: [
                      {rotate: `${Math.ceil(agentLocation.angle) - 50}deg`},
                    ],
                  }}
                  source={
                    agent_type === 7
                      ? images.hostess_icon_selected
                      : images.agent_icon_selected
                  }
                  initHeight="60"
                  initWidth="60"
                />
              </View>
            </Marker>
            {agentLocation.latitude > 0 && (
              <MapViewDirections
                origin={agentLocation}
                destination={{
                  latitude: latitude,
                  longitude: longitude,
                }}
                apikey={googleKey}
                strokeWidth={3}
              />
            )}

            <Marker
              coordinate={{
                latitude: JSON.parse(latitude),
                longitude: JSON.parse(longitude),
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5,
              }}>
              <ImageComponent
                name={'currentlocation_icon'}
                height="60"
                width="60"
              />
            </Marker>
          </MapView>
        )}
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default AgentLocation;
