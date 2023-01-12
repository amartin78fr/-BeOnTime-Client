import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {Block, Button, CustomButton, Text} from '../../../components';
import {t1, t3, w5} from '../../../components/theme/fontsize';

const MissionType = ({state, setValues, closeModal}) => {
  const [mission, setmission] = useState({
    name: state.name,
    value: state.value,
  });
  const languageMode = useSelector((v) => v.languageReducer.language);
  const {
    MissionTypeHeader,
    Done,
    GuardService,
    Intervention,
    SecurityPatrol,
    NotSure,
  } = languageMode;
  const _renderItem = ({item}) => {
    return (
      <CustomButton
        onPress={() => setmission(item)}
        margin={[t1, 0]}
        center
        borderRadius={10}
        middle
        color={item.name === mission.name ? '#000' : '#F5F7FA'}
        padding={[t1 * 1.5]}>
        <Text color={item.name === mission.name ? '#fff' : '#8A8E99'} size={16}>
          {item.name}
        </Text>
      </CustomButton>
    );
  };
  return (
    <Block padding={[t3, w5]}>
      <Text margin={[t1]} semibold center size={22}>
        {MissionTypeHeader}
      </Text>
      <FlatList
        data={[
          {
            name: GuardService,
            value: 'Guard_service',
          },
          {
            name: Intervention,
            value: 'Intervention',
          },
          {
            name: SecurityPatrol,
            value: 'Security_patrol',
          },
          {
            name: NotSure,
            value: 'NotSure',
          },
          //
        ]}
        renderItem={_renderItem}
      />
      <Button
        disabled={!mission.name}
        onPress={() => {
          setValues(mission);
          closeModal();
        }}
        color="secondary">
        {Done}
      </Button>
    </Block>
  );
};

export default MissionType;
