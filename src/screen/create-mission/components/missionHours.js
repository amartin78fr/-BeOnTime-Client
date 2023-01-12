import React, {useRef, useState} from 'react';
import {Dimensions, FlatList} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {
  Block,
  Button,
  CustomButton,
  ImageComponent,
  Text,
} from '../../../components';
import {t1, t3, w5} from '../../../components/theme/fontsize';

const dataNum = [
  '1:00',
  '2:00',
  '3:00',
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
];
const MissionFinishHours = ({state, setValues, closeModal}) => {
  const [time, settime] = useState(state);
  const flatlistRef = useRef();
  const languageMode = useSelector((v) => v.languageReducer.language);
  const {MissionFinishTime, Done} = languageMode;
  const _renderItem = ({item, index}) => {
    return (
      <CustomButton
        onPress={() => {
          settime(item);
          flatlistRef.current &&
            flatlistRef.current.scrollToIndex({
              animated: true,
              index,
              viewOffset: Dimensions.get('window').width / 2.5,
            });
        }}
        margin={[t1, 0]}
        center
        middle
        padding={[t1 * 1.5]}>
        <Text
          semibold={time === item && '#000'}
          color={time === item && '#000'}
          grey
          size={20}>
          {item}
        </Text>
      </CustomButton>
    );
  };
  return (
    <Block padding={[t3, w5]}>
      <Text margin={[t1]} semibold center size={22}>
        {MissionFinishTime}
      </Text>
      <Block margin={[t1, 0, 0]} flex={false} center middle>
        <ImageComponent name="selected_icon" height="15" width="15" />
      </Block>
      <FlatList
        ref={flatlistRef}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        data={dataNum}
        renderItem={_renderItem}
        decelerationRate={0}
        snapToInterval={wp(94) - (wp(47) + wp(47))}
        snapToAlignment={'center'}
        contentInset={{
          top: 0,
          left: wp(45),
          bottom: 0,
          right: wp(45),
        }}
      />

      <Button
        disabled={!time}
        onPress={() => {
          setValues(time);
          closeModal();
        }}
        color="secondary">
        {Done}
      </Button>
    </Block>
  );
};

export default MissionFinishHours;
