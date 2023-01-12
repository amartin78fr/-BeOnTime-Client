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
import {strictValidArrayWithLength} from '../../../utils/commonUtils';

const NumberOfHours = ({state, setValues, closeModal, data}) => {
  const [time, settime] = useState(1);
  const [min, setMin] = useState(0);
  const flatlistRef = useRef();
  const flatlistMinRef = useRef();
  const [minutes, setMinutes] = useState([]);
  const languageMode = useSelector((v) => v.languageReducer.language);

  const {NumberOfHours, NumberOfMin, Done} = languageMode;

  React.useEffect(() => {
    if (state && strictValidArrayWithLength(minutes)) {
      const myArr = state && state.split(':');
      const getMinutes = Number(myArr[1]) || 0;
      const getHours = Number(myArr[0]) || 1;
      setMin(getMinutes);
      // flatlistRef.current &&
      //   flatlistRef.current.scrollToIndex({
      //     animated: true,
      //     index: getHours,
      //     viewOffset: Dimensions.get('window').width / 2.5,
      //   });
      settime(getHours);
      // flatlistMinRef.current &&
      //   flatlistMinRef.current.scrollToIndex({
      //     animated: true,
      //     index: getMinutes,
      //     viewOffset: Dimensions.get('window').width / 2.5,
      //   });
    }
  }, [state, minutes]);

  React.useEffect(() => {
    const array = [];
    var points = new Array(61);

    for (var i = 0; i < points.length; i++) {
      array.push(i);
    }
    setMinutes(array);
  }, []);
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
  const _renderItemMinutes = ({item, index}) => {
    return (
      <CustomButton
        onPress={() => {
          setMin(item);
          flatlistMinRef.current &&
            flatlistMinRef.current.scrollToIndex({
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
          semibold={min === item && '#000'}
          color={min === item && '#000'}
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
        {NumberOfHours}
      </Text>
      <Block margin={[t1, 0, 0]} flex={false} center middle>
        <ImageComponent name="selected_icon" height="15" width="15" />
      </Block>
      <FlatList
        ref={flatlistRef}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        data={data}
        renderItem={_renderItem}
        decelerationRate={0}
        snapToInterval={wp(90) - (wp(40) + wp(40))}
        snapToAlignment={'center'}
        contentInset={{
          top: 0,
          left: wp(45),
          bottom: 0,
          right: wp(45),
        }}
      />
      <Text margin={[t1]} semibold center size={22}>
        {NumberOfMin}
      </Text>
      <Block margin={[t1, 0, 0]} flex={false} center middle>
        <ImageComponent name="selected_icon" height="15" width="15" />
      </Block>
      <FlatList
        ref={flatlistMinRef}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        data={minutes}
        renderItem={_renderItemMinutes}
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
          setValues(time, min);
          closeModal();
        }}
        color="secondary">
        {Done}
      </Button>
    </Block>
  );
};

export default NumberOfHours;
