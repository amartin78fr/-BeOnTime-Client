/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import ResponsiveImage from 'react-native-responsive-image';
import {images} from '../../assets';

const CommonMap = ({destination, agent, liteMode}) => {
  const [location, setlocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.033737423651551524,
    longitudeDelta: 0.027754828333854675,
  });
  const mapRef = useRef();

  useEffect(() => {
    setlocation({
      latitude: JSON.parse(agent.latitude),
      longitude: JSON.parse(agent.longitude),
      latitudeDelta: 0.033737423651551524,
      longitudeDelta: 0.027754828333854675,
    });
  }, []);

  return (
    <MapView
      ref={mapRef}
      style={{...StyleSheet.absoluteFillObject}}
      region={location}
      onRegionChangeComplete={async (coords) => {
        mapRef.current?.animateCamera(coords);
      }}>
      <Marker coordinate={location}>
        <View>
          <ResponsiveImage
            style={{
              transform: [{rotate: '120deg'}],
            }}
            source={images.currentlocation_icon}
            initHeight="60"
            initWidth="60"
          />
        </View>
      </Marker>
    </MapView>
  );
};
CommonMap.defaultProps = {
  destination: {},
  liteMode: false,
};

export default CommonMap;
