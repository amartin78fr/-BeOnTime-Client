import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {BackHandler, FlatList} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {Block, Text, CustomButton} from '../../components';
import Header from '../../components/common/header';
import {t2} from '../../components/theme/fontsize';
import {useDoubleBackPressExit} from '../../utils/site-specific-common-utils';

const Missions = ({navigationState}) => {
  const {routes, index} = navigationState;
  const selected = index;
  const navigation = useNavigation();
  const languageMode = useSelector((state) => state.languageReducer.language);

  const {
    Requested,
    InProgress,
    Finished,
    MissionHeader,
    CustomRequest,
    type,
  } = languageMode;
  const getValues = (name) => {
    if (name === 'Requested') {
      return Requested;
    }
    if (name === 'InProgress') {
      return InProgress;
    }
    if (name === 'CustomRequest') {
      return CustomRequest;
    }
    return Finished;
  };

  useEffect(() => {
    const BackButton = BackHandler.addEventListener(
      'hardwareBackPress',
      useDoubleBackPressExit,
    );
    return () => BackButton.remove();
  }, []);

  return (
    <Block primary flex={false}>
      <Header centerText={MissionHeader} leftIcon />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={routes}
        horizontal
        style={{alignSelf: 'center', borderRadius: 30}}
        contentContainerStyle={containerStyle}
        keyExtractor={(item) => item.key}
        renderItem={({item, index}) => {
          return (
            <CustomButton
              onPress={() => navigation.navigate(item.name)}
              center
              middle
              borderRadius={30}
              padding={selected === index ? [hp(1.5), wp(4)] : [hp(1.5), wp(4)]}
              color={selected === index ? '#FFFFFF' : '#F7F8FA'}
              shadow={selected === index}
              margin={[0, wp(0)]}>
              {item.name === 'CustomRequest' && type === 'fr' ? (
                <Text
                  center
                  style={{width: wp(22)}}
                  numberOfLines={2}
                  size={14}
                  semibold>
                  {getValues(item.name)}
                </Text>
              ) : (
                <Text size={14} semibold>
                  {getValues(item.name)}
                </Text>
              )}
            </CustomButton>
          );
        }}
      />
    </Block>
  );
};
const containerStyle = {
  backgroundColor: '#F7F8FA',
  borderRadius: 30,
  marginVertical: t2,
};
export default Missions;
