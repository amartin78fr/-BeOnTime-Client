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

const NumberOfAgents = ({state, setValues, closeModal, data}) => {
  const [noofagent, setnoofagent] = useState(state);
  const flatlistRef = useRef();
  const languageMode = useSelector((v) => v.languageReducer.language);

  const {Done, NumberOfAgentsLanguage} = languageMode;
  const _renderItem = ({item, index}) => {
    return (
      <CustomButton
        onPress={() => {
          setnoofagent(item);
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
          semibold={noofagent === item && '#000'}
          color={noofagent === item && '#000'}
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
        {NumberOfAgentsLanguage}
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
      <Button
        disabled={!noofagent}
        onPress={() => {
          setValues(noofagent);
          closeModal();
        }}
        color="secondary">
        {Done}
      </Button>
    </Block>
  );
};

export default NumberOfAgents;
