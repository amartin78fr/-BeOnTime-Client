/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import {Block, CustomButton, ImageComponent, Text} from '../../components';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {images} from '../../assets';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ResponsiveImage from 'react-native-responsive-image';
import {t2, w3, w4} from '../../components/theme/fontsize';
import {useNavigation} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import SearchFilters from './components/SearchFilters';
import {useDispatch, useSelector} from 'react-redux';
import {
  agentslistRequest,
  locationSuccess,
  profileRequest,
  socketConnection,
} from '../../redux/action';
import {strictValidArrayWithLength} from '../../utils/commonUtils';
import GooglePlacesTextInput from '../../components/googlePlaces';
import {useDoubleBackPressExit} from '../../utils/site-specific-common-utils';
import io from 'socket.io-client';

const Home = () => {
  const [filters, setFiltes] = useState([]);
  const [isvehicle, setIsVehicle] = useState(1);
  const mapRef = useRef();
  const navigation = useNavigation();
  const agentData = useSelector((state) => state.agents.list.agents.data);
  const languageMode = useSelector((state) => state.languageReducer.language);

  const {SearchLocation, BookOnlyParis, Filters} = languageMode;
  const [toggle, setToggle] = useState(true);
  const [location, setlocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00922 * 1.5,
    longitudeDelta: 0.00421 * 1.5,
  });
  const modalizeRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const BackButton = BackHandler.addEventListener(
      'hardwareBackPress',
      useDoubleBackPressExit,
    );
    return () => BackButton.remove();
  }, []);

  useEffect(() => {
    dispatch(profileRequest());
    const socket = io('https://api.beontime.io');
    socket.on('connect', (a) => {
      dispatch(socketConnection(socket));
    });
    dispatch(agentslistRequest({agent_type: filters, isvehicle: isvehicle}));
  }, [filters]);

  const setResponse = ({newRes, isVehicle}) => {
    setFiltes(newRes);
    setIsVehicle(isVehicle);
  };
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
        // if (!isMapRegionSydney(position.coords)) {
        //   Alert.alert(BookOnlyParis);

        //   return;
        // } else {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5,
          // angle: position.coords.heading,
        };
        dispatch(locationSuccess(position.coords));

        setlocation(region);
        // }
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 15000,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  const changeLocation = (data, details) => {
    const longitude = details.geometry.location.lng;
    const latitude = details.geometry.location.lat;
    setlocation({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5,
    });
  };
  return (
    <Block>
      <SafeAreaView style={{backgroundColor: '#fff'}} />
      <Block flex={1}>
        <MapView
          ref={mapRef}
          scrollEnabled
          style={[styles.map]}
          region={location}
          // onRegionChangeComplete={async (coords) => {
          //   if (!isMapRegionSydney(coords)) {
          //     if (isMapRegionSydney(location)) {
          //       mapRef.current?.animateCamera(location);
          //     } else {
          //       setlocation({
          //         latitude: 48.864716,
          //         longitude: 2.349014,
          //         latitudeDelta: 0.00922 * 1.5,
          //         longitudeDelta: 0.00421 * 1.5,
          //       });
          //       dispatch(
          //         locationSuccess({
          //           latitude: 48.864716,
          //           longitude: 2.349014,
          //           latitudeDelta: 0.00922 * 1.5,
          //           longitudeDelta: 0.00421 * 1.5,
          //         }),
          //       );
          //       mapRef.current?.animateCamera(getDefaultCoords());
          //     }
          //     return;
          //   }
          // }}>
          onRegionChangeComplete={async (coords) => {
            mapRef.current?.animateCamera(location);
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
          {strictValidArrayWithLength(agentData) &&
            agentData.map((item, index) => {
              const marker = {
                latitude: JSON.parse(item.work_location_latitude),
                longitude: JSON.parse(item.work_location_longitude),
              };
              return (
                <Marker title={item.username} coordinate={marker}>
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

      <View style={styles.searchView}>
        <SafeAreaView />
        {/* <TextInput
          style={styles.textInputStyle}
          placeholder={'Paris, France'}
          placeholderTextColor={'#666'}
        /> */}
        <GooglePlacesTextInput
          placeholder={SearchLocation}
          onPress={(data, details) => changeLocation(data, details)}
          textInputProps={{
            placeholderTextColor: '#8A8E99',
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.PlusIcon}
        onPress={() => navigation.navigate('CreateMission')}>
        <ImageComponent name="plus_icon" height="60" width="70" />
      </TouchableOpacity>
      <CustomButton
        color="#fff"
        shadow
        row
        center
        padding={[hp(1.5), w4]}
        borderRadius={30}
        onPress={() => onOpen()}
        style={styles.filterButton}>
        <ImageComponent name="filter_icon" height="14" width="17" />
        <Text semibold margin={[0, 0, 0, w3]} size={14}>
          {Filters}
        </Text>
      </CustomButton>
      <Modalize
        adjustToContentHeight={toggle}
        handlePosition="inside"
        ref={modalizeRef}>
        <SearchFilters
          state={filters}
          isvehicle={isvehicle}
          setState={(v) => {
            setResponse(v);
            modalizeRef.current?.close();
          }}
        />
      </Modalize>
    </Block>
  );
};
const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  textInputStyle: {
    height: hp(5),
    color: '#000',
    borderRadius: 10,
    backgroundColor: '#F5F7FA',
    paddingLeft: wp(3),
  },
  searchView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? hp(2) : 0,
    width: '100%',
    padding: hp(2),
    backgroundColor: '#FFFFFF',
  },
  PlusIcon: {
    position: 'absolute',
    bottom: t2,
    right: w3,
  },
  filterButton: {
    position: 'absolute',
    bottom: t2,
    left: w3,
  },
});

export default Home;
