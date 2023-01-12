import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Block, Button, Text} from '../../../components';
import {t3, w5} from '../../../components/theme/fontsize';

const MissionDetails = () => {
  const navigation = useNavigation();
  const renderDetails = (title) => {
    return (
      <Text margin={[heightPercentageToDP(1), 0]} semibold size={16}>
        {title} :{' '}
        <Text regular size={16}>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut
        </Text>
      </Text>
    );
  };
  return (
    <Block padding={[t3, w5]}>
      {renderDetails('Guard Service')}
      {renderDetails('Intervention')}
      {renderDetails('Security Patrol')}
      <Button
        onPress={() => {
          navigation.navigate('ChatOperator', {
            name: 'Need Support with Operator',
          });
        }}
        color="secondary">
        Contact Support Team
      </Button>
    </Block>
  );
};

export default MissionDetails;
