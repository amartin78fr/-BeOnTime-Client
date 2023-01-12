import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ResponsiveImage from 'react-native-responsive-image';
import PropTypes from 'prop-types';
import Text from './Text';
import {images} from '../assets';
import {strictValidObjectWithKeys} from '../utils/commonUtils';
import {connect, useSelector} from 'react-redux';
import {getNotificationRequest} from '../redux/action';

const styles = StyleSheet.create({
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: wp(2),
    paddingBottom: hp(2),
    borderTopWidth: 2,
    borderTopColor: '#E9EBF3',
    shadowColor: '#E9EBF3',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

const tabImages = {
  Map: 'map',
  Message: 'message',
  Missions: 'mission',
  Notifications: 'notification',
  Profile: 'profile',
};

const renderHeight = (type) => {
  switch (type) {
    case 'map':
      return 23;
    case 'message':
      return 25;

    case 'mission':
      return 25;
    case 'notification':
      return 25;
    case 'profile':
      return 25;
    default:
      return 22;
  }
};
const renderWidth = (type) => {
  switch (type) {
    case 'map':
      return 26;
    case 'message':
      return 25;

    case 'mission':
      return 25;
    case 'notification':
      return 25;
    case 'profile':
      return 22;
    default:
      return 22;
  }
};

const BottomTab = ({
  state,
  descriptors,
  navigation,
  callNotificationApi,
  notifications,
  chat,
}) => {
  const languageMode = useSelector((v) => v.languageReducer.language);

  const {
    ProfileLanguage,
    NotificationsLanguage,
    MessageCenterHeader,
    Map,
    MissionHeader,
  } = languageMode;
  const renderLabel = (type) => {
    switch (type) {
      case 'Map':
        return Map;
      case 'Message':
        return MessageCenterHeader;
      case 'Missions':
        return MissionHeader;
      case 'Notifications':
        return NotificationsLanguage;
      case 'Profile':
        return ProfileLanguage;
      default:
        return 'Beontime';
    }
  };
  return (
    <View style={styles.ButtonContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            testID={options.tabBarTestID}
            onLongPress={onLongPress}
            accessibilityStates={isFocused ? ['selected'] : []}
            style={main}
            onPress={onPress}>
            <View
              style={[
                isFocused && {borderTopWidth: 3},
                {width: wp(6), alignItems: 'center'},
              ]}
            />
            <ResponsiveImage
              source={
                isFocused
                  ? images[`${tabImages[label]}S`]
                  : images[`${tabImages[label]}U`]
              }
              // initHeight={renderHeight(isFocused, tabImages[label])}
              initHeight={renderHeight(tabImages[label])}
              initWidth={renderWidth(tabImages[label])}
              style={{marginTop: hp(1.5)}}
            />
            {strictValidObjectWithKeys(notifications) &&
            notifications.all_count > 0 &&
            tabImages[label] === 'notification' ? (
              <View style={notiallCounts}>
                <Text center color={'white'} size={10}>
                  {notifications.all_count}
                </Text>
              </View>
            ) : null}
            {strictValidObjectWithKeys(chat) &&
            chat.all_count > 0 &&
            tabImages[label] === 'message' ? (
              <View style={allCountStyles}>
                <Text center color={'white'} size={10}>
                  {chat.all_count}
                </Text>
              </View>
            ) : null}

            {isFocused ? (
              <Text semibold size={12} regular style={focused}>
                {renderLabel(label)}
              </Text>
            ) : (
              <Text size={13} center regular style={unfocused} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

BottomTab.propTypes = {
  state: PropTypes.shape(PropTypes.object),
};
BottomTab.defaultProps = {
  state: 'Search here',
};
const unfocused = {
  marginTop: hp(1),
  color: '#000',
  width: wp(7),
};
const focused = {
  marginTop: hp(1),
  color: '#000',
  textAlign: 'center',
};
const main = {alignItems: 'center', width: wp(18)};

const allCountStyles = {
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  position: 'absolute',
  width: 20,
  height: 20,
  right: wp(4),
  top: hp(1),
};
const notiallCounts = {
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  position: 'absolute',
  width: 20,
  height: 20,
  right: wp(4),
  top: hp(1),
};
const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.notifications.data,
    chat: state.messages.chat.data,
    isLoad: state.notifications.notifications.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callNotificationApi: (...params) =>
      dispatch(getNotificationRequest(...params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BottomTab);
