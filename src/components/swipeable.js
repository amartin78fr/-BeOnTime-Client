import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {strictValidNumber, strictValidString} from '../utils/commonUtils';
import {formatTime} from '../utils/site-specific-common-utils';
import {CustomButton, Text} from './';
import Block from './Block';
import ImageComponent from './ImageComponent';
import {w1} from './theme/fontsize';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ItemBox = ({data, handleDelete, handlePress, badge = false}) => {
  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity
        onPress={() => handleDelete(data)}
        activeOpacity={0.6}
        borderColorDeafult
        borderWidth={[0, 0, 1, 0]}
        margin={[0, 0, 0]}
        padding={[hp(1.5), 0]}
        flex={false}>
        <View style={styles.deleteBox}>
          <Animated.View style={{transform: [{scale: scale}]}}>
            <ImageComponent
              color="#fff"
              name="close_arrow_icon"
              height={20}
              width={20}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable renderRightActions={leftSwipe}>
      <CustomButton
        onPress={() => handlePress()}
        row
        center
        space="between"
        borderColorDeafult
        borderWidth={[0, 0, 1, 0]}
        margin={[0, 0, 0]}
        padding={[hp(1.5), w1]}
        flex={false}>
        <Block flex={false}>
          <Text size={16} semibold>
            {data.mission_id !== 0
              ? data.mission_title || data.title
              : 'Need support with operator'}
          </Text>
          <Text margin={[hp(0.5), 0, 0]} grey size={14}>
            {data.message}
          </Text>
        </Block>
        <Block flex={false} center middle>
          <Text grey size={14}>
            {formatTime(data.createdAt)}
          </Text>
          {(strictValidNumber(data.badge) || strictValidString(data.badge)) &&
            badge &&
            data.badge > 0 && (
              <View
                style={{
                  backgroundColor: '#000',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                  width: 20,
                  height: 20,
                  top: hp(0.5),
                }}>
                <Text center color={'#fff'} size={10}>
                  {data.badge}
                </Text>
              </View>
            )}
        </Block>
      </CustomButton>
    </Swipeable>
  );
};

export default ItemBox;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: SCREEN_WIDTH,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 16,
  },
  deleteBox: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp(3),
  },
});
